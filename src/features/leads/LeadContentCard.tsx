/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dropdown, DropdownProps, MenuProps } from 'antd';
import { useState } from 'react';
import CreateCommentModal from '../tracks/CreateCommentModal';
import { convertTimestamp } from '../../utils/helpers';

export type PageNameType = 'track' | 'report' | 'lead' | 'stock';

export type ContentCardProps = {
  item: { id: string };
  pagename: PageNameType;
  onEdit?: () => void;
};

function LeadContentCard({ item, pagename }: ContentCardProps) {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenCommentModal, setOpenCommentModal] = useState(false);

  // {
  //   "id": "00cd6857-0e68-4e4b-bbf5-6b4857a437b5",
  //   "created_at": "2024-08-06",
  //   "updated_at": "2024-08-06",
  //   "passport": null,
  //   "full_name": "Frank Galo",
  //   "address": "Qamoqxona",
  //   "phone_number": "+998996600420",
  //   "card_data": null,
  //   "image": null,
  //   "driver_status": "ready_to_work",
  //   "last_active_time": "2024-08-06T12:28:20.267351+05:00",
  //   "leads_comment": "None"
  // },

  const itemsMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className="d-flex align-center">
          <img src="/img/card/menu/destination.svg" alt="" />
          <span className="card__menu--text ml-10">Место нахождения</span>
        </p>
      ),
      className: 'mb-4',
    },
    {
      key: '2',
      label: (
        <p
          onClick={() => {
            setOpenMenu(false);
            setOpenCommentModal(true);
          }}
          className="d-flex align-center"
        >
          <img src="/img/card/menu/comment.svg" alt="" />
          <span className="card__menu--text ml-10">Оставить коментарий</span>
        </p>
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
                <p className="name">{item?.full_name}</p>
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
              <div className="card__item--value">{item?.phone_number}</div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/car.svg" alt="" />
                <span>Тип машины</span>
              </div>
              <div className="card__item--value">{item.car_data_get.model}</div>
            </div>

            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/date.svg" alt="" />
                <span>Дата регистрации</span>
              </div>
              <div className="card__item--value">
                {convertTimestamp(item.created_at)}
              </div>
            </div>
            <div className="card__item card__item--comment">
              <div className="card__item--label">
                <img src="/img/card/comment.svg" alt="" />
                <span>Комментарий</span>
              </div>
              <div className="card__item--value">{item?.leads_comment}</div>
            </div>
          </div>
          <div className="card__bottom">
            <button className="card__bottom--btn">
              <img src="/img/card/location.svg" alt="" />
              <span className="ml-5">Показать последнюю активность</span>
            </button>
          </div>
        </div>
      </div>
      <CreateCommentModal
        pagename={pagename}
        onCloseModal={() => setOpenCommentModal(false)}
        isOpenModal={isOpenCommentModal}
        retrieveData={item}
      />
    </>
  );
}

export default LeadContentCard;