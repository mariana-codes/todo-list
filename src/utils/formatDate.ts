export const formatDate = (date: Date | null): string => {
  if (!date) {
    return "-";
  }
  return new Intl.DateTimeFormat("pt-PT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
