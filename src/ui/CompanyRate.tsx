import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Empty, MenuProps } from 'antd';
import { CompanyRateItem } from './CompanyRateItem';
import { useCarService } from '../features/car/useCarService';
import { SidesType } from './RateModal';

interface Props {
  className?: string;
}

export interface CarService {
  car_sides: SidesType[];
  id: string;
  name: string;
  price: string;
}

export const CompanyRate: React.FC<Props> = () => {
  const { data } = useCarService();
 
  const items: MenuProps['items'] =
    data && data.length > 0
      ? data.map((item: CarService) => {
          return {
            label: <CompanyRateItem menu={item} title={item?.name} />,
            key: item?.id,
          };
        })
      : [
          {
            label: <Empty style={{ width: '100%' }} />,
            key: 'empty',
            disabled: true,
          },
        ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps}>
      <Button
        style={{ width: '100%', height: 40 }}
        className="d-flex justify-between"
      >
        Выберите тариф
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
