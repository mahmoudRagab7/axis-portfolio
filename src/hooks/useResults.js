import { useState, useEffect } from 'react';
import { getResults } from '../services/resultService';

export const useResults = (marketId = null) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const data = await getResults(marketId);
      setResults(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [marketId]);

  return { results, loading, error, refetch: fetchResults };
};
