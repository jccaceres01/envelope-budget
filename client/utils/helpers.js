export const formatDate = (date) => {
  if (typeof date !== 'string') return null;

  try {
    return date.substring(0, 10);
  } catch (er) {
    return null;
  }
}