import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Initial topics for each category
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

  // Fetch new topics from Wikipedia for a category
  const fetchTopics = async (category) => {
    try {
      const res = await axios.get(
        `https://en.wikipedia.org/w/api.php`,
        {
          params: {
            action: "query",
            list: "search",
            srsearch: category,
            format: "json",
            origin: "*",
            srlimit: 5
          }
        }
      );
      const newTopics = res.data.query.search.map(item => item.title);
      setTopics(prev => ({ ...prev, [category]: newTopics }));
    } catch (err) {
      console.error("Error fetching topics:", err);
      setTopics(prev => ({ ...prev, [category]: ["Failed to load topics"] }));
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
                <li key={idx}>{topic}</li>
              ))}
            </ul>
            <button onClick={() => fetchTopics(cat)}>Refresh Topics</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
