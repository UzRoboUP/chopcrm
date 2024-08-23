/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, message, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../ui/Modal';
import { useStaffUpdate } from './useStaffUpdate';

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

  const [staffData, setStaffData] = useState({
    id: retrieveData?.id,
    username: retrieveData?.username || '',
    password: retrieveData?.password || '',
    first_name: retrieveData?.first_name,
    last_name: retrieveData?.last_name,
    surname: retrieveData?.surname || '',
    image: retrieveData?.image || '',
    phone_number: retrieveData?.phone_number,
    staff_status: retrieveData?.staff_status,
    last_activity: new Date(),
  });

  useEffect(() => {
    if (retrieveData && !isLoadingData) {
      setStaffData((prev) => ({
        ...prev,
        ...retrieveData,
        image: retrieveData?.image || '',
      }));
    }
  }, [retrieveData, isLoadingData]);

  const { updateStaff, isLoadingUpdate } = useStaffUpdate();

  const handleSaveUpdate = () => {
    const model = { ...staffData, id: retrieveData?.id };
    console.log(model);
    updateStaff(
      { ...model },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['staffUpdate'], data);
          queryClient.invalidateQueries({ queryKey: ['staff'] });
          message.success('Staff updated successfully');
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
              value={staffData.last_name}
              onChange={({ target: { value: last_name } }) =>
                setStaffData((prev) => ({ ...prev, last_name }))
              }
            />
          </div>
          <div className="w-100">
            <Typography.Title level={5}>Имя</Typography.Title>
            <Input
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              value={staffData.first_name}
              onChange={({ target: { value: first_name } }) =>
                setStaffData((prev) => ({ ...prev, first_name }))
              }
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
              value={staffData.username}
              onChange={({ target: { value: username } }) =>
                setStaffData((prev) => ({ ...prev, username }))
              }
            />
          </div>
          <div className="w-100">
            <Typography.Title level={5}>Пароль</Typography.Title>
            <Input
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              value={staffData.password}
              onChange={({ target: { value: password } }) =>
                setStaffData((prev) => ({ ...prev, password }))
              }
            />
          </div>
        </div>
        <div className="d-flex gap-20 mb-20">
          <div className="w-100">
            <Typography.Title level={5}>Номер телефона</Typography.Title>
            <Input
              style={{ width: '100%', float: 'inline-end', height: 40 }}
              value={staffData.phone_number}
              onChange={({ target: { value: phone_number } }) =>
                setStaffData((prev) => ({ ...prev, phone_number }))
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
