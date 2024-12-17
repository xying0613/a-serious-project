<template>
  <div class="greetings">
    <h1 class="green">Hello there!</h1>
  </div>
</template>

<style scoped>
/* General styles */
h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

/* Input group styling */
.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem auto;
}

@media (min-width: 1024px) {
  .input-group {
    flex-direction: row;
    justify-content: flex-start;
  }
}

/* Beautified input styling */
.beautified-input,
.beautified-select {
  width: 90%;
  max-width: 400px;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .beautified-input,
  .beautified-select {
    margin-bottom: 0;
    margin-right: 1rem;
  }
}

.beautified-input:focus,
.beautified-select:focus {
  border-color: #4caf50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

/* Beautified button styling */
.beautified-button {
  background-color: #4caf50;
  color: white;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.beautified-button:hover {
  background-color: #45a049;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.beautified-button:active {
  background-color: #388e3c;
}
</style>
