import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <section className="welcome">
          <p className="eyebrow">
            STUDENT PORTAL
          </p>

          <h1>
            Hello, {user?.name} 👋
          </h1>

          <p>
            Manage your meals and stay
            connected with your mess.
          </p>
        </section>

        <div className="dashboard-grid">
          <Link
            to="/menu"
            className="dashboard-card"
          >
            <div className="card-icon">
              🍛
            </div>

            <h3>Today's Menu</h3>

            <p>
              Check today's breakfast,
              lunch and dinner.
            </p>
          </Link>

          <Link
            to="/meal-preference"
            className="dashboard-card"
          >
            <div className="card-icon">
              ✅
            </div>

            <h3>Meal Preference</h3>

            <p>
              Select the meals you
              plan to have.
            </p>
          </Link>

          <Link
            to="/feedback"
            className="dashboard-card"
          >
            <div className="card-icon">
              ⭐
            </div>

            <h3>Give Feedback</h3>

            <p>
              Share your experience
              with the mess.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}