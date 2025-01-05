import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const [context, setContext] = useState('');

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const event = queryParameters.get("event");

    if (typeof event === "string") {
      setContext(event);
    }
  }, []);

  const handleSubmit = () => {
    alert(`Rating: ${rating}\nComment: ${comment}`);
  };

  return (
    <>
      <h1 className="shrikhand-regular">Vibe Check</h1>
      <div className="card">
        <h3 className="bold">Share how you're feeling! — {context}</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= (hover || rating) ? 'star selected' : 'star'}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            >
              &#9733;
            </span>
          ))}
        </div>

        <input 
		className="input-field"
          type="text" 
          placeholder="Leave a comment..." 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
        />

		<br/>

        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default App;
