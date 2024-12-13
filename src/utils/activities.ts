import {
  CheckCircleOutlined,
  CheckOutlined,
  SyncOutlined,
} from '@ant-design/icons';

export const STATUS = {
  active: {
    name: 'Активный',
    color: '#30B0C7',
    icon: CheckCircleOutlined,
  },
  in_process: {
    name: 'В процессе',
    color: '#FF9500',
    icon: SyncOutlined,
  },
  approved: {
    name: 'Одобренный',
    color: '#007AFF',
    icon: CheckCircleOutlined,
  },
  completed: {
    name: 'Завершенный',
    color: '#FF2800',
    icon: CheckOutlined,
  },
} as const;

export type StatusKey = keyof typeof STATUS;
