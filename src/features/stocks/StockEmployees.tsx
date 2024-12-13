import ContentHeader from '../../ui/ContentHeader';
import { useParams } from 'react-router-dom';
import StockEmployeesCard from './StockEmployeesCard';
import EmptyCard from '../../ui/EmptyCard';
import UpdateContractModal from '../contract/UpdateContractModal';
import { useState } from 'react';
import { useContract } from '../contract/useContract';
import { useStock } from './useStock';
import StockEmployeeStatus from '../../ui/StockEmployeeStatus';
import { useStockTaskContext } from '../../context/StockTaskContext';

export default function StockEmployees() {
  const params = useParams();
  const [currentDataId, setCurrentDataId] = useState('');
  const { tasks } = useStock();
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const { retrieveData, isLoadingData } = useContract(currentDataId);
  const { stockTaskText } = useStockTaskContext();
  return (
    <>
      <div className="content">
        <div className="content__header">
          <ContentHeader
            pagename={'Акции (' + params.name + ')'}
            hasBrand={true}
            hasModel={true}
            hasTasksBackLink={true}
            taskText={`Задание: ${stockTaskText}`}
          />
        </div>
        <div className="content__report content__report__container">
          <StockEmployeeStatus reportsCount={tasks?.number_stock_status} />
        </div>

        <div className="content__main">
          <div className="content__cards">
            <div className="content__row">
              {tasks?.stock?.results?.length > 0 ? (
                (tasks?.stock?.results || []).map((item: { id: string }) => (
                  <StockEmployeesCard
                    key={item.id}
                    item={item}
                    pagename={'stock-employee'}
                    onEdit={() => {
                      setCurrentDataId('');
                      setOpenEditModal(true);
                      setTimeout(() => setCurrentDataId(item.id), 0);
                    }}
                  />
                ))
              ) : (
                <EmptyCard text="drivers" />
              )}
            </div>
          </div>
        </div>
      </div>

      <UpdateContractModal
        retrieveData={retrieveData}
        isOpenModal={isOpenEditModal}
        isLoadingData={isLoadingData}
        onCloseModal={() => setOpenEditModal(false)}
      />
    </>
  );
}
