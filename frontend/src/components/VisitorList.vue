<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const apiUrl = import.meta.env.API_URL;

const visitors = ref<{ id: number; name: string }[]>([]);
const selectedVisitor = ref<string | null>(null);
const showPopup = ref(false);

const fetchVisitors = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/users`);
    visitors.value = response.data;
  } catch (error) {
    console.error('Error fetching visitors:', error);
  }
};

const handleSubmit = () => {
  if (selectedVisitor.value) {
    showPopup.value = true;
  }
};

onMounted(() => {
  fetchVisitors();
});
</script>

<template>
  <main>
    <div>
      <p>Please select your name:</p>
      <select id="visitor-select" v-model="selectedVisitor" class="dropdown">
        <option value="" disabled>Select a visitor</option>
        <option v-for="visitor in visitors" :key="visitor.id" :value="visitor.name">
          {{ visitor.name }}
        </option>
      </select>
      <button class="submit-button" @click="handleSubmit" :disabled="!selectedVisitor">Submit</button>
    </div>

    <!-- Popup Modal -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h2 class="popup-message">Welcome back, {{ selectedVisitor }}!</h2>
        <button @click="showPopup = false" class="close-btn">Close</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  text-align: center;
}

label {
  margin-right: 1rem;
  font-size: 1.2rem;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
}

.dropdown {
  text-align: center;
  width: 100%;
  max-width: 300px;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.dropdown:focus {
  border-color: #4caf50;
  outline: none;
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

/* Popup Styling */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.popup-message {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.close-btn {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #e53935;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #d32f2f;
}
</style>
