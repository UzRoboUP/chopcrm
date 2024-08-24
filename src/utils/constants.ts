export const STOCK_STATUS = {
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

export const REPORT_PHOTO_STATUS = {
  pending: {
    // todo should be removed
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

export const PASTING_STATUS = {
  pending: {
    color: '#FF9500',
    value: 'В ожидании',
  },
  rejected: {
    color: '#FF2800',
    value: 'Не подтверждено',
  },
  'non-assigned': {
    color: '#FF2800',
    value: 'Не назначено',
  },
  confirmed: {
    color: '#30B0C7',
    value: 'Подтвержден',
  },
  notified: {
    color: '#30B0C7',
    value: 'Уведомлен',
  },
  'not-notified': {
    color: '#30B0C7',
    value: 'Не уведомлено',
  },
} as const;

export const CLIENT_COMPANY_STATUS = {
  'not-processed': {
    color: '#FF9500',
    value: 'В процессе одобрение',
  },
  processed: {
    color: '#007AFF',
    value: 'Одобренные',
  },
} as const;

// photo_report_sent - photo_report_sent
// photo_report_rejected - photo_report_rejected
