import { useState } from "react";
import axios from "axios";
import "./App.css"; // we’ll add custom CSS here

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await axios.get(
        `https://en.wikipedia.org/w/api.php`,
        {
          params: {
            action: "opensearch",
            search: query,
            limit: 5,
            namespace: 0,
            format: "json",
            origin: "*",
          },
        }
      );
      setResults(res.data[1]);
    } catch (err) {
      console.error(err);
    }
  };

  const suggestedTopics = {
    History: [
      { name: "Cave paintings", link: "https://en.wikipedia.org/wiki/Cave_painting" },
      { name: "Indus Valley Civilization", link: "https://en.wikipedia.org/wiki/Indus_Valley_Civilisation" },
      { name: "Spread of Islam in China", link: "https://en.wikipedia.org/wiki/Islam_in_China" },
    ],
    Geography: [
      { name: "Deep sea exploration", link: "https://en.wikipedia.org/wiki/Deep-sea_exploration" },
      { name: "Amazon rainforest", link: "https://en.wikipedia.org/wiki/Amazon_rainforest" },
      { name: "Mount Everest", link: "https://en.wikipedia.org/wiki/Mount_Everest" },
    ],
    Technology: [
      { name: "Artificial Intelligence", link: "https://en.wikipedia.org/wiki/Artificial_intelligence" },
      { name: "Quantum Computing", link: "https://en.wikipedia.org/wiki/Quantum_computing" },
      { name: "CRISPR technology", link: "https://en.wikipedia.org/wiki/CRISPR" },
    ],
    "Random How-Tos": [
      { name: "How to make candles", link: "https://en.wikipedia.org/w/index.php?search=How+to+make+candles" },
      { name: "How to make dyes from plants", link: "https://en.wikipedia.org/w/index.php?search=How+to+make+dyes+from+plants" },
      { name: "How to play Mahjong", link: "https://en.wikipedia.org/wiki/Mahjong" },
    ],
    Science: [
      { name: "Evolution", link: "https://en.wikipedia.org/wiki/Evolution" },
      { name: "Plate tectonics", link: "https://en.wikipedia.org/wiki/Plate_tectonics" },
      { name: "Photosynthesis", link: "https://en.wikipedia.org/wiki/Photosynthesis" },
    ],
    Art: [
      { name: "Impressionism", link: "https://en.wikipedia.org/wiki/Impressionism" },
      { name: "Renaissance Art", link: "https://en.wikipedia.org/wiki/Renaissance_art" },
      { name: "Cubism", link: "https://en.wikipedia.org/wiki/Cubism" },
    ],
    Literature: [
      { name: "Shakespeare", link: "https://en.wikipedia.org/wiki/William_Shakespeare" },
      { name: "Epic of Gilgamesh", link: "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh" },
      { name: "Pride and Prejudice", link: "https://en.wikipedia.org/wiki/Pride_and_Prejudice" },
    ],
    Philosophy: [
      { name: "Plato", link: "https://en.wikipedia.org/wiki/Plato" },
      { name: "Confucianism", link: "https://en.wikipedia.org/wiki/Confucianism" },
      { name: "Existentialism", link: "https://en.wikipedia.org/wiki/Existentialism" },
    ],
    Music: [
      { name: "Classical music", link: "https://en.wikipedia.org/wiki/Classical_music" },
      { name: "Jazz", link: "https://en.wikipedia.org/wiki/Jazz" },
      { name: "K-pop", link: "https://en.wikipedia.org/wiki/K-pop" },
    ],
    "Pop Culture": [
      { name: "Star Wars", link: "https://en.wikipedia.org/wiki/Star_Wars" },
      { name: "Harry Potter", link: "https://en.wikipedia.org/wiki/Harry_Potter" },
      { name: "Video games", link: "https://en.wikipedia.org/wiki/Video_game" },
    ],
  };

  return (
    <div className="app">
      <h1 className="title">Deep Dive</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a topic..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="results">
          <h3>Search Results:</h3>
          <ul>
            {results.map((topic) => (
              <li key={topic}>
                <a
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {topic}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Topics */}
      <div className="suggested">
        <h3>Suggested Topics:</h3>
        <div className="categories">
          {Object.entries(suggestedTopics).map(([category, topics]) => (
            <div key={category} className="category">
              <h4>{category}</h4>
              <ul>
                {topics.map((topic) => (
                  <li key={topic.name}>
                    <a href={topic.link} target="_blank" rel="noopener noreferrer">
                      {topic.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
