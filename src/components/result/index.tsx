import { CalculationResult } from 'components/result/CalculationResult';
import { RecommendProductList } from 'components/result/RecommendProductList';
import { Border, Spacing } from 'tosslib';
import { SavingsProduct } from 'types/savings';

interface ResultProps {
  visible: boolean;
  savingsProducts: SavingsProduct[];
  goalAmount: string;
  monthlyAmount: string;
  selectedTerm: number;
  selectedSavingsProduct: SavingsProduct | null;
}

export function Result({
  visible,
  savingsProducts,
  goalAmount,
  monthlyAmount,
  selectedTerm,
  selectedSavingsProduct,
}: ResultProps) {
  return (
    <>
      <CalculationResult
        visible={visible}
        selectedSavingsProduct={selectedSavingsProduct}
        goalAmount={goalAmount}
        monthlyAmount={monthlyAmount}
        selectedTerm={selectedTerm}
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <RecommendProductList
        visible={visible}
        savingsProducts={savingsProducts}
        monthlyAmount={monthlyAmount}
        selectedTerm={selectedTerm}
        selectedSavingsProduct={selectedSavingsProduct}
      />
    </>
  );
}
