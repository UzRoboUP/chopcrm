/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown, DropdownProps, MenuProps, message, Popconfirm } from 'antd';
import { useState } from 'react';
import { convertTimestamp } from '../../utils/helpers';
import CreateCommentModal from '../tracks/CreateCommentModal';
import { useReportDelete } from '../tracks/useReportDelete';
import { reportPhotoStatus } from '../../utils/constants';

export type PageNameType = 'track' | 'report' | 'lead' | 'stock';

export type ContentCardProps = {
  item: { id: string };
  pagename: PageNameType;
  onEdit: () => void;
};

function ReportContentCard({ item, pagename, onEdit }: ContentCardProps) {
  const queryClient = useQueryClient();

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const [isOpenCommentModal, setOpenCommentModal] = useState(false);

  const { deleteReport, isLoadingDelete } = useReportDelete();

  const handleDelete = () => {
    deleteReport(item.id, {
      onSuccess: (data) => {
        queryClient.setQueryData(['reportDelete'], data);
        queryClient.invalidateQueries({ queryKey: ['reports'] });
        message.success('Report deleted successfully');
      },
    });
  };

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
    {
      key: '3',
      label: (
        <p
          onClick={() => {
            onEdit();
            setOpenMenu(false);
          }}
          className="d-flex align-center"
        >
          <img src="/img/card/menu/edit.svg" alt="" />
          <span className="card__menu--text ml-10">Изменить профиль</span>
        </p>
      ),
      className: 'mb-4',
    },
    {
      key: '4',
      label: (
        <Popconfirm
          placement="top"
          title="Are you sure to delete this item?"
          description="Delete the item"
          okText={'Yes'}
          cancelText="No"
          open={popconfirmOpen}
          onConfirm={handleDelete}
          okButtonProps={{
            loading: isLoadingDelete,
            disabled: isLoadingDelete,
          }}
          cancelButtonProps={{
            disabled: isLoadingDelete,
          }}
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
                <p className="name">
                  {item?.contract_data?.driver_data?.full_name}
                </p>
                <p className="rate">
                  <span>4.5</span>
                  <img src="/img/card/star.svg" alt="rate" />
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
                {item?.contract_data?.driver_data?.phone_number}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/car.svg" alt="" />
                <span>Тип машины</span>
              </div>
              <div className="card__item--value">
                {item?.contract_data?.driver_data?.car_data_get.model}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/book.svg" alt="" />
                <span>Компания</span>
              </div>
              <div className="card__item--value">
                {item?.company_data?.name}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/date.svg" alt="" />
                <span>Время последней обработки</span>
              </div>
              <div className="card__item--value">
                {convertTimestamp(item.updated_at)}
              </div>
            </div>
            <div className="card__item card__item--comment">
              <div className="card__item--label">
                <img src="/img/card/comment.svg" alt="" />
                <span>Комментарий</span>
              </div>
              <div className="card__item--value">{item?.report_comment}</div>
            </div>
            <div className="card__item mb-0">
              <div className="card__item--label">
                <img src="/img/card/loading.svg" alt="" />
                <span>Статус</span>
              </div>
              <div
                className="card__item--value card__item--value-status"
                style={{
                  backgroundColor: reportPhotoStatus[item.status_stock]?.color,
                }}
              >
                <span className="dot-live mr-5"></span>
                {reportPhotoStatus[item.status_stock]?.value}
              </div>
            </div>
          </div>
          <div className="card__bottom">
            <button className="card__bottom--btn">
              <span className="ml-5">Запросить</span>
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

export default ReportContentCard;
