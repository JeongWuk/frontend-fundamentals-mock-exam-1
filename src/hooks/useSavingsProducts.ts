import { getSavingsProducts } from 'api/savingsApi';
import { useEffect, useState } from 'react';
import { SavingsProductsResponse } from 'types/savings';

export function useSavingsProducts() {
  const [savingsProducts, setSavingsProducts] = useState<SavingsProductsResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSavings() {
      try {
        const res = await getSavingsProducts();
        setSavingsProducts(res!);
      } catch (e) {
        setError('저축 상품을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSavings();
  }, []);

  return { savingsProducts, isLoading, error };
}
