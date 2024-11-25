import { useState, useEffect } from 'react';
import { TrashBin } from '../types/trash';
import { trashBinApi } from '../services/api/trashBin';
import { POLLING_INTERVAL } from '../utils/constants';

export const useTrashBinData = () => {
  const [bins, setBins] = useState<TrashBin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      const data = await trashBinApi.getAllBins();
      setBins(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch trash bin data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // 30초마다 데이터 폴링
    const interval = setInterval(fetchData, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return {
    bins,
    loading,
    error,
    lastUpdated,
    refetch
  };
};