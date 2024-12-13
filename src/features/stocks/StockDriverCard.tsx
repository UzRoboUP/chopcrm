/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dropdown, DropdownProps, MenuProps } from 'antd';
import { useState } from 'react';
import DriverCreateButton from '../../ui/DriverCreateButton';
import { useParams } from 'react-router-dom';

export type PageNameType = 'track' | 'report' | 'lead' | 'stock';

export type ContentCardProps = {
  item: { id: string };
  pagename: PageNameType;
};

function StockDriverCard({ item, pagename }: ContentCardProps) {
  const params = useParams();

  const [isOpenMenu, setOpenMenu] = useState(false);



  const itemsMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          href="https://cdn.leetcode.uz/chop-cdn/media/ypx/qabul.xlsx"
          className="d-flex align-center"
          download={true}
        >
          <img src="/img/card/menu/download.svg" alt="" />
          <span className="card__menu--text ml-10">Скачать договор</span>
        </a>
      ),
      className: 'mb-4',
    },
  ];

  const handleOpenMenu: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenMenu(nextOpen);
    }
  };

  return (
    <>
      <div className="content__col">
        <div className="content__card card">
          <div className="card__header">
            <div className="card__user">
              <p className="card__user--avatar">
                <img src="/img/card/empty-avatar.svg" alt="avatar" />
              </p>
              <div className="card__user--info">
                <p className="name">{item?.driver?.full_name}</p>
                <p className="rate">
                  <span>{item?.rate?.rate || '---'}</span>
                </p>
              </div>
            </div>
            <Dropdown
              menu={{
                items: itemsMenu,
                selectable: false,
                defaultSelectedKeys: [''],
              }}
              placement="bottom"
              trigger={['click']}
              arrow={{ pointAtCenter: true }}
              open={isOpenMenu}
              onOpenChange={handleOpenMenu}
              className="drawer-header__settings"
            >
              <div className="card__dots cursor-pointer">
                <img src="/img/card/dots.svg" alt="dots" />
              </div>
            </Dropdown>
          </div>
          <div className="card__items">
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/phone.svg" alt="" />
                <span>Телефон</span>
              </div>
              <div className="card__item--value">
                {item?.driver?.phone_number}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/car.svg" alt="" />
                <span>Тип машины</span>
              </div>
              <div className="card__item--value">
                {item?.driver?.car_data?.car_model}
              </div>
            </div>
            <div className="card__item card__item--comment">
              <div className="card__item--label">
                <img src="/img/card/comment.svg" alt="" />
                <span>Комментарий</span>
              </div>
              <div className="card__item--value">
                {item?.comment || 'без комментариев'}
              </div>
            </div>
            <div className="card__footer">
              <DriverCreateButton contract={item?.id} task={params?.task_id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockDriverCard;
