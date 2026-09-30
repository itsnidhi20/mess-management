import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/student/StudentDashboard";
import Menu from "./pages/student/Menu";
import MealPreference from "./pages/student/MealPreference";
import Feedback from "./pages/student/Feedback";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageMenu from "./pages/admin/ManageMenu";
import MealPreferences from "./pages/admin/MealPreferences";
import FeedbackList from "./pages/admin/FeedbackList";

function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user.role === "admin") {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/student"
      replace
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={<HomeRedirect />}
      />

      {/* STUDENT */}

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menu"
        element={
          <ProtectedRoute role="student">
            <Menu />
          </ProtectedRoute>
        }
      />

      <Route
        path="/meal-preference"
        element={
          <ProtectedRoute role="student">
            <MealPreference />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback"
        element={
          <ProtectedRoute role="student">
            <Feedback />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/menu"
        element={
          <ProtectedRoute role="admin">
            <ManageMenu />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/preferences"
        element={
          <ProtectedRoute role="admin">
            <MealPreferences />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/feedback"
        element={
          <ProtectedRoute role="admin">
            <FeedbackList />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}