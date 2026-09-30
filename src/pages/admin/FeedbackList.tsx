import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import {
  getAllFeedback,
} from "../../services/feedbackService";

import type { Feedback } from "../../types";

export default function FeedbackList() {
  const [feedback, setFeedback] =
    useState<Feedback[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await getAllFeedback();

        setFeedback(data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  return (
    <>
      <Navbar />

      <main className="page">
        <p className="eyebrow">
          ADMIN
        </p>

        <h1>
          Student Feedback
        </h1>

        <p className="muted">
          Review feedback submitted
          by students.
        </p>

        <section className="admin-section">
          {feedback.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">
                ⭐
              </div>

              <h2>
                No feedback yet
              </h2>
            </div>
          ) : (
            <div className="feedback-list">
              {feedback.map(
                (item) => (
                  <div
                    className="feedback-item"
                    key={item.id}
                  >
                    <div className="feedback-top">
                      <strong>
                        {"⭐".repeat(
                          item.rating
                        )}
                      </strong>

                      <small>
                        {new Date(
                          item.created_at
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </small>
                    </div>

                    <p>
                      {item.message}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}