import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { login } from "../store/reducers/authSlice";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.message || "Login failed");
        return;
      }

      const data = await response.json();
      // On success, dispatch login with username (and token if needed)
      dispatch(login({ username: data.username }));
      setUsername("");
      setPassword("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Network error");
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem", height: "2rem" }}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={!username || !password}>
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
