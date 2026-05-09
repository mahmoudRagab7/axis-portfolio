import { useState, useEffect } from 'react';
import { getStatistics } from '../services/statisticsService';

export const useStatistics = () => {
  const [statistics, setStatistics] = useState({
    totalTrades: 0,
    successRate: 0,
    marketsCount: 0,
    yearsActive: 0,
    happyClients: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const data = await getStatistics();
      setStatistics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return { statistics, loading, error, refetch: fetchStatistics };
};
