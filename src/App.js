import React, { useEffect, useState } from "react";
import Article from "./components/Articles";
import "./styles.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all posts
    const source_url = "https://jsonplaceholder.typicode.com/posts";

    async function getArticles() {
      try {
        const response = await fetch(source_url);
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          console.error("Failed to fetch articles data");
        }
      } catch (error) {
        console.error("Error fetching articles data:", error);
      } finally {
        setLoading(false);
      }
    }

    getArticles();
  }, []);

  return (
    <div className="App">
      <h1>Recent Posts</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        articles.map((article) => (
          <Article key={article.id} article={article} />
        ))
      )}
    </div>
  );
}
