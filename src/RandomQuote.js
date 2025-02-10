import { useState, useEffect } from "react";

const RandomQuote = () => {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://qapi.vercel.app/api/random");
        const data = await response.json();
        setQuote(data.quote);
        setAuthor(data.author);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Stay positive and keep going!"); // Fallback message
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      <h2 className="motivational-quote">"{quote}"</h2>
      <a 
        href={`https://en.wikipedia.org/wiki/${author}`} 
        className="quote-author" 
        target="_blank" 
        rel="noopener noreferrer"
        title="See the author(Wikipedia)"
        >
        - {author}
        </a>
    </div>
  );
};

export default RandomQuote;
