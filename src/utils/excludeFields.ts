export const exlcudeFields = <
  T extends Record<string, unknown>,
  Key extends keyof T,
>(
  obj: T,
  keys: Key[],
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as Key)),
  );
};
