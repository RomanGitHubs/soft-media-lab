export function getCalculatedValue(ndflValue: boolean, amountValue: number) {
  const string = String(amountValue).replace(/\s/g, '');
  const newAmountValue = Number(string);
  const onHand = ndflValue
    ? Number(newAmountValue).toLocaleString('ru-RU')
    : Number((newAmountValue - (newAmountValue / 100) * 13).toFixed()).toLocaleString('ru-RU');
  const ndfl = ndflValue
    ? Number(((newAmountValue / 87) * 13).toFixed()).toLocaleString('ru-RU')
    : Number(((newAmountValue / 100) * 13).toFixed()).toLocaleString('ru-RU');
  const amount = ndflValue
    ? Number(((newAmountValue * 100) / 87).toFixed()).toLocaleString('ru-RU')
    : Number(newAmountValue).toLocaleString('ru-RU');

  return { onHand, ndfl, amount };
}
