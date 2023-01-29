export function getCalculatedValue(ndflValue: boolean, amountValue: number) {
  const string = String(amountValue).replace(/\s/g, '');
  const newAmountValue = Number(string);
  const onHand = ndflValue
    ? Number(newAmountValue).toLocaleString()
    : Number((newAmountValue - (newAmountValue / 100) * 13).toFixed()).toLocaleString();
  const ndfl = ndflValue
    ? Number(((newAmountValue / 87) * 13).toFixed()).toLocaleString()
    : Number(((newAmountValue / 100) * 13).toFixed()).toLocaleString();
  const amount = ndflValue
    ? Number(((newAmountValue * 100) / 87).toFixed()).toLocaleString()
    : Number(newAmountValue).toLocaleString();

  return { onHand, ndfl, amount };
}
