/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import EmptyCard from '../../ui/EmptyCard';
import { useReports } from '../reports/useReports';
import LeadContentCard from './LeadContentCard';
import { useLeads } from './useLeads';

function Leads() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useLeads();

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
              <EmptyCard text="tracks" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;
