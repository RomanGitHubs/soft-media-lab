import React from 'react';
import { Form } from './containers';

export interface IFormValue {
  paymentView: string
  ndfl: boolean
  amount: number
}

const App: React.FC = () => {
  const showResults = (values: IFormValue) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <div className='app'>
      <Form onSubmit={showResults} />
    </div>
  );
};

export default App;
