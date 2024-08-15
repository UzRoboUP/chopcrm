/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import { useStaffList } from '../authentication/useStaffList';
import OperatorContentCard from '../tracks/StaffContentCard';
function Registration() {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useStaffList('moderator');

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader pagename="Регистраторы"  hasAddButton={true}/>
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
                  pagename="moderator"
                  onEdit={() => {
                    setCurrentDataId('');
                    setOpenEditModal(true);
                    setTimeout(() => setCurrentDataId(item.id), 0);
                  }}
                />
              ))
            ) : (
              <EmptyCard text="moderator" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
