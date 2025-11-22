import { Assets, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { SavingsProduct } from 'types/savings';
import { calculateRecommendation } from 'utils/calculation';

interface RecommendProductListProps {
  visible: boolean;
  savingsProducts: SavingsProduct[];
  monthlyAmount: string;
  selectedTerm: number;
  selectedSavingsProduct: SavingsProduct | null;
}

export function RecommendProductList({
  visible,
  savingsProducts,
  monthlyAmount,
  selectedTerm,
  selectedSavingsProduct,
}: RecommendProductListProps) {
  const topTwoRecommendations = calculateRecommendation({ products: savingsProducts, monthlyAmount, selectedTerm });
  return (
    <>
      {visible && (
        <>
          <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
          <Spacing size={12} />
          {topTwoRecommendations.length > 0 ? (
            topTwoRecommendations.map(product => (
              <ListRow
                key={product.id}
                contents={
                  <ListRow.Texts
                    type="3RowTypeA"
                    top={product.name}
                    topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                    middle={`연 이자율: ${product.annualRate}%`}
                    middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                    bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
                    bottomProps={{ fontSize: 13, color: colors.grey600 }}
                  />
                }
                right={selectedSavingsProduct?.id === product.id && <Assets.Icon name="icon-check-circle-green" />}
              />
            ))
          ) : (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="적합한 상품이 없습니다." />} />
          )}
        </>
      )}
    </>
  );
}
