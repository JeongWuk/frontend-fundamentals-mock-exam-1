import { SelectBottomSheet, Spacing, TextField } from 'tosslib';

interface InputFormProps {
  goalAmount: string;
  monthlyAmount: string;
  selectedTerm: number;
  handleGoalAmountChange: (value: string) => void;
  handleMonthlyAmountChange: (value: string) => void;
  handleTermChange: (value: number) => void;
}

export function InputForm({
  goalAmount,
  monthlyAmount,
  selectedTerm,
  handleGoalAmountChange,
  handleMonthlyAmountChange,
  handleTermChange,
}: InputFormProps) {
  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={goalAmount}
        onChange={e => handleGoalAmountChange(e.target.value)}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyAmount}
        onChange={e => handleMonthlyAmountChange(e.target.value)}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={selectedTerm}
        onChange={handleTermChange}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
}
