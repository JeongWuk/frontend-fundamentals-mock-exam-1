import { useMemo } from 'react';
import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { SavingsProduct } from 'types/savings';
import { calculateResult } from 'utils/calculation';

interface CalculationResultProps {
  visible: boolean;
  selectedSavingsProduct: SavingsProduct | null;
  goalAmount: string;
  monthlyAmount: string;
  selectedTerm: number;
}

export function CalculationResult({
  visible,
  selectedSavingsProduct,
  goalAmount,
  monthlyAmount,
  selectedTerm,
}: CalculationResultProps) {
  const calculatedResult = useMemo(
    () => calculateResult({ selectedSavingsProduct, goalAmount, monthlyAmount, selectedTerm }),
    [selectedSavingsProduct, goalAmount, monthlyAmount, selectedTerm]
  );
  return (
    <>
      {visible && (
        <>
          {selectedSavingsProduct ? (
            <>
              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="예상 수익 금액"
                    topProps={{ color: colors.grey600 }}
                    bottom={calculatedResult.expectedFinalAmount.toLocaleString() + '원'}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />
              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="목표 금액과의 차이"
                    topProps={{ color: colors.grey600 }}
                    bottom={`${calculatedResult.goalDifference.toLocaleString()}원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />
              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="추천 월 납입 금액"
                    topProps={{ color: colors.grey600 }}
                    bottom={`${calculatedResult.recommendedMonthlyAmount.toLocaleString()}원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />
            </>
          ) : (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
          )}
        </>
      )}
    </>
  );
}
