/**
 * Description
 * @param {number} {number}
 * @returns {string}
 */
export const numberFormat = number => {
  if (number >= 1000)
    return (number / 1000).toFixed(1).replace('.', ',') + ' k';
  return number.toString();
};

export const dateToday = () => {
  const date = new Date();

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};
