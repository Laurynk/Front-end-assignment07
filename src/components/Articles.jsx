import { useEffect, useState } from "react";

export default function Article({ article }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    // Fetch the author information based on the userId
    const author_url = `https://jsonplaceholder.typicode.com/users/${article.userId}`;

    async function getAuthor() {
      try {
        const response = await fetch(author_url);
        if (response.ok) {
          const data = await response.json();
          setAuthor(data);
        } else {
          console.error("Failed to fetch author data");
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    }

    getAuthor();
  }, [article.userId]);

  return (
    <div className="article">
      <p>
        <div className="title">{article.title}</div>
      </p>
      {author && (
        <p>
          <span>
            By:{" "}
            <a
              href={`https://jsonplaceholder.typicode.com/users/${author.id}`}
              target="_blank"
              className="author"
            >
              {author.name}
            </a>
          </span>
          <span>{article.body}</span>
        </p>
      )}
    </div>
  );
}
