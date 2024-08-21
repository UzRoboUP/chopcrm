import { Button, Form, Input, Typography } from 'antd';
import Modal from '../../ui/Modal';
import { useCreateStaff } from './useCreateStaff';
export type StaffType = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: string;
};
function CreateStaffDataModal({
  isOpenModal,
  onCloseModal,
  isStatus,
}: {
  isOpenModal: boolean;
  onCloseModal: () => void;
  isStatus: string;
}) {
  const { createStaff } = useCreateStaff();

  const handleSaveCreate = (e: StaffType) => {
    e.status = isStatus;
    createStaff(e, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  };

  return (
    <Modal
      title={``}
      width="large"
      open={isOpenModal}
      onCancel={() => onCloseModal()}
    >
      <Form onFinish={handleSaveCreate}>
        <div className="mt-20" style={{ padding: '0px 20px' }}>
          <div className="d-flex gap-20 mb-20">
            <div className="w-100">
              <Typography.Title className="mb-10" level={5}>
                Фамилия
              </Typography.Title>
              <Form.Item name="last_name" rules={[{ required: true }]}>
                <Input
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
            <div className="w-100">
              <Typography.Title level={5}>Имя</Typography.Title>
              <Form.Item name="first_name" rules={[{ required: true }]}>
                <Input
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                  defaultValue=""
                />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex gap-20 mb-20">
            <div className="w-100">
              <Typography.Title className="mb-10" level={5}>
                Логин
              </Typography.Title>
              <Form.Item name="username" rules={[{ required: true }]}>
                <Input
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
            <div className="w-100">
              <Typography.Title level={5}>Пароль</Typography.Title>
              <Form.Item name="password" rules={[{ required: true }]}>
                <Input
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex gap-20 mb-20">
            <div className="w-100">
              <Typography.Title level={5}>Номер телефона</Typography.Title>
              <Form.Item name="phone_number" rules={[{ required: true }]}>
                <Input
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
            <div className="w-100 d-flex justify-between align-end">
              <Button
                onClick={() => onCloseModal()}
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
                // onClick={handleSaveCreate}
                type="primary"
                className="ml-10"
                htmlType="submit"
                style={{ backgroundColor: '#21529C', width: '50%', height: 40 }}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default CreateStaffDataModal;
