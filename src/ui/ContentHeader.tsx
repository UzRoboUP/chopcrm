import { DownOutlined } from '@ant-design/icons';
import { Checkbox, CheckboxProps, Dropdown, MenuProps, Space } from 'antd';
import { useEffect, useState } from 'react';
import download from '../../public/img/page-header/download.svg';
import left from '../../public/img/page-header/left-chevron.svg';
import { usePageTitle } from '../features/usePageTitle';
import { PageNameType } from './ContentCard';
import FormBox from './FormBox';

type ContentHeaderProps = {
  pagename: PageNameType;
};

export default function ContentHeader({ pagename }: ContentHeaderProps) {
  const [menu, setMenu] = useState([]);
  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
    console.log(menu);

  };


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(item => item.json())
      .then((result) => {
        setMenu(result);
      });
  }, []);

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="d-flex align-center">
          <Checkbox onChange={onChange}>
            <span className=" form-box-check-title">Daewoo</span>
          </Checkbox>
        </div>
      ),
      key: '0',
    },
  ];
  return (
    <div className="content__header__content d-flex align-center justify-between ">
      <div className="content__headera__category d-flex align-center">
        <img className="pointer" width="36px" height="36px" src={left} alt="" />
        <span className="content__header__title">{usePageTitle(pagename)}</span>
        <div className="content__header__filter">
          <FormBox title="Марка">
            <Dropdown menu={{ items }} trigger={['click']}  >
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
