import { Router, Request, Response } from "express";

const router = Router();

// Mock user data for login
const MOCK_USER = {
  username: "user1",
  password: "123456",
  token: "mocked-jwt-token-123",
};

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === MOCK_USER.username && password === MOCK_USER.password) {
    res.json({
      success: true,
      token: MOCK_USER.token,
      message: "Login successful",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
});

export default router;
