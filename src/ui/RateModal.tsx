import { Button, Checkbox, Empty, GetProp, Modal } from 'antd';
import React, { useState } from 'react';
import { CarService } from './CompanyRate';
// import { Rate, useRateContext } from '@/context/RadeContext';
import { Rate, useRateContext } from '../context/RadeContext';
export interface SidesType {
  id: string;
  name: string;
  image_url: string;
}
interface Props {
  className?: string;
  isModalOpen: boolean;
  setIsModalOpen: (a: boolean) => void;
  setCheck: (a: boolean) => void;
  menu: CarService;
}

export const RateModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  setCheck,
  menu,
}) => {
  const [sites, setSite] = useState<string[]>([]);

  const { addRate } = useRateContext();
  const handleOk = () => {
    setIsModalOpen(false);
    const rate_list = {
      tarif_name: menu?.name,
      price: menu?.price,
      number_of_car: counter,
      car_sides: sites,
      id: menu?.id,
    };
    addRate(rate_list as unknown as Rate);
  };
  const [counter, setCounter] = useState(0);
  const options =
    menu?.car_sides?.length > 0
      ? menu?.car_sides?.map((item: SidesType) => {
          return {
            label: (
              <div className="rate-col">
                <div className="rate-card">
                  <img
                    src={item?.image_url}
                    alt=""
                    width={103}
                    height={49}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className="rate-card-title">{item?.name}</h4>
              </div>
            ),
            value: item?.name,
          };
        })
      : [];

  const onChangeRate: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues,
  ) => {

    if (checkedValues.length == 0) {
      setCheck(false);
    }
    setSite([
      ...(checkedValues.map((item) => {
        return { name: item };
      }) as unknown as string),
    ]);
  };

  return (
    <>
      <Modal
        footer={false}
        className="rate-modal"
        width="450px"
        title={
          <div className="text-center rate-title">Выберите место оклейки</div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <Checkbox.Group options={options} onChange={onChangeRate} />
        <div className="rate-modal-footer d-flex align-center justify-between mt-10 gap-20">
          {options.length > 0 ? (
            <>
              <div className="rate-car-counter d-flex align-center gap-7">
                <Button
                  size="small"
                  style={{ fontSize: '12px' }}
                  onClick={() => setCounter(counter > 0 ? counter - 1 : 0)}
                >
                  -
                </Button>
                <span className="counter-text">{counter}</span>
                <Button
                  size="small"
                  style={{ fontSize: '12px' }}
                  onClick={() => setCounter(counter + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                disabled={counter > 0 ? false : true}
                type="primary"
                size="small"
                style={{ fontSize: '12px' }}
                onClick={handleOk}
              >
                Ok
              </Button>
            </>
          ) : (
            <div className="d-flex justify-center w-100">
              {' '}
              <Empty description="Нет информации" />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
