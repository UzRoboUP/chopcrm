/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import { usePastings } from '../pasting/usePastings';
import { useUpdatePasting } from '../pasting/useUpdatePasting';
import CompanyContentCard from './CompanyContentCard';
import { useCompanies } from './useCompanies';

function Companies() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const [currentData, setCurrentData] = useState({});
  const { data: companies, isLoading } = useCompanies();
  const { updatePasting, isLoadingUpdate } = useUpdatePasting();

  console.log('companies', companies);

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
          pagename="Отчетность"
          hasBrand={true}
          hasModel={true}
          hasSaveButton={true}
        />
      </div>
      <div className="content__report content__report__container">
        {/* <ReportStatus reportsCount={reportsCount} /> */}
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
      {/* <Modal
        title={<h2>Назначить об клейку </h2>}
        width="middle"
        open={isOpenModal}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <div className="d-flex justify-center mt-20 mb-20">
          <DatePicker onChange={onChangeDate} />
          <TimePicker
            className="ml-20"
            defaultValue={dayjs('12:08', 'HH:mm')}
            format={'HH:mm'}
            showNow
            onChange={onChangeTime}
          />
        </div>
        <div className="d-flex justify-center">
          <button
            className="btn btn-decline"
            onClick={() => setOpenModal(false)}
            disabled={isLoadingUpdate}
          >
            Отклонить
          </button>
          <button
            disabled={isLoadingUpdate}
            className="btn btn-confirm"
            onClick={handleConfirm}
          >
            Подтвердить
          </button>
        </div>
      </Modal> */}
    </div>
  );
}

export default Companies;
