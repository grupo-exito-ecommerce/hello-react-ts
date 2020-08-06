const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitalizeKeys = (obj: { [k: string]: any }): any =>
  Object.keys(obj).reduce(
    (acc, key: string) => ({
      ...acc,
      ...{ [capitalize(key)]: obj[key] }
    }),
    {}
  );

export const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9);
};
