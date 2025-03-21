"use client";

import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
);

const ModernBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-20 -left-16 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-wide" />
      <div className="absolute top-1/4 -right-16 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-wide animation-delay-2000" />
      <div className="absolute bottom-20 left-1/3 w-88 h-88 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-wide animation-delay-4000" />

      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-sky-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-diagonal" />
      <div className="absolute -bottom-20 right-1/3 w-64 h-64 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-diagonal animation-delay-3000" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-sky-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-diagonal animation-delay-5000" />

      <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-float animation-delay-1000" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-cyan-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-float animation-delay-3500" />
      <div className="absolute top-2/3 left-1/2 w-40 h-40 bg-sky-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob-float animation-delay-6000" />
    </div>
  );
};

export default function Home() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [newPageName, setNewPageName] = useState("");

  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Send data to supabase
  async function saveData() {
    const { data, error } = await supabase.from("responses").insert([
      {
        rating: rating,
        comment: comment,
        context: context,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data saved:", data);
    }
  }

  const handleSubmit = async () => {
    // If NEXT_PUBLIC_API_URL exists, add the python route to it, otherwise use exclusively the python route
    const url = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/python/response`
      : "api/python/response";

    // Send data to backend
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
          context: context,
        }),
      });

      saveData();

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

  const handleCreatePage = () => {
    // Navigate to the newly created page
    window.location.href = "?event=" + newPageName;
  };

  useEffect(() => {
    // Get all of the url query parameters
    const queryParameters = new URLSearchParams(window.location.search);
    // Get just the query parameters called event
    const event = queryParameters.get("event");

    if (typeof event === "string") {
      setContext(event);
    }
  }, []);

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
      <ModernBackground />
      <div className="flex-grow py-64">
        <h1 className="shrikhand-regular text-primary">Vibe Check</h1>
        <div className="card">
          {!submitted ? (
            <>
              {find_event(context) ? (
                <>
                  <h2 className="bold">
                    Share how you're feeling! — {context}
                  </h2>

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
                    rows={5}
                    className="auto_height"
                    onInput={auto_height_func}
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <br />

                  <button
                    className="submit-button bg-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </>
              ) : (
                <>
                  <h2 className="bold">
                    Do a quick vibe check to get useful realtime feedback!
                  </h2>

                  <input
                    className="auto_height"
                    placeholder="Create a page ..."
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                  />

                  <br />

                  <button
                    className="submit-button bg-primary"
                    onClick={handleCreatePage}
                  >
                    Create page
                  </button>
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
          <h2 className="bold text-primary">Feedback Form</h2>
        </a>
      </div>
    </div>
  );
}
