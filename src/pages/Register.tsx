import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import type { Role } from "../types";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState<Role>("student");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const errorMessage =
      await register(
        name,
        email,
        password,
        role
      );

    if (errorMessage) {
      setError(errorMessage);
      setLoading(false);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          🍽️
        </div>

        <h1>Create account</h1>

        <p className="subtitle">
          Join your digital mess system
        </p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>

          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Minimum 6 characters"
            minLength={6}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <label>Account type</label>

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value as Role
              )
            }
          >
            <option value="student">
              Student
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create account"}
          </button>
        </form>

        <p className="switch-auth">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}