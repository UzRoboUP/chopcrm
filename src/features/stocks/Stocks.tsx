/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import EmptyCard from '../../ui/EmptyCard';
import StockContentCard from './StockContentCard';
import { useStocks } from './useStocks';

function Stocks() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useStocks();

  console.log('data', data);

  if (isLoading && !Object.keys(data || {})?.length) {
    return;
  }
  return (
    <div className="content">
      <div className="content__header"></div>
      <div className="content__report"></div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.results?.length > 0 ? (
              (data?.results || []).map((item: { id: string }) => (
                <StockContentCard
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setCurrentDataId('');
                    setOpenEditModal(true);
                    setTimeout(() => setCurrentDataId(item.id), 0);
                  }}
                />
              ))
            ) : (
              <EmptyCard text="tracks" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stocks;
