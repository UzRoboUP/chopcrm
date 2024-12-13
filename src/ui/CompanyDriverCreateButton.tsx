import { useEffect, useState } from 'react';
import { companyDriverType } from '../context/CompanyDriverContext';
import { InputNumber, InputNumberProps } from 'antd';
import { useCompanyDriverContext } from '../context/CompanyDriverContext';
export default function CompanyDriverCreateButton({
  companyId,
  driverId,
}: {
  companyId: string;
  driverId: string;
}) {
  const [active, setActive] = useState(false);
  const { addCompanyDriver, removeCompanyDriver, changeCompanyDriverCount } =
    useCompanyDriverContext();

  useEffect(() => {
    const companyDriver: companyDriverType = {
      company: companyId,
      status_contract: 'active',
      driver: driverId,
      contract_duration: 1,
    };
    if (active) {
      addCompanyDriver(companyDriver);
    } else {
      removeCompanyDriver(companyDriver);
    }
  }, [active]);
  const onChange: InputNumberProps['onChange'] = (value) => {
    changeCompanyDriverCount({
      driverId: driverId,
      count: value as unknown as number,
    });
  };

  return (
    <>
      <button
        style={{
          backgroundColor: active ? '#7F8788' : '#30B0C7',
        }}
        className="card__footer--btn"
        onClick={() => {
          setActive(!active);
        }}
      >
        <span>Выбрать</span>
        {active && (
          <div className="card__footer__dropdown">
            <div className="card__footer__dropdown-text">
              Продолжительность компании (месяцев)
            </div>
            <div
              className="card__footer__dropdown-counter"
              onClick={(e) => e.stopPropagation()}
            >
              <InputNumber
                className="text-center"
                min={1}
                max={12}
                defaultValue={1}
                onChange={onChange}
              />
            </div>
          </div>
        )}
      </button>
    </>
  );
}
//
