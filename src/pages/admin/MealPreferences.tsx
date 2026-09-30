import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import {
  getAllMealPreferences,
} from "../../services/mealService";

import type {
  MealPreference,
} from "../../types";

export default function MealPreferences() {
  const [data, setData] =
    useState<MealPreference[]>([]);

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  useEffect(() => {
    const load = async () => {
      try {
        const result =
          await getAllMealPreferences(
            today
          );

        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, [today]);

  return (
    <>
      <Navbar />

      <main className="page">
        <p className="eyebrow">
          ADMIN
        </p>

        <h1>
          Meal Preferences
        </h1>

        <p className="muted">
          Today's student meal
          requirements.
        </p>

        <section className="admin-section">
          {data.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">
                🍽️
              </div>

              <h2>
                No preferences yet
              </h2>

              <p>
                Students haven't
                submitted their
                preferences.
              </p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.student_id.slice(
                          0,
                          8
                        )}
                        ...
                      </td>

                      <td>
                        {item.breakfast
                          ? "Yes"
                          : "No"}
                      </td>

                      <td>
                        {item.lunch
                          ? "Yes"
                          : "No"}
                      </td>

                      <td>
                        {item.dinner
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}