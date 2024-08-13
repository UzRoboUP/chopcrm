/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, message, Typography } from 'antd';
import { useState } from 'react';
import Modal from '../../ui/Modal';
import { useTrackUpdate } from '../tracks/useTrackUpdate';

function UpdateStaffDataModal({
  pagename,
  retrieveData,
  isLoadingData,
  isOpenModal,
  onCloseModal,
}) {
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState('');
  console.log(pagename, retrieveData);

  const [trackData, setTrackData] = useState({
    id: retrieveData?.id,
    status_contract: retrieveData?.status_contract,
    companyName: retrieveData?.company?.name,
    fullName: retrieveData?.driver?.full_name,
    phoneNumber: retrieveData?.driver?.phone_number,
    carModel: retrieveData?.driver?.car_data?.car_model,
  });

  const { updateTrack, isLoadingUpdate } = useTrackUpdate();

  // useEffect(() => {
  //   setTrackData({
  //     id: retrieveData?.id,
  //     status_contract: retrieveData?.status_contract,
  //     companyName: retrieveData?.company.name,
  //     fullName: retrieveData?.driver.full_name,
  //     phoneNumber: retrieveData?.driver.phone_number,
  //     carModel: retrieveData?.driver.car_data.car_model,
  //   });
  //   setFullName(retrieveData?.driver.full_name);
  // }, [retrieveData]);

  const handleSaveUpdate = () => {
    const model = {
      id: retrieveData.id,
      company: {
        name: trackData.companyName,
        id: retrieveData.company?.id,
      },
      driver: {
        full_name: trackData.fullName,
        phone_number: trackData.phoneNumber,
        id: retrieveData.driver?.id,
        car_data: {
          car_model: trackData.carModel,
        },
      },
      status_contract: trackData.status_contract,
    };
    updateTrack(
      { ...model },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['trackUpdate'], data);
          queryClient.invalidateQueries({ queryKey: ['tracks'] });
          message.success('Track updated successfully');
          onCloseModal();
        },
      },
    );
  };

  return (
    <Modal
      title={``}
      width="large"
      open={isOpenModal}
      loading={isLoadingData}
      onCancel={onCloseModal}
    >
      <div className="mt-20" style={{ padding: '0px 20px' }}>
        <div className="d-flex gap-20 mb-20">
          <div className="w-100">
            <Typography.Title className="mb-10" level={5}>
              Фамилия
            </Typography.Title>
            <Input
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              value={trackData.fullName}
              onChange={({ target: { value: fullName } }) =>
                setTrackData((prev) => ({ ...prev, fullName }))
              }
            />
          </div>
          <div className="w-100">
            <Typography.Title level={5}>Имя</Typography.Title>
            <Input
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              defaultValue=""
            />
          </div>
        </div>
        <div className="d-flex gap-20 mb-20">
          <div className="w-100">
            <Typography.Title className="mb-10" level={5}>
              Логин
            </Typography.Title>
            <Input
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              value={trackData.fullName}
              onChange={({ target: { value: fullName } }) =>
                setTrackData((prev) => ({ ...prev, fullName }))
              }
            />
          </div>
          <div className="w-100">
            <Typography.Title level={5}>Пароль</Typography.Title>
            <Input
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              defaultValue=""
            />
          </div>
        </div>
        <div className="d-flex gap-20 mb-20">
          <div className="w-100">
            <Typography.Title level={5}>Номер телефона</Typography.Title>
            <Input
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              value={trackData.phoneNumber}
              onChange={({ target: { value: phoneNumber } }) =>
                setTrackData((prev) => ({ ...prev, phoneNumber }))
              }
            />
          </div>
          <div className="w-100 d-flex justify-between align-end">
            <Button
              disabled={isLoadingUpdate}
              onClick={onCloseModal}
              ghost
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #21529C',
                width: '50%',
                height: 40,
                color: 'black',
              }}
            >
              Отменить
            </Button>
            <Button
              disabled={isLoadingUpdate}
              loading={isLoadingUpdate}
              onClick={handleSaveUpdate}
              type="primary"
              className="ml-10"
              style={{ backgroundColor: '#21529C', width: '50%', height: 40 }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateStaffDataModal;
