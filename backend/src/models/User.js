import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// In-memory "database" — resets when the server restarts
const users = [];

function attachHelpers(user) {
  return {
    ...user,
    comparePassword(candidate) {
      return bcrypt.compare(candidate, user.password);
    },
    toSafeObject() {
      return { id: user.id, name: user.name, email: user.email };
    },
  };
}

const User = {
  async findOne({ email }) {
    const user = users.find((u) => u.email === email.toLowerCase());
    return user ? attachHelpers(user) : null;
  },

  async findById(id) {
    const user = users.find((u) => u.id === id);
    return user ? attachHelpers(user) : null;
  },

  async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: randomUUID(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
    };
    users.push(user);
    return attachHelpers(user);
  },
};

export default User;
