import { Rate, useRateContext } from '../../context/RadeContext';
import { CompanyRate } from '../../ui/CompanyRate';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Typography,
  Upload,
} from 'antd';
import { useCreateCompany } from './useCreateCompany';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useCreateCompanyLogo } from './useCreateCompanyLogo';
import Modal from '../../ui/Modal';
import { useClients } from '../client/useClients';
import { companyType } from './Companies';
export type StaffType = {
  owner: string;
  image: string;
  address: string;
  phone_number: string;
  company_status: string;
  tarif_list: Rate[];
  contract_finish_time: string;
  name: string;
  total_cars_number: number;
};
function CreateСompanyModal({
  isOpenModal,
  onCloseModal,
  companyData,
}: {
  isOpenModal: boolean;
  onCloseModal: (a: boolean) => void;
  companyData: companyType;
}) {
  const [frontImg, setFrontImg] = useState<string | ''>('');
  const { createCompany, isLoading } = useCreateCompany();
  const { createLogo, isLoadingLogo } = useCreateCompanyLogo();
  const { filteredRate, rates } = useRateContext();
  const { clientsList } = useClients(isOpenModal);

  console.log(companyData);

  useEffect(() => {
    if (isOpenModal) {
      filteredRate([]);
    }
  }, [isOpenModal]);

  const handleSaveCreate = (e: StaffType) => {
    const formattedDate = dayjs(e.contract_finish_time).format('YYYY-M-D');
    e.contract_finish_time = formattedDate;
    e.company_status = 'in_process';
    e.tarif_list = rates.map((item) => {
      delete item.id;
      return item;
    });
    e.total_cars_number = rates.reduce(
      (a, b) => a + b.number_of_car,
      0,
    ) as unknown as number;
    e.image = frontImg;
    createCompany(e, {
      onSuccess: () => {
        onCloseModal(false);
        setFrontImg('');
      },
    });
  };

  const uploadImg = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    createLogo(formData, {
      onSuccess: (data) => {
        setFrontImg(data?.image_url);
      },
    });
  };

  return (
    <Modal
      title={''}
      width="large"
      open={isOpenModal}
      onCancel={() => onCloseModal(false)}
    >
      <Form onFinish={handleSaveCreate}>
        <div className="mt-20" style={{ padding: '0px 20px' }}>
          <div className="d-flex gap-20 mb-20">
            <div className="w-100">
              <Typography.Title className="mb-10" level={5}>
                Название компании
              </Typography.Title>
              <Form.Item
                name="name"
                rules={[{ required: true, message: '' }]}
                className="m-0"
                initialValue={companyData?.name}
              >
                <Input
                  disabled={companyData ? true : false}
                  placeholder="name"
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
            <div className="w-100">
              <Typography.Title level={5}>Выберите тариф</Typography.Title>
              <Form.Item name="first_name" className="m-0">
                {!companyData ? (
                  <CompanyRate />
                ) : (
                  <>
                    <Select
                      disabled={companyData ? true : false}
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      defaultValue={companyData?.tarif_list.map((item) => {
                        return {
                          label: item.tarif_name,
                          value: item.tarif_name,
                        };
                      })}
                      // onChange={handleChange}
                      options={[]}
                    />
                  </>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="d-flex gap-20 mb-20">
            <div className="w-100">
              <Typography.Title level={5}>Выберите дату</Typography.Title>
              <Form.Item
                name="contract_finish_time"
                rules={[{ required: true, message: '' }]}
                className="m-0"
              >
                <DatePicker
                  defaultValue={
                    companyData && dayjs(companyData?.contract_finish_time)
                  }
                  disabled={companyData ? true : false}
                  placeholder="ДД.ММ.ГГ"
                  // onChange={onChange}
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
            <div className="w-100">
              <Typography.Title level={5}>Телефон номер</Typography.Title>
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                  {
                    pattern: new RegExp(/^\+?998\d{9}$/),
                    message: '',
                  },
                ]}
                className="m-0"
                initialValue={companyData?.phone_number}
              >
                <Input
                  disabled={companyData ? true : false}
                  placeholder="Напишите номер телефона  "
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex gap-20 mb-20">
            <div className="w-100">
              <Typography.Title level={5}>
                Предпочтительное место проведение
              </Typography.Title>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                className="m-0"
                initialValue={companyData?.address}
              >
                <Input
                  disabled={companyData ? true : false}
                  placeholder="Напишите адрес"
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
            <div className="w-100">
              <Typography.Title level={5}>Количество машин</Typography.Title>
              <Form.Item
                name={companyData && 'total_cars_number'}
                className="m-0"
                initialValue={
                  companyData
                    ? companyData?.total_cars_number
                    : rates.reduce((a, b) => a + b.number_of_car, 0)
                }
              >
                <Input
                  value={rates.reduce((a, b) => a + b.number_of_car, 0)}
                  disabled={true}
                  style={{ width: '100%', float: 'inline-end', height: 40 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex gap-20 ">
            <div className="w-100">
              <Typography.Title className="mb-10" level={5}>
                Загрузите логотип компании
              </Typography.Title>
              <Upload
                onRemove={() => setFrontImg('')}
                showUploadList={frontImg ? true : false}
                maxCount={1}
                beforeUpload={(file) => uploadImg(file)}
              >
                <Button
                  disabled={companyData ? true : false}
                  style={{
                    width: '100%',
                    float: 'inline-end',
                    height: 40,
                    display: 'flex',
                  }}
                  icon={
                    isLoadingLogo ? <Spin size="small" /> : <UploadOutlined />
                  }
                >
                  логотип компании
                </Button>
              </Upload>
              
            </div>
            {!companyData && (
              <div className="w-100">
                <Typography.Title level={5}>
                  ФИО директора компании
                </Typography.Title>
                <Form.Item name="owner" className="m-0">
                  <Select
                    showSearch
                    placeholder="ФИО директора компании"
                    style={{ width: '100%', float: 'inline-end', height: 40 }}
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={
                      !clientsList
                        ? []
                        : clientsList.map(
                            (item: { full_name: string; id: string }) => {
                              return {
                                value: item?.id,
                                label: item?.full_name,
                              };
                            },
                          )
                    }
                  />
                </Form.Item>
              </div>
            )}
          </div>

          {!companyData && (
            <div className="w-100">
              <Typography.Title level={5}>&nbsp;</Typography.Title>
              <div className="w-50 d-flex justify-end align-end ">
                <Button
                  disabled={isLoadingLogo}
                  onClick={() => onCloseModal(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #FF2800',
                    height: 40,
                    color: '#FF2800',
                    padding: '0 40px',
                  }}
                >
                  Отменить
                </Button>
                <Button
                  disabled={isLoadingLogo}
                  type="primary"
                  className="ml-10"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#FF2800',
                    height: 40,
                    padding: '0 40px',
                  }}
                >
                  {isLoading ? 'Загрузка...' : 'Сохранить'}
                </Button>
              </div>
            </div>
          )}

          <div className="d-flex justify-end">
            <h1 style={{ fontSize: '29px', marginBottom: '12px' }}>
              Итог:{' '}
              {companyData ? (
                <span>
                  {companyData?.tarif_list?.reduce((a, b) => a + b.price, 0)}{' '}
                </span>
              ) : (
                <span>{rates.reduce((a, b) => a + b.price, 0)} </span>
              )}{' '}
              cум
            </h1>
          </div>
          {companyData && (
            <div className="d-flex justify-center gap-20 mb-20">
              <Button onClick={() => onCloseModal(false)}>OK</Button>
            </div>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default CreateСompanyModal;
