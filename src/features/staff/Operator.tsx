/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import { useStaffList } from '../authentication/useStaffList';
import OperatorContentCard from '../tracks/StaffContentCard';
import UpdateStaffDataModal from './UpdateStaffDataModal';
import { useStaff } from './useStaff';
function Operator() {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useStaffList('operator');

  const { retrieveData, isLoadingData } = useStaff(currentDataId);

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader pagename="Оператор" hasAddButton={true} />
      </div>
      <div className="content__report"></div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.length > 0 ? (
              (data || []).map((item: { id: string }) => (
                <OperatorContentCard
                  key={item.id}
                  item={item}
                  pagename="operator"
                  onEdit={() => {
                    setCurrentDataId('');
                    setOpenEditModal(true);
                    setTimeout(() => setCurrentDataId(item.id), 0);
                  }}
                />
              ))
            ) : (
              <EmptyCard text="operator" />
            )}
          </div>
        </div>
      </div>
      <UpdateStaffDataModal
        pagename="operator"
        retrieveData={retrieveData}
        isOpenModal={isOpenEditModal}
        isLoadingData={isLoadingData}
        onCloseModal={() => setOpenEditModal(false)}
      />
    </div>
  );
}

export default Operator;
