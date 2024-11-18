import { Checkbox, CheckboxProps } from 'antd';
import React from 'react';
import { RateModal } from './RateModal';

import { CarService } from './CompanyRate';
import { useRateContext } from '../context/RadeContext';

interface Props {
  className?: string;
  title: string;
  menu: CarService;
}

export const CompanyRateItem: React.FC<Props> = ({ title, menu }) => {
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const { filteredRate, rates } = useRateContext();
  const onChange: CheckboxProps['onChange'] = (e) => {
    
    if (e?.target?.checked) {
      setIsModalOpen(true);
    } else {
      filteredRate(rates.filter((item) => item?.id !== menu?.id));
    }
    setCheck(e.target.checked);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: 'relative', width: '100%' }}
    >
      <Checkbox onChange={onChange} checked={check}>
        {title}
      </Checkbox>
      {check && (
        <RateModal
          menu={menu}
          setCheck={setCheck}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
