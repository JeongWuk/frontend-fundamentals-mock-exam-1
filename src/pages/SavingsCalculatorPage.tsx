import { InputForm } from 'components/InputForm';
import { ProductList } from 'components/ProductList';
import { Result } from 'components/result';
import { useFiltering } from 'hooks/useFiltering';
import { useSavingsProducts } from 'hooks/useSavingsProducts';
import { useState } from 'react';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProduct } from 'types/savings';

export function SavingsCalculatorPage() {
  const [selectedSavingsProduct, setSelectedSavingsProduct] = useState<SavingsProduct | null>(null);
  const [selectedTab, setSelectedTab] = useState<'products' | 'results'>('products');
  const { savingsProducts } = useSavingsProducts();
  const {
    goalAmount,
    monthlyAmount,
    selectedTerm,
    handleGoalAmountChange,
    handleMonthlyAmountChange,
    handleTermChange,
  } = useFiltering();
  return (
    <>
      <NavigationBar title="적금 계산기" />
      <Spacing size={16} />
      <InputForm
        goalAmount={goalAmount}
        monthlyAmount={monthlyAmount}
        selectedTerm={selectedTerm}
        handleGoalAmountChange={handleGoalAmountChange}
        handleMonthlyAmountChange={handleMonthlyAmountChange}
        handleTermChange={handleTermChange}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={e => setSelectedTab(e as 'products' | 'results')}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      <ProductList
        visible={selectedTab === 'products'}
        savingsProducts={savingsProducts}
        monthlyAmount={monthlyAmount}
        selectedTerm={selectedTerm}
        selectedSavingsProductId={selectedSavingsProduct?.id || null}
        onSelectSavingsProduct={setSelectedSavingsProduct}
      />

      <Spacing size={8} />

      <Result
        visible={selectedTab === 'results'}
        savingsProducts={savingsProducts}
        goalAmount={goalAmount}
        monthlyAmount={monthlyAmount}
        selectedTerm={selectedTerm}
        selectedSavingsProduct={selectedSavingsProduct}
      />

      <Spacing size={40} />
    </>
  );
}
