/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Input, Typography } from "antd";
import { useState } from "react";
import ContentCard from "../../ui/ContentCard";
import ContentHeader from "../../ui/ContentHeader";
import EmptyCard from "../../ui/EmptyCard";
import Modal from "../../ui/Modal";
import { useTrack } from "./useTrack";
import { useTracks } from "./useTracks";
function Tracks() {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');

  const { data, isLoading } = useTracks();
  const { retrieveData, isLoadingData } = useTrack(currentDataId);

  const handleSaveUpdate = () => {

  };


  if (isLoading && !Object.keys(data || {})?.length) {
    return;
  }


  // { count, current_page, total_pages, results }
  console.log('DATA: ', data);

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader pagename="track" />
      </div>
      <div className="content__report">
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.results?.length > 0 ? (data?.results || []).map((item: { id: string; }) => (
              <ContentCard key={item.id} item={item} pagename='track' onEdit={() => {
                setCurrentDataId('');
                setOpenEditModal(true);
                setTimeout(() => setCurrentDataId(item.id), 0);
              }} />
            )) : <EmptyCard text='tracks' />}
          </div>
        </div>
      </div>
      <Modal
        title='Update: Jahongir Umirzoqov'
        width="middle"
        open={isOpenEditModal}
        loading={isLoadingData}
        onCancel={() => {
          setOpenEditModal(false);
          setCurrentDataId('');
        }}
      >
        <div className="mt-20">
          {JSON.stringify(retrieveData)}
          <div className="d-flex justify-between mb-5">
            <Typography.Title level={5}>Фамилия *</Typography.Title>
            <Input
              style={{ width: 225, float: 'inline-end', height: 30 }}
              defaultValue=""
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <Typography.Title level={5}>Имя *</Typography.Title>
            <Input
              style={{ width: 225, float: 'inline-end', height: 30 }}
              defaultValue=""
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <Typography.Title level={5}>Номер телефона</Typography.Title>
            <Input
              style={{ width: 225, float: 'inline-end', height: 30 }}
              defaultValue=""
              type="number"
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <Typography.Title level={5}>Тип машины</Typography.Title>
            <Input
              style={{ width: 225, float: 'inline-end', height: 30 }}
              defaultValue=""
            />
          </div>
          <div className="d-flex justify-between">
            <Typography.Title level={5}>Компания</Typography.Title>
            <Input
              style={{ width: 225, float: 'inline-end', height: 30 }}
              defaultValue=""
            />
          </div>
          <div className="mt-20 d-flex justify-center">
            <Button onClick={handleSaveUpdate} type="primary" className="" style={{ backgroundColor: '#21529C', width: 225 }}>Сохранить</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


export default Tracks;