import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import {
  getAllMealPreferences,
} from "../../services/mealService";

import {
  getAllFeedback,
} from "../../services/feedbackService";

import type {
  Feedback,
  MealPreference,
} from "../../types";

export default function AdminDashboard() {
  const [preferences, setPreferences] =
    useState<MealPreference[]>([]);

  const [feedback, setFeedback] =
    useState<Feedback[]>([]);

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const loadData = async () => {
    try {
      const [
        preferenceData,
        feedbackData,
      ] = await Promise.all([
        getAllMealPreferences(today),
        getAllFeedback(),
      ]);

      setPreferences(
        preferenceData
      );

      setFeedback(feedbackData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [today]);

  const breakfast = preferences.filter(
    (item) => item.breakfast
  ).length;

  const lunch = preferences.filter(
    (item) => item.lunch
  ).length;

  const dinner = preferences.filter(
    (item) => item.dinner
  ).length;

  return (
    <>
      <Navbar />

      <main className="page">
        <p className="eyebrow">
          ADMIN PORTAL
        </p>

        <h1>
          Mess Dashboard 📊
        </h1>

        <p className="muted">
          Monitor today's mess activity.
        </p>

        <section className="stats">
          <div className="stat-card">
            <span>🌅</span>
            <strong>
              {breakfast}
            </strong>
            <p>Breakfast</p>
          </div>

          <div className="stat-card">
            <span>☀️</span>
            <strong>
              {lunch}
            </strong>
            <p>Lunch</p>
          </div>

          <div className="stat-card">
            <span>🌙</span>
            <strong>
              {dinner}
            </strong>
            <p>Dinner</p>
          </div>

          <div className="stat-card">
            <span>⭐</span>
            <strong>
              {feedback.length}
            </strong>
            <p>Feedback</p>
          </div>
        </section>

        <section className="admin-section">
          <h2>
            Quick Overview
          </h2>

          <p className="muted">
            Use the navigation links to
            manage today's menu, view
            meal preferences and check
            student feedback.
          </p>
        </section>
      </main>
    </>
  );
}