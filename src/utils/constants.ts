export const STOCK_STATUS = {
  in_process: {
    color: '#FF9500',
    value: 'В ожидании',
  },
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
  completed: {
    color: 'rgb(255, 149, 0)',
    value: 'Завершенные',
  },
} as const;

export const STOCK_STATUS__TYPE = {
  parking: {
    value: 'Парковка',
  },
  direction: {
    value: 'Проезд',
  },
  wish: {
    value: 'Другие',
  },
} as const;

export const REPORT_PHOTO_STATUS = {

  photo_report_rejected: {
    color: '#FF2800',
    value: 'Отклонен фотоотчет',
  },
  confirmed: {
    color: '#30B0C7',
    value: 'Подтвержден',
  },
  notified: {
    color: '#FF9500',
    value: 'Уведомлено',
  },
  not_notified: {
    color: '#C17272',
    value: 'Не уведомлено',
  },
  photo_report_sent: {
    color: '#007AFF',
    value: 'фото отчет отправлен',
  }
} as const;

export const PASTING_STATUS = {
  pending: {
    color: '#FF9500',
    value: 'В ожидании',
  },
  photo_report_rejected: {
    color: '#FF2800',
    value: 'Отклонен фотоотчет',
  },
  'not_assigned': {
    color: 'rgb(193, 114, 114)',
    value: 'Не назначено',
  },
  confirmed: {
    color: '#30B0C7',
    value: 'Подтвержден',
  },
  photo_report_sent: {
    color: '#007AFF',
    value: 'Отправлен фотоотчет ',
  },
  'not-notified': {
    color: '#30B0C7',
    value: 'Не уведомлено',
  },
} as const;

export const CLIENT_COMPANY_STATUS = {
  in_process: {
    color: '#FF9500',
    value: 'В процессе одобрение',
  },
  approved: {
    color: '#007AFF',
    value: 'Одобренные',
  },
  active: {
    color: '#30B0C7',
    value: 'Активные',
  },
  completed: {
    color: '#FF2800',
    value: 'Отклоненные',
  },
} as const;

export const CLIENT_STATUS = {

  not_processed: {
    color: '#FF0000',
    value: 'Не обработано',
  },
  processed: {
    color: '#30B0C7',
    value: 'Обработано',
  },
} as const;

// photo_report_sent - photo_report_sent
// photo_report_rejected - photo_report_rejected
