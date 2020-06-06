export default (hours) => {
  if (hours < 50.0) return 1;
  if (hours < 100.0) return 2;
  if (hours < 150.0) return 3;

  return 4;
};
