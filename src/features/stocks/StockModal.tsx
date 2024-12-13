import { StatusKey } from '../../utils/activities';
import { cn } from '../../lib';
import Modal from '../../ui/Modal';
import { AppIcon } from '../../ui/AppIcon';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  InputRef,
  Row,
  Select,
  Space,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { valueType } from 'antd/es/statistic/utils';
import dayjs from 'dayjs';
import React from 'react';
import { useCompanies } from '../companies/useCompanies';
import { MapContent } from './MapContent';
import { StockCarClassSelect, TarifList } from './StockCarClassSelect';
// import { useCompanyTarif } from './useCompanyTarif';
import { useCreateStockTask } from './useCreateStockTask';

type StockType = 'parking' | 'direction' | 'wish';

interface Props {
  className?: string;
  isOpenModal: boolean;
  onCloseModal: () => void;
}

interface Tarif {
  tarif: string;
  number_of_car: number;
}

interface LineValues {
  lineStart: string;
  lineEnd: string;
}

export interface CreateStockData extends LineValues {
  line_end: string;
  line_start: string;
  company: string;
  name: string;
  comment: string;
  stock_task_status: Exclude<StatusKey, 'approved'>;
  stock_type: StockType | string;
  car_service: string;
  beginning_time: string; // ISO 8601 format
  duration: number;
  parking_address: string;
  tarif_list: Tarif[];
  line: {
    type: 'Feature';
    geometry: {
      type: 'LineString';
      coordinates: number[][];
    };
    properties: {
      name: string;
    };
  };
}

const initialStockTypeValues = [
  {
    value: 'direction',
    label: 'Проезд',
  },
  {
    value: 'parking',
    label: 'Парковка',
  },
];

