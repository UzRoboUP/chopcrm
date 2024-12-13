/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown, DropdownProps, MenuProps, Popconfirm } from 'antd';
import { useState } from 'react';
import { CLIENT_STATUS, REPORT_PHOTO_STATUS } from '../../utils/constants';
import dayjs from 'dayjs';

export type PageNameType = 'track' | 'report' | 'lead' | 'stock';

export type ContentCardProps = {
  item: {
    id: string;
    client_user_status: string;
    comment: string;
    created_at: string;
    company_name: string;
    phone_number: string;
    full_name: string;
  };
};

function CustomRequestContentCard({ item }: ContentCardProps) {
  const queryClient = useQueryClient();
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  // const [isOpenCommentModal, setOpenCommentModal] = useState(false);
  const itemsMenu: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <p
          onClick={() => {
            setOpenMenu(false);
            // setOpenCommentModal(true);
          }}
          className="d-flex align-center"
        >
          <img src="/img/card/menu/comment.svg" alt="" />
          <span className="card__menu--text ml-10">Оставить коментарий</span>
        </p>
      ),
      className: 'mb-4',
    },
    {
      key: '4',
      label: (
        <Popconfirm
          placement="top"
          title="Вы уверены, что хотите удалить этот элемент?"
          description="Удалить элемент"
          okText={'Yes'}
          cancelText="No"
          open={popconfirmOpen}
          onConfirm={() => console.log('xx')}
          okButtonProps={
            {
              // loading: isLoadingDelete,
              // disabled: isLoadingDelete,
            }
          }
          cancelButtonProps={
            {
              // disabled: isLoadingDelete,
            }
          }
          onCancel={() => setPopconfirmOpen(false)}
        >
          <p
            onClick={() => setPopconfirmOpen(true)}
            className="d-flex align-center card__menu--label card__menu--label-delete"
          >
            <img src="/img/card/menu/delete.svg" alt="" />
            <span
              className="card__menu--text ml-10"
              style={{ color: '#FF2D55' }}
            >
              Удалить из списка
            </span>
          </p>
        </Popconfirm>
      ),
      className: 'card__menu--label-delete',
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
                <img src="/img/card/book.svg" alt="" />
                <span>Компания</span>
              </div>
              <div className="card__item--value">{item?.company_name}</div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/date.svg" alt="" />
                <span>Дата регистрации</span>
              </div>
              <div className="card__item--value">
                {item?.created_at &&
                  dayjs(item?.created_at).format('YYYY.DD.MM HH:MM')}
              </div>
            </div>
            <div className="card__item card__item--comment">
              <div className="card__item--label">
                <img src="/img/card/comment.svg" alt="" />
                <span>Комментарий</span>
              </div>
              <div className="card__item--value">{item?.comment}</div>
            </div>
            <div className="card__item mb-0">
              <div className="card__item--label">
                <img src="/img/card/loading.svg" alt="" />
                <span>Статус фотоотчета</span>
              </div>
              <div
                className="card__item--value card__item--value-status"
                style={{
                  backgroundColor:
                  CLIENT_STATUS[item?.client_user_status]?.color,
                }}
              >
                <span className="dot-live mr-5"></span>
                {CLIENT_STATUS[item?.client_user_status]?.value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomRequestContentCard;
