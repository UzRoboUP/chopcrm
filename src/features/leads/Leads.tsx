/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import LeadContentCard from './LeadContentCard';
import { useLeads } from './useLeads';

function Leads() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useLeads();

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader pagename="Лиды" hasSaveButton={true} hasDate={true} />
      </div>
      <div className="content__report"></div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.results?.length > 0 ? (
              (data?.results || []).map((item: { id: string }) => (
                <LeadContentCard
                  key={item.id}
                  item={item}
                  pagename="report"
                  onEdit={() => {
                    setCurrentDataId('');
                    setOpenEditModal(true);
                    setTimeout(() => setCurrentDataId(item.id), 0);
                  }}
                />
              ))
            ) : (
              <EmptyCard text="leads" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;
