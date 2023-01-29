import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Field } from 'redux-form';
import infoIcon from '../../assets/info-icon.svg';
import closeIcon from '../../assets/close-icon.svg';
import { IFormProps } from '../../models/form';
import { PortalModal } from '../PortalModal';
import { getCalculatedValue } from '../../helpers/getCalculatedValue';

export const FormComponent: React.FC<IFormProps> = (props) => {
  const { handleSubmit, change, paymentViewValue, ndflValue, amountValue } = props;

  const [isHover, setHover] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);

  const { onHand, ndfl, amount } = getCalculatedValue(ndflValue, amountValue);

  const handleNdlnFalse = () => {
    change('ndfl', false);
  };

  const handleNdlnTrue = () => {
    change('ndfl', true);
  };

  const allowNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handleInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/\s/g, '');
    if (!value.split('').every((item: string) => allowNumber.includes(item))) return;
    const num = Number(value);
    change('amount', num.toLocaleString());
  };

  const amountValueTrim = Number(String(amountValue).replace(/\s/g, ''));

  return (
    <form className='form' onSubmit={handleSubmit}>
      <PortalModal isHover={isHover} isOpen={isModalOpen} />

      <p className='form__title'>Сумма</p>

      <Form.Label>
        <Field name="paymentView" component="input" type="radio" value="month"/>
          Оклад за месяц
      </Form.Label>

      <div id='modal-root'>
        <Form.Label>
          <Field name="paymentView" component="input" type="radio" value="mrot"/>
          МРОТ
        </Form.Label>
        {isModalOpen
          ? <img
            className='form__mrot-icon'
            src={closeIcon}
            alt='Close icon'
            onClick={() => toggleModal((prevState) => !prevState)}
          />
          : <img
            className='form__mrot-icon'
            src={infoIcon}
            alt='Info icon'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => toggleModal((prevState) => !prevState)}
          />
        }
      </div>

      <Form.Label>
        <Field name="paymentView" component="input" type="radio" value="day" />
        Оклад за день
      </Form.Label>

      <Form.Label>
        <Field name="paymentView" component="input" type="radio" value="hour" />
        Оклад за час
      </Form.Label>

      {paymentViewValue !== 'mrot' &&
      <div className='form__ndfl'>
        <label
          className={ndflValue ? 'form__ndfl-label' : 'form__ndfl-label-b'}
          onClick={handleNdlnFalse}
        >
          Указать с НДФЛ
        </label>

        <label className="switch">
          <Field name="ndfl" component="input" type="checkbox" />
          <span className="slider" />
        </label>

        <label
          className={ndflValue ? 'form__ndfl-label-b' : 'form__ndfl-label'}
          onClick={handleNdlnTrue}
        >
          Без НДФЛ
        </label>
      </div>
      }

      {paymentViewValue !== 'mrot' &&
        <label className='form__input-amount'>
          <Field
            name="amount"
            component="input"
            type="text"
            inputMode='numeric'
            onChange={handleInputAmount}
          />
          {paymentViewValue === 'month' && <span>₽</span>}
          {paymentViewValue === 'day' && <span>₽ в день</span>}
          {paymentViewValue === 'hour' && <span>₽ в час</span>}
        </label>
      }

      {
        paymentViewValue === 'month' && amountValueTrim >= 0 &&
        <div className='form__extention'>
          <p className='form__extention-content'><b>{onHand} ₽</b> сотрудник будет получать на руки</p>
          <p className='form__extention-content'><b>{ndfl} ₽</b> НДФЛ, 13% от оклада</p>
          <p className='form__extention-content'><b>{amount} ₽</b> за сотрудника в месяц</p>
        </div>
      }

      {
        paymentViewValue === 'month' &&
        amountValue < 0 &&
        <div className='form__extention'>
          <p className='form__extention-content'>Введите оклад больше 0.</p>
        </div>
      }

      {/* <button type="submit">Submit</button> */}
    </form>
  );
};
