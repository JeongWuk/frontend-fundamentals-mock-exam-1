import { useState } from 'react';
import { formatNumericValue } from 'utils/format';

export function useFiltering() {
  const [goalAmount, setGoalAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(12);

  function handleGoalAmountChange(value: string) {
    setGoalAmount(formatNumericValue(Number(value.replace(/,/g, ''))));
  }

  function handleMonthlyAmountChange(value: string) {
    setMonthlyAmount(formatNumericValue(Number(value.replace(/,/g, ''))));
  }

  function handleTermChange(value: number) {
    setSelectedTerm(value);
  }

  return {
    goalAmount,
    monthlyAmount,
    selectedTerm,
    handleGoalAmountChange,
    handleMonthlyAmountChange,
    handleTermChange,
  };
}
