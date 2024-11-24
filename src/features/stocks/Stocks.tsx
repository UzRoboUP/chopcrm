/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import StockStatus from '../../ui/StockStatus';
import StockContentCard from './StockContentCard';
import { useStocksTask } from './useStocksTask';
// import StockTaskModal from './StockTaskModal';
function Stocks() {
  // const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  // const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useStocksTask();
  // const closeModal = () => {
  //   setOpenModal(false);
  // };

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader
          hasAddButton
          hasStock
          // openTaskModal={() => setOpenModal(true)}
          pagename="Акции"
        />
      </div>
      <div className="content__report content__report__container">
        <StockStatus reportsCount={data?.number_stock_task_status} />
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.stock?.length > 0 ? (
              (data?.stock || []).map((item: { id: string }) => (
                <StockContentCard
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    // setCurrentDataId('');
                    setOpenEditModal(true);
                    // setTimeout(() => setCurrentDataId(item.id), 0);
                  }}
                />
              ))
            ) : (
              <EmptyCard text="stock" />
            )}
          </div>
        </div>
      </div>
      {/* <StockTaskModal isOpenModal={isOpenModal} onCloseModal={closeModal} /> */}
    </div>
  );
}

export default Stocks;
