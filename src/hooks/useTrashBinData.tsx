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
      console.log('Processed Bins Data:', data); // 처리된 데이터 확인
      setBins(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error in useTrashBinData:', err); // 에러 상세 확인
      setError(err instanceof Error ? err : new Error('Failed to fetch trash bin data'));
      // 에러 발생 시에도 이전 데이터 유지
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
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