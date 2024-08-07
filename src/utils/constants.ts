export const stockStatuses = {
  pending: {
    color: '#FF9500',
    value: 'В ожидании',
  },
  rejected: {
    color: '#FF2800',
    value: 'Откланен',
  },
  confirmed: {
    color: '#30B0C7',
    value: 'Подтвержден',
  },
} as const;
