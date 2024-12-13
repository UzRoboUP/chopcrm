import {
  DatePicker,
  DatePickerProps,
  Dropdown,
  Input,
  message,
  Space,
  Spin,
} from 'antd';
import left from '../../public/img/page-header/left-chevron.svg';
import { DownOutlined } from '@ant-design/icons';
import FormBox from './FormBox';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import HeaderRadioGroup from './HeaderRadioGroup';
import { useBrand } from '../features/brand/useBrand';
import { useModel } from '../features/model/useModel';
import { useCompanies } from '../features/companies/useCompanies';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import plus from '../../public/img/plus.svg';
import history from '../../public/img/history.svg';
import ExportButton from './ExportButton';
import { STOCK_STATUS__TYPE } from '../utils/constants';
import { useStockDriversContext } from '../context/StockDriverContext';
import { useCreateStockDrivers } from '../features/stocks/useCreateStockDrivers';
import { useCompanyCarService } from '../features/car/useCompanyCarService';
import { useEffect } from 'react';
import { useCompanyDriverContext } from '../context/CompanyDriverContext';
import { useCreateContract } from '../features/contract/useCreateContract';
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
  carRate = false,
  hasAddStockDriverButton = false,
  hasAddCompanyDriverButton = false,
  hasTasksBackLink = false,
  hasArchived = false,
  isLoadingArchivedPastingUpdateAll = false,
  openModal,
  updatePastingArchiveAll,
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
  hasAddCompanyDriverButton?: boolean;
  hasTasksBackLink?: boolean;
  carRate?: boolean;
  hasArchived?: boolean;
  isLoadingArchivedPastingUpdateAll?: boolean;
  openModal?: () => void;
  updatePastingArchiveAll?: () => void;
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
  const { companyDrivers, clearCompanyDriver } = useCompanyDriverContext();
  const { createStockDriver, isLoadingContract } = useCreateStockDrivers();
  const { createContract, isLoadingContractDriver } = useCreateContract();
  const { car_data } = useCompanyCarService(carRate);
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
  const createCompanyDriverHandler = () => {
    createContract(companyDrivers, {
      onSuccess: () => {
        message.success(
          `${companyDrivers.length} водителям отправлено успешно`,
        );
        clearCompanyDriver();
        queryClient.invalidateQueries('drivers');
      },
    });
  };

  useEffect(() => {
    if (pagename == 'Обклейка') {
      params.set('is_archived', 'false');
      setSearchParams(params);
    }
  }, [pagename]);

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
          {hasArchived && (
            <>
              <FormBox title="Архив">
                <Dropdown
                  trigger={['click']}
                  dropdownRender={() => (
                    <HeaderRadioGroup
                      defaultValue={
                        searchParams.get('is_archived')
                          ? searchParams.get('is_archived')
                          : 'false'
                      }
                      menu={[
                        { id: '1', name: 'true', label: 'Архивировано' },
                        { id: '2', name: 'false', label: 'Нет архива' },
                      ]}
                      name="name"
                      onChange={onChange}
                      searchParam="is_archived"
                    />
                  )}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {searchParams.get('is_archived')
                        ? searchParams.get('is_archived') == 'true'
                          ? 'Архивировано'
                          : 'Нет архива'
                        : 'Выберите'}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </FormBox>
            </>
          )}
          {carRate && (
            <>
              <FormBox title="Тарифы машин">
                <Dropdown
                  trigger={['click']}
                  dropdownRender={() => (
                    <HeaderRadioGroup
                      defaultValue={searchParams.get('tarif')}
                      menu={car_data?.tarif_list}
                      name="tarif_name"
                      onChange={onChange}
                      searchParam="tarif"
                    />
                  )}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {searchParams.get('tarif')
                        ? searchParams.get('tarif')
                        : 'Выберите'}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </FormBox>
            </>
          )}

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
            className="card__footer--btn ml-10"
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
        {hasAddCompanyDriverButton && (
          <button
            onClick={createCompanyDriverHandler}
            disabled={
              companyDrivers.length > 0 || isLoadingContractDriver
                ? false
                : true
            }
            style={{
              backgroundColor:
                companyDrivers.length > 0 ? '#30B0C7' : '#7F8788',
            }}
            className="card__footer--btn ml-10"
          >
            {isLoadingContractDriver ? (
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
        <button
          disabled={isLoadingArchivedPastingUpdateAll}
          className="header__add__btn history__btn"
          onClick={updatePastingArchiveAll}
        >
          {isLoadingArchivedPastingUpdateAll ? (
            <Spin size="small" />
          ) : (
            <img src={history} alt="" />
          )}
          <span>Архив оклеек</span>
        </button>
      )}
    </div>
  );
}
