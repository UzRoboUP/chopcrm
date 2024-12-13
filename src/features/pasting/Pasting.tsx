/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker, TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import Modal from '../../ui/Modal';
import PastingContentCard from './PastingContentCard';
import { usePastings } from './usePastings';
import { useUpdatePasting } from './useUpdatePasting';
import PostingStatus from '../../ui/PostingStatus';
import { useArchivedUpdatePastingAll } from './useArchivedUpdatePastingAll';

function Pasting() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const [currentData, setCurrentData] = useState({});
  const { data: pastings, isLoading } = usePastings();
  const { updatePasting, isLoadingUpdate } = useUpdatePasting();
  const { updateArchivedPastingAll, isLoadingArchivedPastingUpdateAll } =
    useArchivedUpdatePastingAll();

  const updatePastingArchiveAll = () => {
    const ids = pastings?.pastings?.results.filter(
      (item: { status_pasting: string }) => item.status_pasting == 'confirmed',
    );
    updateArchivedPastingAll({
      ids: ids.map((el: { id: string }) => el?.id),
      is_archived: true,
    });
  };

  const [timeDate, setTimeDate] = useState();
  dayjs.extend(customParseFormat);

  const onChangeDate: TimePickerProps['onChange'] = (date, dateString) => {
    setTimeDate(date?.$d);
    console.log(dateString);
  };

  const handleConfirm = () => {
    updatePasting(
      {
        id: currentData?.id,
        pasting_time: timeDate as unknown as string,
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
          hasArchived={true}
          pagename="Обклейка"
          hasHistory={true}
          updatePastingArchiveAll={updatePastingArchiveAll}
          isLoadingArchivedPastingUpdateAll={isLoadingArchivedPastingUpdateAll}
        />
      </div>
      <div className="content__report content__report__container">
        <PostingStatus reportsCount={pastings?.number_report_status} />
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {pastings?.pastings.results?.length > 0 ? (
              (pastings?.pastings?.results || []).map(
                (item: { id: string }) => (
                  <PastingContentCard
                    key={item.id}
                    item={item}
                    pagename="pasting"
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
          <DatePicker
            showTime
            onChange={onChangeDate}
            defaultValue={dayjs(new Date())}
          />
          {/* <TimePicker
            className="ml-20"
            // defaultValue={dayjs('12:08', 'HH:mm')}
            format={'HH:mm'}
            showNow
            onChange={onChangeTime}
          /> */}
        </div>
        <div className="d-flex justify-center">
          <button
            className="btn btn-decline"
            onClick={() => setOpenModal(false)}
            disabled={isLoadingUpdate}
          >
            Отменить
          </button>
          <button
            disabled={isLoadingUpdate}
            className="btn btn-confirm"
            onClick={handleConfirm}
          >
            Добавить
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Pasting;
