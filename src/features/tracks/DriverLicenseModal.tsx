import {
  Button,
  DatePicker,
  DatePickerProps,
  message,
  Typography,
  Upload,
} from 'antd';
import Modal from '../../ui/Modal';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useCreateDriverLicense } from './useCreateDriverLicense';
type CreateDriverLicenseProps = {
  start_date: string | string[];
  end_date: string | string[];
  license: Blob | null;
  driver: string;
};
function DriverLicenseModal({
  isOpenModal,
  onCloseModal,
  id,
}: {
  isOpenModal: boolean;
  onCloseModal: () => void;
  id: string;
}) {
  const [license, setLicense] = useState<CreateDriverLicenseProps>({
    start_date: '',
    end_date: '',
    license: null,
    driver: '',
  });

  const { createLicense, isLoading } = useCreateDriverLicense();

  const onChangeStart: DatePickerProps['onChange'] = (_, dateString) => {
    setLicense({ ...license, start_date: dateString });
  };
  const onChangeEnd: DatePickerProps['onChange'] = (_, dateString) => {
    setLicense({ ...license, end_date: dateString });
  };
  const ongetFile = (e) => {
    setLicense({ ...license, license: e?.file?.originFileObj });
  };

  const handleSave = () => {
    console.log(license);
    console.log(id);
    const formData = new FormData();
    formData.append('start_date', license.start_date as unknown as string);
    formData.append('end_date', license.end_date as unknown as string);
    formData.append('license', license.license as unknown as Blob);
    formData.append('driver', id);
    createLicense(formData, {
      onSuccess: () => {
        message.success('Успех');
        onCloseModal();
      },
    });
  };

  return (
    <Modal
      title="Выберите срок разрешения"
      width="small"
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon={true}
    >
      <div
        className="mt-20"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          className="d-flex flex-column justify-center mb-5"
          style={{ width: '75%' }}
        >
          <Typography.Title level={5}> </Typography.Title>
          <DatePicker
            placeholder="Время начала"
            format="YYYY-MM-DD"
            onChange={onChangeStart}
          />
        </div>
        <div
          className="d-flex flex-column justify-center mb-5"
          style={{ width: '75%' }}
        >
          <Typography.Title level={5}> </Typography.Title>
          <DatePicker
            placeholder="Время окончания"
            format="YYYY-MM-DD"
            onChange={onChangeEnd}
          />
        </div>
        <div
          className="d-flex flex-column justify-center mb-5"
          style={{ width: '75%' }}
        >
          <Typography.Title level={5}></Typography.Title>
          <Upload
            onChange={ongetFile}
            maxCount={1}
            style={{ display: 'block' }}
          >
            <Button
              className="d-flex justify-between"
              style={{ width: '263px', textAlign: 'left' }}
            >
              <span>Загрузить файл</span> <UploadOutlined />
            </Button>
          </Upload>
        </div>
        <div className="mt-20 d-flex justify-center">
          <Button
            disabled={isLoading}
            loading={isLoading}
            onClick={handleSave}
            type="primary"
            style={{ backgroundColor: '#21529C', width: 100 }}
          >
            ОК
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DriverLicenseModal;
