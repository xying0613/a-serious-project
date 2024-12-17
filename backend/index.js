const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173, http://localhost:4173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Create User
app.post("/api/users", async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
      return res.status(422).json({ error: "Please provide the name of the user." });
    }
  
    try {
      const newUser = await prisma.users.create({
        data: { name },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Get Users
app.get("/api/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.status(200).json(users);
});

// Hello World
app.get("/api/hello", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

// Export app for testing
module.exports = app;

// Start server only when not testing
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
