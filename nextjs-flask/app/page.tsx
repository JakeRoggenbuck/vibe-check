"use client";

import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/python/response`
      : "api/python/response";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
		  context: context
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }

    setSubmitted(true);
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const event = queryParameters.get("event");

    if (typeof event === "string") {
      setContext(event);
    }
  }, []);

  const test_handleSubmit = () => {
    console.log(`Rating: ${rating}\nComment: ${comment}`);
    setSubmitted(true);
  };

  const handleSubmitAgain = () => {
    setSubmitted(false);
  };

  const find_event = (name: string) => {
    return name !== "";
  };

  function auto_height_func(event: React.FormEvent<HTMLTextAreaElement>) {
    const elem = event.target as HTMLTextAreaElement;
    if (elem) {
      elem.style.height = "1px";
      elem.style.height = `${elem.scrollHeight}px`;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <div className="flex-grow py-64">
        <h1 className="shrikhand-regular">Vibe Check</h1>
        <div className="card">
          {!submitted ? (
            <>
              <h2 className="bold">Share how you're feeling! — {context}</h2>

              {find_event(context) ? (
                <>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= (hover || rating) ? "star selected" : "star"
                        }
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(rating)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>

                  <textarea
                    rows={2}
                    className="auto_height"
                    onInput={auto_height_func}
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <br />

                  <button className="submit-button" onClick={handleSubmit}>
                    Submit
                  </button>
                </>
              ) : (
                <>
                  <h2 className="bold">Event "{context}" not found.</h2>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="bold">Thanks for sharing! — {context}</h2>

              <button className="submit-button" onClick={handleSubmitAgain}>
                Submit again
              </button>
            </>
          )}
        </div>
      </div>
      <div className="w-full text-center mt-auto py-6">
        <a href="https://forms.gle/K7KDopHZ47tCvARE7">
          <h2 className="bold red-text">Feedback Form</h2>
        </a>
      </div>
    </div>
  );
}
