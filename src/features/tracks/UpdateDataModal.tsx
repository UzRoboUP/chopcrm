/* eslint-disable react/prop-types */
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, message, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../ui/Modal';
import { useTrackUpdate } from './useTrackUpdate';

function UpdateDataModal({
  retrieveData,
  isLoadingData,
  isOpenModal,
  onCloseModal,
}) {
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState('');

  const [trackData, setTrackData] = useState({
    id: retrieveData?.id,
    status_contract: retrieveData?.status_contract,
    companyName: retrieveData?.company.name,
    fullName: retrieveData?.driver.full_name,
    phoneNumber: retrieveData?.driver.phone_number,
    carModel: retrieveData?.driver.car_data.car_model,
  });

  const { updateTrack, isLoadingUpdate } = useTrackUpdate();

  useEffect(() => {
    setTrackData({
      id: retrieveData?.id,
      status_contract: retrieveData?.status_contract,
      companyName: retrieveData?.company.name,
      fullName: retrieveData?.driver.full_name,
      phoneNumber: retrieveData?.driver.phone_number,
      carModel: retrieveData?.driver.car_data.car_model,
    });
    setFullName(retrieveData?.driver.full_name);
  }, [retrieveData]);

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
      title={`Update: ${fullName}`}
      width="middle"
      open={isOpenModal}
      loading={isLoadingData}
      onCancel={onCloseModal}
    >
      <div className="mt-20">
        <div className="d-flex justify-between mb-5">
          <Typography.Title level={5}>ФИО *</Typography.Title>
          <Input
            style={{ width: 225, float: 'inline-end', height: 30 }}
            value={trackData.fullName}
            onChange={({ target: { value: fullName } }) =>
              setTrackData((prev) => ({ ...prev, fullName }))
            }
          />
        </div>
        {/* <div className="d-flex justify-between mb-5">
          <Typography.Title level={5}>Имя *</Typography.Title>
          <Input
            style={{ width: 225, float: 'inline-end', height: 30 }}
            defaultValue=""
          />
        </div> */}
        <div className="d-flex justify-between mb-5">
          <Typography.Title level={5}>Номер телефона</Typography.Title>
          <Input
            style={{ width: 225, float: 'inline-end', height: 30 }}
            value={trackData.phoneNumber}
            onChange={({ target: { value: phoneNumber } }) =>
              setTrackData((prev) => ({ ...prev, phoneNumber }))
            }
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <Typography.Title level={5}>Тип машины</Typography.Title>
          <Input
            style={{ width: 225, float: 'inline-end', height: 30 }}
            value={trackData.carModel}
            onChange={({ target: { value: carModel } }) =>
              setTrackData((prev) => ({ ...prev, carModel }))
            }
          />
        </div>
        <div className="d-flex justify-between">
          <Typography.Title level={5}>Компания</Typography.Title>
          <Input
            style={{ width: 225, float: 'inline-end', height: 30 }}
            value={trackData.companyName}
            onChange={({ target: { value: companyName } }) =>
              setTrackData((prev) => ({ ...prev, companyName }))
            }
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
