export const formatFCFA = (val: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(Math.round(val)) + ' FCFA';
};

export const formatNumber = (val: number): string => {
  return new Intl.NumberFormat('fr-FR').format(val);
};

export const formatDateFr = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};
