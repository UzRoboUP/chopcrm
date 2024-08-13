import { DatePicker, DatePickerProps, Dropdown, Input, Space } from 'antd';
import left from '../../public/img/page-header/left-chevron.svg';
import download from '../../public/img/page-header/download.svg';
import { DownOutlined } from '@ant-design/icons';
import FormBox from './FormBox';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeaderRadioGroup from './HeaderRadioGroup';
import { useBrand } from '../features/brand/useBrand';
import { useModel } from '../features/model/useModel';
import { useCompany } from '../features/company/useCompany';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
// import { useEffect } from 'react';
export default function ContentHeader({
  pagename,
  hasBrand = false,
  hasModel = false,
  hasCompany = false,
  hasPhone = false,
  hasSaveButton = false,
  hasDate = false,
  hasTask = false,
  taskText = '',
}: {
  pagename: string;
  hasBrand?: boolean;
  hasModel?: boolean;
  hasCompany?: boolean;
  hasPhone?: boolean;
  hasSaveButton?: boolean;
  hasDate?: boolean;
  hasTask?: boolean;
  taskText?: string;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { brand } = useBrand(hasBrand);
  const { model } = useModel(params.get('car_brand'));
  const { company } = useCompany(hasCompany);

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

  // useEffect(() => {
  //   if (!params.has('car_brand')) {
  //     params.delete('car_model');
  //     setSearchParams(params);
  //   }
  // }, [searchParams]);

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
                params.has('created_at__gt')
                  ? dayjs(searchParams.get('created_at__gt'))
                  : null
              }
            />
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
                    menu={company}
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

          {hasTask && (
            <>
              <div className="stock__task">{taskText}</div>
            </>
          )}
        </div>
      </div>
      {hasSaveButton && (
        <button className="export-btn">
          <img
            className="pointer"
            width="20px"
            height="20px"
            src={download}
            alt=""
          />
          <span>Экспорт</span>
        </button>
      )}
    </div>
  );
}
