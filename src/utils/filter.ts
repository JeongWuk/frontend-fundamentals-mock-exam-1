import { SavingsProductFilters } from 'types/filters';
import { SavingsProduct } from 'types/savings';

export function filterSavingsProducts(products: SavingsProduct[], filters: SavingsProductFilters): SavingsProduct[] {
  if (!filters.monthlyAmount || !filters.term) {
    return products;
  }
  return products.filter(product => {
    const matchesAmount =
      product.minMonthlyAmount <= Number(filters.monthlyAmount.replace(/,/g, '')) &&
      product.maxMonthlyAmount >= Number(filters.monthlyAmount.replace(/,/g, ''));
    const matchesTerm = product.availableTerms === filters.term;
    return matchesAmount && matchesTerm;
  });
}
