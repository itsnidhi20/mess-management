import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import { useAuth } from "../../context/AuthContext";

import {
  getStudentPreference,
  saveMealPreference,
} from "../../services/mealService";

export default function MealPreference() {
  const { user } = useAuth();

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const [breakfast, setBreakfast] =
    useState(false);

  const [lunch, setLunch] =
    useState(false);

  const [dinner, setDinner] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        const data =
          await getStudentPreference(
            user.id,
            today
          );

        if (data) {
          setBreakfast(data.breakfast);
          setLunch(data.lunch);
          setDinner(data.dinner);
        }
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, [user, today]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setMessage("");

    try {
      await saveMealPreference(
        user.id,
        today,
        breakfast,
        lunch,
        dinner
      );

      setMessage(
        "Meal preference saved successfully! ✅"
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="page narrow">
        <p className="eyebrow">
          MEAL PLANNING
        </p>

        <h1>Meal Preference</h1>

        <p className="muted">
          Select the meals you plan to
          have today.
        </p>

        <div className="preference-list">
          <label className="preference">
            <div>
              <strong>
                🌅 Breakfast
              </strong>

              <span>
                Morning meal
              </span>
            </div>

            <input
              type="checkbox"
              checked={breakfast}
              onChange={(e) =>
                setBreakfast(
                  e.target.checked
                )
              }
            />
          </label>

          <label className="preference">
            <div>
              <strong>
                ☀️ Lunch
              </strong>

              <span>
                Afternoon meal
              </span>
            </div>

            <input
              type="checkbox"
              checked={lunch}
              onChange={(e) =>
                setLunch(
                  e.target.checked
                )
              }
            />
          </label>

          <label className="preference">
            <div>
              <strong>
                🌙 Dinner
              </strong>

              <span>
                Evening meal
              </span>
            </div>

            <input
              type="checkbox"
              checked={dinner}
              onChange={(e) =>
                setDinner(
                  e.target.checked
                )
              }
            />
          </label>
        </div>

        <button
          className="primary-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Preference"}
        </button>

        {message && (
          <div className="success">
            {message}
          </div>
        )}
      </main>
    </>
  );
}