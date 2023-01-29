import { ChangeAction, SubmitHandler } from 'redux-form';

type PaymentType = 'month' | 'mrot' | 'day' | 'hour';

export interface IFormProps {
  paymentViewValue: PaymentType;
  ndflValue: boolean;
  amountValue: number;
  handleSubmit: SubmitHandler<{ paymentView: string; ndfl: boolean; amount: number; }>;
  change: ChangeAction;
}
