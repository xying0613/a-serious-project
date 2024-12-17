pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "${env.DOCKER_REGISTRY}"
        IMAGE_NAME = "${env.IMAGE_NAME}"
        TAG_NAME = "${env.TAG_NAME}"
        EC2_IP = "${env.EC2_IP}"
        SSH_CREDENTIALS = "${env.SSH_CREDENTIALS}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend (Production)') {
                    steps {
                        dir('frontend') {
                            script {
                                docker.build("${IMAGE_NAME}-frontend:${TAG_NAME}", '-f Dockerfile.prod .')
                            }
                        }
                    }
                }
                stage('Build Backend (Production)') {
                    steps {
                        dir('backend') {
                            script {
                                docker.build("${IMAGE_NAME}-backend:${TAG_NAME}", '-f Dockerfile.prod .')
                            }
                        }
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh 'npm install && npm run test'
                        }
                    }
                }
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh 'npm install && npm test'
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-credentials') {
                        docker.image("${IMAGE_NAME}-frontend:${TAG_NAME}").push()
                        docker.image("${IMAGE_NAME}-backend:${TAG_NAME}").push()
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent([SSH_CREDENTIALS]) {
                    script {
                        // Step 1: Login to Docker registry on EC2
                        sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@${EC2_IP} << EOF
                        docker login ${DOCKER_REGISTRY} -u ${DOCKER_REGISTRY_USERNAME} -p ${DOCKER_REGISTRY_PASSWORD}
                        EOF
                        """

                        // Step 2: Pull the updated Docker images
                        sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@${EC2_IP} << EOF
                        docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}-frontend:${TAG_NAME}
                        docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}-backend:${TAG_NAME}
                        EOF
                        """

                        // Step 3: Update Docker Compose deployment
                        sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@${EC2_IP} << EOF
                        docker-compose -f /home/ec2-user/docker-compose.prod.yml down
                        docker-compose -f /home/ec2-user/docker-compose.prod.yml up -d
                        EOF
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
