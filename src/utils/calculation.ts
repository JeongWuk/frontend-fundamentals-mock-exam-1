import { SavingsProduct } from 'types/savings';

export function calculateResult({
  selectedSavingsProduct,
  goalAmount,
  monthlyAmount,
  selectedTerm,
}: {
  selectedSavingsProduct: SavingsProduct | null;
  goalAmount: string;
  monthlyAmount: string;
  selectedTerm: number;
}) {
  if (!selectedSavingsProduct) {
    return {
      expectedFinalAmount: 0,
      goalDifference: 0,
      recommendedMonthlyAmount: 0,
    };
  }

  const parseNumber = (s: string) => {
    if (!s) return 0;
    const n = Number(String(s).replace(/[^0-9.-]+/g, ''));
    return isNaN(n) ? 0 : n;
  };

  const monthly = parseNumber(monthlyAmount);
  const goal = parseNumber(goalAmount);
  const term = selectedTerm || 0;

  const rawAnnual = (selectedSavingsProduct as any).annualRate ?? 0;
  const annualRate = (typeof rawAnnual === 'number' ? rawAnnual : parseNumber(String(rawAnnual))) / 100;

  const expectedFinalAmount = Math.round(monthly * term * (1 + annualRate * 0.5));
  const goalDifference = Math.round(goal - expectedFinalAmount);

  const denom = term * (1 + annualRate * 0.5);
  let recommended = denom > 0 ? goal / denom : 0;
  recommended = Math.round(recommended / 1000) * 1000;

  const minMonthly = (selectedSavingsProduct as any).minMonthlyAmount ?? 0;
  const maxMonthly = (selectedSavingsProduct as any).maxMonthlyAmount ?? Infinity;
  const recommendedClamped = Math.max(minMonthly, Math.min(maxMonthly, recommended));

  return {
    expectedFinalAmount,
    goalDifference,
    recommendedMonthlyAmount: recommendedClamped,
  };
}

export function calculateRecommendation({
  products,
  monthlyAmount,
  selectedTerm,
}: {
  products: SavingsProduct[];
  monthlyAmount: string;
  selectedTerm: number;
}) {
  const matchProducts = products.filter(product => {
    const matchesAmount =
      product.minMonthlyAmount <= Number(monthlyAmount.replace(/,/g, '')) &&
      product.maxMonthlyAmount >= Number(monthlyAmount.replace(/,/g, ''));
    const matchesTerm = product.availableTerms === selectedTerm;
    return matchesAmount && matchesTerm;
  });

  return matchProducts
    .sort((a, b) => {
      const rateA = (typeof a.annualRate === 'number' ? a.annualRate : parseFloat(String(a.annualRate))) || 0;
      const rateB = (typeof b.annualRate === 'number' ? b.annualRate : parseFloat(String(b.annualRate))) || 0;
      return rateB - rateA;
    })
    .slice(0, 2);
}
