import { formValueSelector, reduxForm } from 'redux-form';
import { connect, DefaultRootState } from 'react-redux';
import FormComponent from '../components/Form/Form';

const selector = formValueSelector('paymentForm');

const mapStateToProps = (state: DefaultRootState) => {
  const paymentViewValue = selector(state, 'paymentView');
  const ndflValue = selector(state, 'ndfl');
  const amountValue = selector(state, 'amount');
  return { paymentViewValue, ndflValue, amountValue };
};

const Form = connect(mapStateToProps)(FormComponent);

export default reduxForm({
  form: 'paymentForm',
  initialValues: {
    paymentView: 'month',
    ndfl: true,
    amount: 0,
  },
})(Form);
