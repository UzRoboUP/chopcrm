/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker } from 'antd';
import { useState } from 'react';
import EmptyCard from '../../ui/EmptyCard';
import Modal from '../../ui/Modal';
import ReportContentCard from './ReportContentCard';
import { useReports } from './useReports';
import ContentHeader from '../../ui/ContentHeader';
import ReportStatus from '../../ui/ReportStatus';

function Reports() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const {  reports, isLoading,reportsCount } = useReports();
  console.log( reports);

  if (isLoading && !Object.keys( reports || {})?.length) {
    return;
  }

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader
          pagename="Отчетность"
          hasBrand={true}
          hasModel={true}
          hasSaveButton={true}
        />
        {/* <button onClick={() => setOpenModal(true)}>Open modal</button> */}
      </div>
      <div className="content__report content__report__container">
        <ReportStatus reportsCount={reportsCount} />
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            { reports?.results?.length > 0 ? (
              ( reports?.results || []).map((item: { id: string }) => (
                <ReportContentCard
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
      <Modal
        title={<h2>Передвижение водителя</h2>}
        width="middle"
        open={isOpenModal}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        accusamus unde, eveniet neque quibusdam, asperiores libero sunt
        assumenda architecto porro non alias mollitia! Mollitia nobis beatae
        officiis illum, tenetur voluptate?
        <br />
        <DatePicker />
        <br />
        <div className="d-flex justify-center">
          <button className="btn btn-decline">Отклонить</button>
          <button className="btn btn-confirm">Подтвердить</button>
        </div>
      </Modal>
    </div>
  );
}

export default Reports;
