import { useState, useEffect, useCallback } from 'react';

const useFetch = (initialUrl, initialParams = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${url}?${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setUrl, setParams };
};

export default useFetch;
