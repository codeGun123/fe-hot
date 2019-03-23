export const formartMoney = value => {
  return value ? parseFloat(value / 100).toFixed(2) : '';
};

export const formatProp = props => {
  const result = [];

  (props || []).map(item => {
    result.push(item.propName + ':' + item.value);
  });

  return result.join(' ');
};
