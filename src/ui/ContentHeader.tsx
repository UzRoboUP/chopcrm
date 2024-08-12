import { Dropdown, Input, Space } from 'antd';
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
export default function ContentHeader({ pagename }: { pagename: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { brand } = useBrand();
  const { model } = useModel(params.get('car_brand'));
  const { company } = useCompany();

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
    params.set('search', e.target.value);
    setSearchParams(params);
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
          <FormBox title="Модель">
            <Dropdown
              trigger={['click']}
              dropdownRender={() => (
                <HeaderRadioGroup
                  defaultValue={searchParams.get('car_model')}
                  menu={model}
                  name="model"
                  onChange={onChange}
                  searchParam="car_model"
                />
              )}
            >
              <a onClick={(e) => e.preventDefault()} >
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

          <FormBox title="Номер телефона">
            <Input
              type="number"
              value={`${searchParams.get('search') ? searchParams.get('search') : ''}`}
              onChange={serachPhone}
            />
          </FormBox>
        </div>
      </div>
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
    </div>
  );
}
