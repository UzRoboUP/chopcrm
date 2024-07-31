/* eslint-disable react/prop-types */
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, message, Typography } from 'antd';
import Modal from '../../ui/Modal';
import { useTrackUpdate } from './useTrackUpdate';

function UpdateDataModal({
  pagename,
  retrieveData,
  isLoadingData,
  isOpenModal,
  onCloseModal,
}) {
  const queryClient = useQueryClient();

  const { updateTrack, isLoadingUpdate } = useTrackUpdate();

  const handleSaveUpdate = () => {
    switch (pagename) {
      case 'track':
        updateTrack(
          {
            id: retrieveData.id,
            status_contract: retrieveData.status_contract,
            company: retrieveData.company,
            driver: retrieveData.driver,
          },
          {
            onSuccess: (data) => {
              queryClient.setQueryData(['trackUpdate'], data);
              queryClient.invalidateQueries({ queryKey: ['tracks'] });
              message.success('Track updated successfully');
              onCloseModal();
            },
          },
        );
        break;
      default:
        throw new Error('There is no such pagename property');
    }
  };

  return (
    <Modal
      title="Update: Jahongir Umirzoqov"
      width="middle"
      open={isOpenModal}
      loading={isLoadingData}
      onCancel={onCloseModal}
    >
      <div className="mt-20">
        {/* {JSON.stringify(retrieveData)} */}
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
          <Button
            disabled={isLoadingUpdate}
            loading={isLoadingUpdate}
            onClick={handleSaveUpdate}
            type="primary"
            className=""
            style={{ backgroundColor: '#21529C', width: 225 }}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateDataModal;
