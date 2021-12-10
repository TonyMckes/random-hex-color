const isHexColor = (value) =>
  /^([A-F0-9]{3,4}|[A-F0-9]{6}|[A-F0-9]{8})$/i.test(value);

const randomColor = () => {
  const randomHex = Math.floor(Math.random() * 16777215)
    .toString(16)
    .toUpperCase();

  if (!isHexColor(randomHex)) return randomColor();

  return randomHex;
};

export { randomColor, isHexColor };
