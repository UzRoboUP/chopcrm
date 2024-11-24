import { DownOutlined } from '@ant-design/icons';
import {
  DatePicker,
  DatePickerProps,
  Dropdown,
  Input,
  message,
  Space,
  Spin,
} from 'antd';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import left from '../../public/img/page-header/left-chevron.svg';
import { useStockDriversContext } from '../context/StockDriverContext';
import { useBrand } from '../features/brand/useBrand';
import { useCompanies } from '../features/companies/useCompanies';
import { useModel } from '../features/model/useModel';
import { useCreateStockDrivers } from '../features/stocks/useCreateStockDrivers';
import { STOCK_STATUS__TYPE } from '../utils/constants';
import ExportButton from './ExportButton';
import FormBox from './FormBox';
import HeaderRadioGroup from './HeaderRadioGroup';
// import { useEffect } from 'react';
export default function ContentHeader({
  pagename,
  hasBrand = false,
  hasModel = false,
  hasCompany = false,
  hasPhone = false,
  hasSaveButton = false,
  hasDate = false,
  hasAddButton = false,
  taskText = '',
  hasHistory = false,
  hasStock = false,
  hasAddStockDriverButton = false,
  hasTasksBackLink = false,
  openModal,
}: {
  pagename: string;
  hasBrand?: boolean;
  hasModel?: boolean;
  hasCompany?: boolean;
  hasPhone?: boolean;
  hasSaveButton?: boolean;
  hasDate?: boolean;
  taskText?: string;
  hasAddButton?: boolean;
  hasHistory?: boolean;
  hasStock?: boolean;
  hasAddStockDriverButton?: boolean;
  hasTasksBackLink?: boolean;
  openModal?: () => void;
  openTaskModal?: () => void;
}) {
  const navigate = useNavigate();
  const param = useParams();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { brand } = useBrand(hasBrand);
  const { model } = useModel(params.get('car_brand'));
  const { data } = useCompanies();
  const { stockDrivers, clearStockDriver } = useStockDriversContext();
  const { createStockDriver, isLoadingContract } = useCreateStockDrivers();
  const onChange = (data: {
    id: string;
    name: string;
    searchParam: string;
  }) => {
    if (data.searchParam == 'car_brand') {
      params.delete('car_model');
      setTimeout(() => {
        queryClient.invalidateQueries('model');
      }, 300);
    }
    params.set(data.searchParam, data.name);
    setSearchParams(params);
  };

  const serachPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    params.set('phone_number', e.target.value);
    setSearchParams(params);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    params.set('created_at__gt', dateString as unknown as string);
    setSearchParams(params);
  };

  const createStockDriverHandler = () => {
    createStockDriver(stockDrivers, {
      onSuccess: () => {
        message.success(`${stockDrivers.length} водителям отправлено успешно`);
        clearStockDriver();
        queryClient.invalidateQueries('employees');
      },
    });
  };

  return (
    <div className="content__header__content d-flex align-center justify-between ">
      <div className="content__headera__category d-flex align-center">
        <img
          className="pointer"
          width="36px"
          height="36px"
          src={left}
          alt=""
          onClick={() => navigate(-1)}
        />
        <span className="content__header__title">{pagename}</span>
        <div className="content__header__filter">
          {hasDate && (
            <DatePicker
              form="YYYY-MM-DD"
              onChange={onChangeDate}
              placeholder="Выберите дату"
              className="header-datepicer"
              defaultValue={
                searchParams.get('created_at__gt')
                  ? dayjs(searchParams.get('created_at__gt'))
                  : null
              }
            />
          )}
          {hasStock && (
            <FormBox title="Вид акции">
              <Dropdown
                trigger={['click']}
                dropdownRender={() => (
                  <HeaderRadioGroup
                    defaultValue={searchParams.get('stock_type')}
                    menu={[
                      { id: '1', name: 'parking', label: 'Парковка' },
                      { id: '2', name: 'direction', label: 'Проезд' },
                      { id: '3', name: 'wish', label: 'Другие' },
                    ]}
                    name="name"
                    onChange={onChange}
                    searchParam="stock_type"
                  />
                )}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {searchParams.get('stock_type')
                      ? STOCK_STATUS__TYPE[searchParams.get('stock_type')].value
                      : 'Выберите'}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </FormBox>
          )}
          {hasBrand && (
            <FormBox title="Марка">
              <Dropdown
                trigger={['click']}
                dropdownRender={() => (
                  <HeaderRadioGroup
                    defaultValue={searchParams.get('car_brand')}
                    menu={brand}
                    name="brand"
                    onChange={onChange}
                    searchParam="car_brand"
                  />
                )}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {searchParams.get('car_brand')
                      ? searchParams.get('car_brand')
                      : 'Выберите'}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </FormBox>
          )}
          {hasModel && (
            <FormBox title="Модель">
              <Dropdown
                trigger={['click']}
                dropdownRender={() => (
                  <HeaderRadioGroup
                    defaultValue={searchParams.get('car_model')}
                    // menu={ model}
                    menu={searchParams.has('car_brand') ? model : []}
                    name="model"
                    onChange={onChange}
                    searchParam="car_model"
                  />
                )}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {searchParams.get('car_model') ? (
                      searchParams.get('car_model')
                    ) : (
                      <span
                        className={
                          !searchParams.has('car_brand') ? 'disabled-text' : ''
                        }
                      >
                        Выберите
                      </span>
                    )}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </FormBox>
          )}
          {hasCompany && (
            <FormBox title="Компания">
              <Dropdown
                trigger={['click']}
                dropdownRender={() => (
                  <HeaderRadioGroup
                    defaultValue={searchParams.get('company__name')}
                    name="name"
                    menu={data}
                    onChange={onChange}
                    searchParam="company__name"
                  />
                )}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {searchParams.get('company__name')
                      ? searchParams.get('company__name')
                      : 'Выберите'}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </FormBox>
          )}

          {hasPhone && (
            <FormBox title="Номер телефона">
              <Input
                type="number"
                value={`${searchParams.get('phone_number') ? searchParams.get('phone_number') : ''}`}
                onChange={serachPhone}
              />
            </FormBox>
          )}

          {hasTasksBackLink && (
            <>
              <Link
                to={`/stock?company_id=${param.id}`}
                className="stock__task__btn"
              >
                Все задания
              </Link>
              <div className="stock__task">{taskText}</div>
            </>
          )}
        </div>
        {hasAddStockDriverButton && (
          <button
            onClick={createStockDriverHandler}
            disabled={
              stockDrivers.length > 0 || isLoadingContract ? false : true
            }
            style={{
              backgroundColor: stockDrivers.length > 0 ? '#30B0C7' : '#7F8788',
            }}
            className="card__footer--btn"
          >
            {isLoadingContract ? (
              <>
                <Spin size="small" /> Отправить всем
              </>
            ) : (
              'Отправить всем'
            )}
          </button>
        )}
      </div>
      {hasSaveButton && <ExportButton />}
      {hasAddButton && (
        <button className="header__add__btn" onClick={openModal}>
          <img src={plus} alt="" />
          <span>Добавить</span>
        </button>
      )}
      {hasHistory && (
        <button className="header__add__btn history__btn" onClick={openModal}>
          <img src={history} alt="" />
          <span>Архив оклеек</span>
        </button>
      )}
    </div>
  );
}
