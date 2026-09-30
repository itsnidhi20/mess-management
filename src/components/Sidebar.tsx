import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        MessMate
      </div>

      {user?.role === "student" ? (
        <>
          <Link to="/student">Dashboard</Link>
          <Link to="/menu">Today's Menu</Link>
          <Link to="/meal-preference">
            Meal Preference
          </Link>
          <Link to="/feedback">Feedback</Link>
        </>
      ) : (
        <>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/menu">Manage Menu</Link>
          <Link to="/admin/preferences">
            Meal Preferences
          </Link>
          <Link to="/admin/feedback">
            Feedback
          </Link>
        </>
      )}
    </aside>
  );
}