import { http, isHttpError } from 'tosslib';
import { SavingsProductsResponse } from 'types/savings';

export async function getSavingsProducts() {
  try {
    const response = await http.get<SavingsProductsResponse>('/api/savings-products');

    return response;
  } catch (error) {
    if (isHttpError(error)) {
      throw new Error('저축 상품을 불러오는 데 실패했습니다.');
    }
  }
}
