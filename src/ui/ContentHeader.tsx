import { Dropdown, Space } from 'antd';
import left from '../../public/img/page-header/left-chevron.svg';

import download from '../../public/img/page-header/download.svg';
import { DownOutlined } from '@ant-design/icons';

import FormBox from './FormBox';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeaderRadioGroup from './HeaderRadioGroup';
export default function ContentHeader({ pagename }: { pagename: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((item) => item.json())
      .then((result) => {
        setMenu(result);
      });
  }, []);

  const onChange = (data: { id: string; name: string; type: string }) => {
    console.log(data);
    params.set(data.type, data.name);
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
                  menu={menu}
                  onChange={onChange}
                  type="car_brand"
                />
              )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Выберите
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
                  menu={menu}
                  onChange={onChange}
                  type="car_model"
                />
              )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Выберите
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
                  menu={menu}
                  onChange={onChange}
                  type="company__name"
                />
              )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Выберите
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </FormBox>

          <FormBox title="Номер телефона">
            <input type="text" />
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
