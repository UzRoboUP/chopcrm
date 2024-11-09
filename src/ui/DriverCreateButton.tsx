import { message, Popconfirm, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useCreateContract } from '../features/contract/useCreateContract';
import { useQueryClient } from '@tanstack/react-query';
export default function DriverCreateButton({
  driverId,
  companyId,
}: {
  driverId: string;
  companyId: string | undefined;
}) {
  const [active, setACtive] = useState(false);
  const [counter, setCounter] = useState(1);
  const { createContract, isLoadingContract } = useCreateContract();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (active) {
      setCounter(1);
    }
  }, [active]);

  const onChange = () => {
    setACtive(!active);
  };
  const confirm = () => {
    const d = {
      company: companyId,
      driver: driverId,
      status_contract: 'recomended',
      contract_duration: counter,
    };
    createContract(d, {
      onSuccess: () => {
        message.success('Contrcat created');
        queryClient.invalidateQueries({ queryKey: [`drivers`] });
      },
    });
  };

  return (
    <>
      <Popconfirm
        open={active}
        placement="bottom"
        icon={false}
        okText={isLoadingContract ? <span><Spin size='small' style={{color:"#fff"}}/> Да</span>  : 'Да'}
        cancelText="Нет"
        title={
          <div className="card__footer-counter-title">
            Продолжительность компании
          </div>
        }
        okButtonProps={{
          loading: isLoadingContract,
          disabled: isLoadingContract,
        }}
        description={
          <div className="card__footer-counter-btn">
            <img
              onClick={() => setCounter(counter - 1)}
              src="/img/card/minus.svg"
              alt=""
              style={{ width: '12px', cursor: 'pointer' }}
            />
            <span className='"card__footer-counter-text'>
              {counter} месяцев
            </span>
            <img
              src="/img/card/plus.svg"
              alt=""
              style={{ width: '12px', cursor: 'pointer' }}
              onClick={() => setCounter(counter + 1)}
            />
          </div>
        }
        onConfirm={confirm}
        onCancel={() => setACtive(false)}
      >
        <button
          style={{
            backgroundColor: active ? '#7F8788' : '#30B0C7',
          }}
          className="card__footer--btn"
          onClick={onChange}
        >
          Выбрать
        </button>
      </Popconfirm>
    </>
  );
}
