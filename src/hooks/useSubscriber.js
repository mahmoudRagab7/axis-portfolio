import { useState, useEffect } from 'react';
import { validateToken } from '../services/subscriberService';

export const useSubscriber = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('axis_access_token');
      if (!token) {
        setIsSubscribed(false);
        setLoading(false);
        return;
      }

      const result = await validateToken(token);
      if (result.isValid) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
        // If invalid or expired, clear it
        localStorage.removeItem('axis_access_token');
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const login = async (token) => {
    const result = await validateToken(token);
    if (result.isValid) {
      localStorage.setItem('axis_access_token', token);
      setIsSubscribed(true);
      return { success: true };
    }
    return { success: false, reason: result.reason };
  };

  const logout = () => {
    localStorage.removeItem('axis_access_token');
    setIsSubscribed(false);
  };

  return { isSubscribed, loading, login, logout };
};
