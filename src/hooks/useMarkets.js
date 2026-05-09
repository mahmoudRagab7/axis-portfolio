import { useState, useEffect } from 'react';
import { getMarkets } from '../services/marketService';

export const useMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      const data = await getMarkets();
      setMarkets(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  return { markets, loading, error, refetch: fetchMarkets };
};
