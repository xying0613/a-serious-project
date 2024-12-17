const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const app = require("./server"); // Point to the updated server file

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    users: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

const prisma = new PrismaClient();

describe("API Endpoints", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /api/users", () => {
    it("creates a new user with valid input", async () => {
      const mockUser = { id: 1, name: "Alice" };
      prisma.users.create.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/api/users")
        .send({ name: "Alice" })
        .expect(201);

      expect(response.body).toEqual(mockUser);
      expect(prisma.users.create).toHaveBeenCalledWith({
        data: { name: "Alice" },
      });
    });

    it("returns a 422 error if name is missing", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({})
        .expect(422);

      expect(response.body).toEqual({ error: "Please provide the name of the user." });
    });

    it("handles server errors gracefully", async () => {
      prisma.users.create.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/api/users")
        .send({ name: "Bob" })
        .expect(500);

      expect(response.body).toEqual({
        error: "Database error",
      });
    });
  });

  describe("GET /api/users", () => {
    it("retrieves a list of users", async () => {
      const mockUsers = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ];
      prisma.users.findMany.mockResolvedValue(mockUsers);

      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).toEqual(mockUsers);
      expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /api/hello", () => {
    it("responds with a hello world message", async () => {
      const response = await request(app).get("/api/hello").expect(200);

      expect(response.body).toEqual({ message: "Hello World" });
    });
  });
});
