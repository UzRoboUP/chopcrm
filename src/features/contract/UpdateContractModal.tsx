/* eslint-disable react/prop-types */
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, message, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../ui/Modal';
import { useCompanies } from '../companies/useCompanies';
import { useModels } from '../model/useModel';
import { useContractUpdate } from './useContractUpdate';

function UpdateContractModal({
  retrieveData,
  isLoadingData,
  isOpenModal,
  onCloseModal,
}: {
  isLoadingData: boolean;
  isOpenModal: boolean;
  onCloseModal: () => void;
}) {
  const queryClient = useQueryClient();

  const [contractData, setContractData] = useState({
    id: retrieveData?.id,
    companyId: retrieveData?.company?.id,
    driverId: retrieveData?.driver?.id,
    fullName: retrieveData?.driver?.driver,
    phoneNumber: retrieveData?.phone_number,
    carModel: retrieveData?.car_data?.car_model,
  });

  const { updateContract, isLoadingUpdate } = useContractUpdate();
  const { data } = useCompanies();
  const { model } = useModels(isOpenModal);

  useEffect(() => {
    setContractData({
      id: retrieveData?.id,
      driverId: retrieveData?.driver?.id,
      companyId: retrieveData?.company?.id,
      fullName: retrieveData?.driver?.full_name,
      phoneNumber: retrieveData?.driver?.phone_number,
      carModel: retrieveData?.driver?.car_data?.car_model,
    });
  }, [retrieveData]);

  const handleSaveUpdate = () => {
    const model = {
      id: retrieveData.id,
      company: contractData.companyId,
      driver: {
        // id: contractData.driverId,
        full_name: contractData.fullName,
        phone_number: contractData.phoneNumber,
        car_data: {
          car_model: contractData.carModel,
        },
      },
    };

    updateContract(
      { ...model },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['contractUpdate'], data);
          queryClient.invalidateQueries({ queryKey: ['employees'] });
          message.success('Contract updated successfully');
          onCloseModal();
        },
      },
    );
  };

  return (
    <Modal
      title={''}
      width="large"
      open={isOpenModal}
      loading={isLoadingData}
      onCancel={onCloseModal}
      closeIcon={true}
    >
      <div className="mt-20">
        <div className="d-flex gap-20 mb-5 w-100">
          <div className="w-100">
            <Typography.Title level={5}>ФИО</Typography.Title>
            <Input
              style={{ float: 'inline-end', height: 40 }}
              value={contractData.fullName}
              onChange={({ target: { value: fullName } }) =>
                setContractData((prev) => ({ ...prev, fullName }))
              }
            />
          </div>
          <div className="w-100 mb-5">
            <Typography.Title level={5}>Номер телефона </Typography.Title>
            <Input
              style={{ float: 'inline-end', height: 40 }}
              value={contractData.phoneNumber}
              onChange={({ target: { value: phoneNumber } }) =>
                setContractData((prev) => ({ ...prev, phoneNumber }))
              }
            />
          </div>
        </div>

        <div className="d-flex gap-20 mb-5">
          <div className="w-100">
            <Typography.Title level={5}>Тип машины</Typography.Title>

            <Select
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              showSearch
              defaultValue={contractData?.carModel}
              value={contractData?.carModel}
              placeholder="Тип машины"
              optionFilterProp="label"
              onChange={(e) => {
                setContractData((prev) => ({ ...prev, carModel: e }));
              }}
              options={
                model?.length == 0
                  ? []
                  : model?.map((item: { model: string; id: string }) => {
                      return {
                        value: item?.model,
                        label: item?.model,
                      };
                    })
              }
            />
          </div>
          <div className="w-100">
            <Typography.Title level={5}>Компания</Typography.Title>
            <Select
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              showSearch
              defaultValue={contractData.companyId}
              value={contractData.companyId}
              placeholder="Компания"
              optionFilterProp="label"
              onChange={(e) => {
                setContractData((prev) => ({ ...prev, companyId: e }));
              }}
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
          </div>
        </div>
        <div className="d-flex gap-20">
          <div className="w-100 d-flex justify-center align-end mt-20">
            <Button
              disabled={isLoadingUpdate}
              onClick={() => onCloseModal()}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #21529C',
                width: '25%',
                height: 40,
                color: 'black',
              }}
            >
              Отменить
            </Button>
            <Button
              // disabled={isPending}
              onClick={handleSaveUpdate}
              disabled={isLoadingUpdate}
              loading={isLoadingUpdate}
              type="primary"
              className="ml-10"
              htmlType="submit"
              style={{ backgroundColor: '#21529C', width: '25%', height: 40 }}
            >
              Сохранить
              {/* {isPending ? 'Загрузка...' : 'Сохранить'} */}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateContractModal;