export const StockModal: React.FC<Props> = ({
  className,
  isOpenModal,
  onCloseModal,
}) => {
  const [form] = Form.useForm<CreateStockData>();
  const [stockType, setStockType] = React.useState<StockType | string>('');
  const [stockNewType, setStockNewType] = React.useState<string>('');

  const [stockTypeOptions, setStockTypeOptions] = React.useState(
    initialStockTypeValues,
  );

  const [isOpenMapModal, setOpenMapModal] = React.useState<boolean>(false);

  const [totalCarsNumber, setTotalCarsNumber] = React.useState<valueType>(0);
  const [carClassModel, setCarClassModel] = React.useState([]);
  // const [durationFrom, setDurationFrom] = React.useState<valueType>(0);
  // const [durationTo, setDurationTo] = React.useState<valueType>(0);
  const [durationMinute, setDurationMinute] = React.useState(0);
  // const [stockDuration, setStockDuration] = React.useState(0);
  const [selectedCompanyTarifList, setSelectedCompanyTarifList] =
    React.useState<TarifList[] | []>([]);

  const [startLocationName, setStartLocationName] = React.useState<string>('');
  const [endLocationName, setEndLocationName] = React.useState<string>('');

  const inputRef = React.useRef<InputRef>(null);

  const { createStockTask, isLoading, isSuccess } = useCreateStockTask();
  const {
    companies,
    isLoading: isLoadingCompanies,
    isFetchingCompany,
  } = useCompanies();

  const [startPoint, setStartPoint] =
    React.useState<google.maps.LatLngLiteral | null>(null);
  const [endPoint, setEndPoint] =
    React.useState<google.maps.LatLngLiteral | null>(null);

  const handleConfirmLines = () => {
    form.setFieldsValue({
      lineStart: startPoint ? `${startPoint.lat}, ${startPoint.lng}` : '',
      lineEnd: endPoint ? `${endPoint.lat}, ${endPoint.lng}` : '',
    });

    setOpenMapModal(false);
  };

 

  React.useEffect(() => {
    if (Object.keys(carClassModel)?.length) {
      setTotalCarsNumber(
        carClassModel?.tarif_list.reduce(
          (acc, item) => acc + item?.number_of_car,
          0,
        ),
      );
    }
  }, [carClassModel]);

  const handleSave = (data: CreateStockData) => {
    const lineStart = data.lineStart;
    const lineEnd = data.lineEnd;

    const startCoords = lineStart
      .split(',')
      .map((coord) => parseFloat(coord.trim()));
    const endCoords = lineEnd
      .split(',')
      .map((coord) => parseFloat(coord.trim()));

    const coordinates = [startCoords, endCoords];

    const model: CreateStockData = {
      ...data,
      line_end: endLocationName,
      line_start: startLocationName,
      stock_task_status: 'in_process',
      // duration: String(stockDuration),
      duration: durationMinute,
      stock_type: stockType,
      tarif_list: carClassModel?.tarif_list ?? [],
      beginning_time: dayjs(data.beginning_time).format('YYYY-MM-DD HH:mm:ss'),
      line: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coordinates,
        },
        properties: {
          name: 'string',
        },
      },
    };
    createStockTask(model);
    console.log(model);
  };

  React.useEffect(() => {
    if (!isLoading && isSuccess) {
      form.resetFields();
      onCloseModal();
    }
  }, [isLoading, isSuccess]);

  React.useEffect(() => {
    if (isOpenModal) {
      form.resetFields();
      // setDurationFrom(0);
      // setDurationTo(0);
      setDurationMinute(0);
      // setStockDuration(0);
      setTotalCarsNumber(0);
      setStockType('');
      setStockNewType('');
      setStockTypeOptions(initialStockTypeValues);
      setCarClassModel([]);
      setSelectedCompanyTarifList([]);
      setOpenMapModal(false);
    }
  }, [isOpenModal]);

  return (
    <>
      <Modal
        title=""
        width="large"
        open={isOpenModal}
        className={cn(className)}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Row gutter={35} justify="space-between">
            <Col span={12}>
              <Form.Item
                label="Название задание"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input
                  size="large"
                  className="w-100"
                  placeholder="Название задание"
                />
              </Form.Item>
              <Form.Item
                label="Выберите дату"
                name="beginning_time"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <DatePicker
                  size="large"
                  showTime
                  placeholder="YY-MM-DD hh:mm"
                  suffixIcon={<AppIcon icon="date" />}
                />
              </Form.Item>
              {/* DURATION */}
              <p style={{ marginBottom: 8 }}>
                Время начала и протяженность акции
              </p>
              <Flex align="middle" style={{ marginBottom: 24 }}>
                <InputNumber
                  min={0}
                  step={15}
                  size="large"
                  style={{ width: 110 }}
                  placeholder="15 минут"
                  value={durationMinute}
                  className="ml-15"
                  onChange={(value) => {
                    if (value !== null) {
                      setDurationMinute(value);
                    }
                  }}
                />
              </Flex>
              <Button
                size="large"
                style={{ marginBottom: 24 }}
                onClick={() => setOpenMapModal(true)}
              >
                Выбрать маршрут акции
              </Button>
              <Form.Item
                label="Start [lat, lng]"
                name="lineStart"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input size="large" placeholder="41.311081, 69.240562" />
              </Form.Item>
              <Form.Item
                label="End [lat, lng]"
                name="lineEnd"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input size="large" placeholder="41.311081, 69.240562" />
              </Form.Item>
              <Form.Item
                label="Адрес парковки"
                name="parking_address"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input size="large" placeholder="Напишите адресс" />
              </Form.Item>
              <Form.Item
                label="Коментарий к акции"
                name="comment"
                rules={[
                  {
                    required: false,
                  },
                ]}
                className="mb-0"
              >
                <TextArea size="large" placeholder="Коментарий" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="d-flex flex-column justify-between h-100">
                <div>
                  <Form.Item
                    label="Вид акции"
                    name="stock_type"
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Выберите акции"
                      onChange={(value) => setStockType(value)}
                      options={stockTypeOptions}
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: '8px 0' }} />
                          <Space style={{ padding: '0 8px 4px' }}>
                            <Input
                              ref={inputRef}
                              placeholder="*Пожелание..."
                              value={stockNewType}
                              onKeyDown={(e) => e.stopPropagation()}
                              onChange={(e) => setStockNewType(e.target.value)}
                            />
                            <Button
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={(e) => {
                                e.preventDefault();
                                setStockTypeOptions([
                                  ...stockTypeOptions,
                                  {
                                    value: stockNewType,
                                    label: stockNewType,
                                  },
                                ]);
                                setStockNewType('');
                                setTimeout(() => {
                                  inputRef.current?.focus();
                                }, 0);
                              }}
                            >
                              Добавить
                            </Button>
                          </Space>
                        </>
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Выберите компанию"
                    name="company"
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Выберите компанию"
                      onChange={(_, record) => {
                        console.log(record);
                        setSelectedCompanyTarifList(
                          record?.data?.tarif_list.map((item) => {
                            item.tarif = item?.tarif_name;
                            return item;
                          }) as unknown as TarifList[],
                        );
                      }}
                      loading={isLoadingCompanies}
                      options={companies.map(
                        (item: { id: string; name: string }) => ({
                          value: item.id,
                          label: item.name,
                          data: item,
                        }),
                      )}
                    />
                  </Form.Item>
                  <StockCarClassSelect
                    companyTarifData={selectedCompanyTarifList}
                    isLoadingTarif={isLoadingCompanies}
                    isFetchingTarif={isFetchingCompany}
                    setCarClassModel={setCarClassModel}
                  />
                  <div>
                    {' '}
                    <p style={{ marginBottom: 8 }}>Количество машин</p>
                    <Input
                      disabled
                      size="large"
                      className="w-50"
                      value={totalCarsNumber}
                    />
                  </div>
                </div>
                <div className="align-self-end">
                  <div className="total__price">
                    Итог:{' '}
                    {((durationMinute / 15) * 250000)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                    cум{' '}
                  </div>
                  <Button
                    size="large"
                    disabled={isLoading}
                    onClick={onCloseModal}
                  >
                    Отменить
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="ml-10"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Подтвердить
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Выберите точки передвижение"
        width="middle"
        open={isOpenMapModal}
      >
        <div>
          <div className="d-flex justify-between gap-10 mb-20">
            <div className="w-100">
              <p style={{ marginBottom: 8 }}>Точка начала</p>
              <Input
                style={{ height: '40px' }}
                size="small"
                className="w-100"
                value={startLocationName}
              />
            </div>
            <div className="w-100">
              <p style={{ marginBottom: 8 }}>Конечная точка</p>
              <Input
                style={{ height: '40px' }}
                size="small"
                className="w-100"
                value={endLocationName}
              />
            </div>
          </div>
          <MapContent
            setEndPoint={setEndPoint}
            setStartPoint={setStartPoint}
            startPoint={startPoint}
            endPoint={endPoint}
            setStartLocationName={setStartLocationName}
            setEndLocationName={setEndLocationName}
          />
          <div className="d-flex justify-center mt-20">
            <Button
              size="large"
              disabled={isLoading}
              onClick={() => {
                setOpenMapModal(false);
              }}
            >
              Отменить
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="ml-10"
              loading={isLoading}
              disabled={isLoading}
              onClick={handleConfirmLines}
            >
              Подтвердить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
