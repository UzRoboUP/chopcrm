/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import StockStatus from '../../ui/StockStatus';
import StockContentCard from './StockContentCard';
import { useStocks } from './useStocks';

function Stocks() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useStocks();

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader
          pagename="Акции"
          hasBrand={true}
          hasModel={true}
          hasTask={true}
          taskText="Задание: Проехать с улицы Алишер навои до улицы фараби 15:00 - 16:00 20.05.2024"
        />
      </div>
      <div className="content__report content__report__container">
        <StockStatus reportsCount={data?.number_stock_status} />
      </div>
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
