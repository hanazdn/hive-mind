import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Initial topics shown only on first load
const initialTopicsData = {
  History: ["Caveman Drawings", "Indus Valley Civilization", "How Islam Spread to China"],
  Geography: ["Deep Sea Exploration", "Volcanoes", "Mount Everest"],
  Tech: ["Quantum Computing", "AI Ethics", "Blockchain"],
  "Random How-Tos": ["How to Make Candles", "How to Make Plant Dyes", "How to Play Mahjong"],
  Science: ["CRISPR Gene Editing", "Black Holes", "Climate Change"],
  Art: ["Renaissance Art", "Graffiti Culture", "Origami"],
  Culture: ["Japanese Tea Ceremony", "Carnival in Brazil", "Nordic Mythology"],
  Nature: ["Amazon Rainforest", "Great Barrier Reef", "Bioluminescent Waves"],
  Math: ["Fibonacci Sequence", "Prime Numbers", "Topology"],
  Innovation: ["Self-Driving Cars", "Smart Cities", "3D Printing"]
};

const categories = Object.keys(initialTopicsData);

function App() {
  const [topics, setTopics] = useState(initialTopicsData);
  const [loading, setLoading] = useState({}); // loading per category

  const refreshTopics = async (category) => {
    setLoading(prev => ({ ...prev, [category]: true }));

    try {
      const res = await axios.get(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: "query",
          list: "search",
          srsearch: category,
          format: "json",
          origin: "*",
          srlimit: 5 // fetch more to make refresh interesting
        }
      });

      const newTopics = res.data.query.search.map(item => item.title);

      // Replace previous topics entirely with new topics
      setTopics(prev => ({
        ...prev,
        [category]: newTopics.length ? newTopics : ["No topics found"]
      }));

    } catch (err) {
      console.error("Error fetching topics:", err);
      setTopics(prev => ({
        ...prev,
        [category]: ["Failed to load topics"]
      }));
    } finally {
      // Re-enable the button immediately so you can refresh again
      setLoading(prev => ({ ...prev, [category]: false }));
    }
  };

  return (
    <div className="App">
      <h1 className="title">Mind Map Explorer</h1>
      <div className="categories">
        {categories.map(cat => (
          <div key={cat} className="category-card">
            <h2>{cat}</h2>
            <ul>
              {topics[cat].map((topic, idx) => (
                <li key={idx}>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="topic-link"
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="refresh-btn"
              onClick={() => refreshTopics(cat)}
              disabled={loading[cat]}
            >
              {loading[cat] ? "Refreshing..." : "Refresh Topics"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
