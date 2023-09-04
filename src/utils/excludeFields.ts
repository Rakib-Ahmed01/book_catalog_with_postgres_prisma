export const exlcudeFields = <
  T extends Record<string, unknown>,
  Key extends keyof T,
>(
  obj: T,
  keys: Key[],
): Omit<T, Key[][number]> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
};
