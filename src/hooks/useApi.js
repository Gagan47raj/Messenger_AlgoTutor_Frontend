import { useState, useCallback } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (apiCall, onSuccess, onError) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Something went wrong';
      setError(errorMsg);
      onError?.(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { callApi, loading, error, setError };
};