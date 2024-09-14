/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import { usePastings } from '../pasting/usePastings';
import { useUpdatePasting } from '../pasting/useUpdatePasting';
import CompanyContentCard from './CompanyContentCard';
import { useCompanies } from './useCompanies';
import CompanyStatus from '../../ui/CompanyStatus';
import CreateСompanyModal from './CreateСompanyModal';

function Companies() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenCompanyModal, setOpenCompanyModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const [currentData, setCurrentData] = useState({});
  const { data: companies, isLoading } = useCompanies();
  const { updatePasting, isLoadingUpdate } = useUpdatePasting();

  const [timeDate, setTimeDate] = useState({
    time: '',
    date: '',
  });

  const handleConfirm = () => {
    const combinedDateTime = `${timeDate.date}T${timeDate.time}:00Z`;
    const dateObject = new Date(combinedDateTime);
    updatePasting(
      {
        id: currentData?.id,
        contract: currentData?.contract,
        status_pasting: currentData?.status_pasting,
        pasting_time: dateObject.toISOString(),
      },
      {
        onSuccess() {
          setOpenModal(false);
          setCurrentData({});
        },
      },
    );
  };

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader
          pagename="Компании"
          hasAddButton
          openModal={() => setOpenCompanyModal(true)}
        />
      </div>
      <div className="content__report content__report__container">
        <CompanyStatus reportsCount={companies?.number_report_status} />
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {companies?.client_company_list?.results?.length > 0 ? (
              (companies?.client_company_list?.results || []).map(
                (item: { id: string }) => (
                  <CompanyContentCard
                    key={item.id}
                    item={item}
                    pagename="company"
                    onOpenModal={() => {
                      setCurrentData(item);
                      setOpenModal(true);
                    }}
                    onEdit={() => {
                      setCurrentDataId('');
                      setOpenEditModal(true);
                      setTimeout(() => setCurrentDataId(item.id), 0);
                    }}
                  />
                ),
              )
            ) : (
              <EmptyCard text="company" />
            )}
          </div>
        </div>
      </div>

      <CreateСompanyModal
        isOpenModal={isOpenCompanyModal}
        onCloseModal={() => setOpenCompanyModal(false)}
      />
    </div>
  );
}

export default Companies;
