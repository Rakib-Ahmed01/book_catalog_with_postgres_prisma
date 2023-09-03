export const handleSearch = (search: string, fields: string[]) => {
  if (search) {
    return {
      OR: fields.map((f) => ({
        [f]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    };
  }
  return {};
};
