/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker, TimePicker, TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import Modal from '../../ui/Modal';
import PastingContentCard from './PastingContentCard';
import { usePastings } from './usePastings';

function Pasting() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data: pastings, isLoading } = usePastings();

  dayjs.extend(customParseFormat);

  const onChangeTime: TimePickerProps['onChange'] = (time, timeString) => {
    console.log(time, timeString);
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
        <button onClick={() => setOpenModal(true)}>Open modal</button>
      </div>
      <div className="content__report content__report__container">
        {/* <ReportStatus reportsCount={reportsCount} /> */}
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {pastings?.results?.length > 0 ? (
              (pastings?.results || []).map((item: { id: string }) => (
                <PastingContentCard
                  key={item.id}
                  item={item}
                  pagename="pasting"
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
        title={<h2>Назначить об клейку </h2>}
        width="middle"
        open={isOpenModal}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <div className="d-flex justify-center mt-20 mb-20">
          <DatePicker />
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
          >
            Отклонить
          </button>
          <button className="btn btn-confirm">Подтвердить</button>
        </div>
      </Modal>
    </div>
  );
}

export default Pasting;
