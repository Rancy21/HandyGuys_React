import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        setData(result); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Capture the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [url]); // Re-run when URL changes

  return { data, error, loading };
};
