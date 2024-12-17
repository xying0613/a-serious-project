pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = ''
        IMAGE_NAME = ''
        TAG_NAME = ''
        EC2_IP = ''
        SSH_CREDENTIALS = ''
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Extract Jenkins Env File') {
            steps {
                withCredentials([file(credentialsId: 'JENKINS_ENV_FILE', variable: 'JENKINS_ENV_FILE_PATH')]) {
                    script {
                        // Dynamically load environment variables from the secret file
                        sh """
                            set -o allexport
                            source ${JENKINS_ENV_FILE_PATH}
                            set +o allexport
                        """
                    }
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend (Production)') {
                    steps {
                        dir('frontend') {
                            withCredentials([string(credentialsId: 'FRONTEND_ENV_PROD', variable: 'FRONTEND_ENV_CONTENT')]) {
                                script {
                                    writeFile file: '.env', text: "${FRONTEND_ENV_CONTENT}"
                                    docker.build("${IMAGE_NAME}-frontend:${TAG_NAME}", '-f Dockerfile.prod .')
                                    sh 'rm -f .env'
                                }
                            }
                        }
                    }
                }
                stage('Build Backend (Production)') {
                    steps {
                        dir('backend') {
                            withCredentials([string(credentialsId: 'BACKEND_ENV_PROD', variable: 'BACKEND_ENV_CONTENT')]) {
                                script {
                                    writeFile file: '.env', text: "${BACKEND_ENV_CONTENT}"
                                    docker.build("${IMAGE_NAME}-backend:${TAG_NAME}", '-f Dockerfile.prod .')
                                    sh 'rm -f .env'
                                }
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
