import { useEffect, useState } from 'react';
import { colors, ListRow, Assets, Flex } from 'tosslib';
import { SavingsProduct } from 'types/savings';
import { filterSavingsProducts } from 'utils/filter';

interface ProductListProps {
  visible: boolean;
  savingsProducts: SavingsProduct[] | null;
  monthlyAmount: string;
  selectedTerm: number;
  selectedSavingsProductId: string | null;
  onSelectSavingsProduct: (product: SavingsProduct | null) => void;
}

export function ProductList({
  visible,
  savingsProducts,
  monthlyAmount,
  selectedTerm,
  selectedSavingsProductId,
  onSelectSavingsProduct,
}: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState<SavingsProduct[]>([]);

  function handleSelectProduct(product: SavingsProduct) {
    if (selectedSavingsProductId === product.id) {
      return;
    } else {
      onSelectSavingsProduct(product);
    }
  }

  useEffect(() => {
    if (savingsProducts) {
      setFilteredProducts(
        filterSavingsProducts(savingsProducts, {
          monthlyAmount,
          term: selectedTerm,
        })
      );
    }
  }, [savingsProducts, monthlyAmount, selectedTerm]);

  return (
    <>
      {visible && (
        <>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
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
                onClick={() => handleSelectProduct(product)}
                right={selectedSavingsProductId === product.id && <Assets.Icon name="icon-check-circle-green" />}
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
