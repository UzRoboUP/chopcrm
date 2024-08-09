export const stockStatus = {
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

export const reportPhotoStatus = {
  pending: {
    color: '#FF9500',
    value: 'В ожидании',
  },
  photo_report_rejected: {
    color: '#FF2800',
    value: 'Откланен',
  },
  confirmed: {
    color: '#30B0C7',
    value: 'Подтвержден',
  },
  notified: {
    color: '#FF9500',
    value: 'Уведомлено',
  },
  'not-notified': {
    color: '#C17272',
    value: 'Не уведомлено',
  },
  photo_report_sent: {
    color: '#007AFF',
    value: 'фото отчет отправлен',
  },
  call: {
    color: '#30B0C7',
    value: 'Позвонить',
  },
} as const;
