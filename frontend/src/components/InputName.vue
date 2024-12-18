<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const name = ref('');
const handleSubmit = async () => {
  if (name.value) {
    const response = await axios.post(`${apiUrl}/api/users`, { name: name.value });
    alert(`Hello, ${response.data.name}! User created successfully.`);
  }
};
</script>

<template>
  <div class="input-name">
    <p>Please enter your name to get started:</p>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="name"
        type="text"
        placeholder="Enter your name"
        class="name-input"
      />
      <button type="submit" class="submit-button" :disabled="!name">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.input-name {
  text-align: center;
}

.name-input,
.name-select {
  text-align: center;
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.name-input:focus,
.name-select:focus {
  border-color: #4caf50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

.submit-button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #42b883;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #38a169;
}
</style>
