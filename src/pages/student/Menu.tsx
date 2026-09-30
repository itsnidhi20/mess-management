import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import MenuCard from "../../components/MenuCard";

import { getMenuByDate } from "../../services/menuService";
import type { Menu as MenuType } from "../../types";

export default function Menu() {
  const [menu, setMenu] =
    useState<MenuType | null>(null);

  const [loading, setLoading] =
    useState(true);

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await getMenuByDate(today);

        setMenu(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [today]);

  return (
    <>
      <Navbar />

      <main className="page">
        <p className="eyebrow">
          TODAY'S MEALS
        </p>

        <h1>Today's Menu 🍽️</h1>

        <p className="muted">
          {new Date().toLocaleDateString(
            "en-IN",
            {
              weekday: "long",
              day: "numeric",
              month: "long",
            }
          )}
        </p>

        {loading ? (
          <div className="loading">
            Loading menu...
          </div>
        ) : !menu ? (
          <div className="empty">
            <div className="empty-icon">
              🍽️
            </div>

            <h2>
              No menu available
            </h2>

            <p>
              The admin hasn't added
              today's menu yet.
            </p>
          </div>
        ) : (
          <div className="meal-grid">
            <MenuCard
              icon="🌅"
              title="Breakfast"
              meal={menu.breakfast}
            />

            <MenuCard
              icon="☀️"
              title="Lunch"
              meal={menu.lunch}
            />

            <MenuCard
              icon="🌙"
              title="Dinner"
              meal={menu.dinner}
            />
          </div>
        )}
      </main>
    </>
  );
}