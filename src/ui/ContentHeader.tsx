import { Dropdown, MenuProps, Space } from 'antd';
import left from '../../public/img/page-header/left-chevron.svg';
import download from '../../public/img/page-header/download.svg';
import { DownOutlined } from '@ant-design/icons';
import FormBox from './FormBox';
export default function ContentHeader({ pageName }: { pageName: string }) {
  const items: MenuProps['items'] = [
    {
      label: 'st menu item',
      key: '0',
    },
    {
      label: '2nd menu item',
      key: '1',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];
  return (
    <div className="content__header__content d-flex align-center justify-between ">
      <div className="content__headera__category d-flex align-center">
        <img className="pointer" width="36px" height="36px" src={left} alt="" />
        <span className="content__header__title">{pageName}</span>
        <div className="content__header__filter">
          <FormBox title="Марка">
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Выберите
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </FormBox>
          <FormBox title="Модель">
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Выберите
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </FormBox>
          <FormBox title="Компания">
            <Dropdown menu={{ items }} trigger={['click']}>
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
        <img className="pointer" width="20px" height="20px" src={download} alt="" />
        <span>Экспорт</span>
      </button>
    </div>
  );
}
