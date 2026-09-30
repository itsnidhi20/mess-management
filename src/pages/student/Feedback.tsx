import { useState } from "react";

import Navbar from "../../components/Navbar";

import { useAuth } from "../../context/AuthContext";

import { submitFeedback } from "../../services/feedbackService";

export default function Feedback() {
  const { user } = useAuth();

  const [rating, setRating] =
    useState(5);

  const [message, setMessage] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!user) return;

    setLoading(true);
    setStatus("");

    try {
      await submitFeedback(
        user.id,
        rating,
        message
      );

      setMessage("");
      setRating(5);

      setStatus(
        "Feedback submitted successfully! ⭐"
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="page narrow">
        <p className="eyebrow">
          YOUR VOICE MATTERS
        </p>

        <h1>Mess Feedback</h1>

        <p className="muted">
          Help us improve the mess
          experience.
        </p>

        <form
          className="feedback-form"
          onSubmit={handleSubmit}
        >
          <label>Rating</label>

          <div className="rating-row">
            {[1, 2, 3, 4, 5].map(
              (number) => (
                <button
                  key={number}
                  type="button"
                  className={
                    rating >= number
                      ? "star active"
                      : "star"
                  }
                  onClick={() =>
                    setRating(number)
                  }
                >
                  ★
                </button>
              )
            )}
          </div>

          <label>
            Your feedback
          </label>

          <textarea
            placeholder="Tell us about food, cleanliness, service..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            required
          />

          <button
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Feedback"}
          </button>

          {status && (
            <div className="success">
              {status}
            </div>
          )}
        </form>
      </main>
    </>
  );
}