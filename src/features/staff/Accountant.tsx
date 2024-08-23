/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import { useStaffList } from '../authentication/useStaffList';
import StaffContentCard from '../tracks/StaffContentCard';
import CreateStaffDataModal from './CreateStaffDataModal';
import UpdateStaffDataModal from './UpdateStaffDataModal';
import { useStaff } from './useStaff';
function Accountant() {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useStaffList('accountant');
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  const { retrieveData, isLoadingData } = useStaff(currentDataId);
  const openModal = () => {
    setOpenCreateModal(true);
  };

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader
          pagename="Регистраторы"
          hasAddButton={true}
          openModal={openModal}
        />
      </div>
      <div className="content__report"></div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.length > 0 ? (
              (data || []).map((item: { id: string }) => (
                <StaffContentCard
                  key={item.id}
                  item={item}
                  pagename="accountant"
                  onEdit={() => {
                    setCurrentDataId('');
                    setOpenEditModal(true);
                    setTimeout(() => setCurrentDataId(item.id), 0);
                  }}
                />
              ))
            ) : (
              <EmptyCard text="accountant" />
            )}
          </div>
        </div>
      </div>
      <UpdateStaffDataModal
        pagename="accountant"
        retrieveData={retrieveData}
        isOpenModal={isOpenEditModal}
        isLoadingData={isLoadingData}
        onCloseModal={() => setOpenEditModal(false)}
      />
      <CreateStaffDataModal
        isOpenModal={isOpenCreateModal}
        onCloseModal={() => setOpenCreateModal(false)}
        isStatus="accountant"
      />
    </div>
  );
}

export default Accountant;
