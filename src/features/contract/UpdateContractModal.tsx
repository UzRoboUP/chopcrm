/* eslint-disable react/prop-types */
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, message, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../ui/Modal';
import { useTrackUpdate } from '../tracks/useTrackUpdate';
import { useCompanies } from '../companies/useCompanies';

function UpdateContractModal({
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
    companyId: retrieveData?.company?.id,
    fullName: retrieveData?.full_name,
    phoneNumber: retrieveData?.phone_number,
    carModel: retrieveData?.car_data.car_model,
  });

  const { updateTrack, isLoadingUpdate } = useTrackUpdate();
  const { data } = useCompanies();
  console.log(data);

  useEffect(() => {
    setTrackData({
      id: retrieveData?.id,
      status_contract: retrieveData?.status_contract,
      companyId: retrieveData?.id,
      fullName: retrieveData?.full_name,
      phoneNumber: retrieveData?.phone_number,
      carModel: retrieveData?.car_data.car_model,
    });
    setFullName(retrieveData?.full_name);
  }, [retrieveData]);

  const handleSaveUpdate = () => {
    const model = retrieveData?.company
      ? {
          id: retrieveData.id,
          company: trackData.companyId,
          driver: {
            full_name: trackData.fullName,
            // phone_number: trackData.phoneNumber,
            // id: retrieveData?.id,
            car_data: {
              car_model: trackData.carModel,
              // id: retrieveData?.car_data?.id,
            },
          },
          // status_contract: trackData.status_contract,
        }
      : {
          id: retrieveData.id,
          full_name: trackData.fullName,
          phone_number: trackData.phoneNumber,
          car_data: {
            car_model: trackData.carModel,
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
      closeIcon={true}
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
          <Select
            style={{ width: 225, float: 'inline-end', height: 30 }}
            showSearch
            // defaultValue={trackData.companyId}
            placeholder="Select a person"
            optionFilterProp="label"
            onChange={(e)=>{
              setTrackData((prev) => ({ ...prev, companyId:e }))
            } }
            // onSearch={onSearch}
            options={
              data?.client_company_list?.results == 0
                ? []
                : data?.client_company_list?.results?.map(
                    (item: { name: string; id: string }) => {
                      return {
                        value: item?.id,
                        label: item?.name,
                      };
                    },
                  )
            }
          />
          {/* <Input
            style={{ width: 225, float: 'inline-end', height: 30 }}
            value={trackData.companyId}
            onChange={({ target: { value: companyId } }) =>
              setTrackData((prev) => ({ ...prev, companyId }))
            }
          /> */}
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

export default UpdateContractModal;
