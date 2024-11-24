/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown, DropdownProps, MenuProps, message, Popconfirm } from 'antd';
import { useState } from 'react';
import { STOCK_STATUS } from '../../utils/constants';
import { convertTimestamp } from '../../utils/helpers';
import CreateCommentModal from '../tracks/CreateCommentModal';
import { useStockDelete } from '../tracks/useStockDelete';
import { useUpdateStockStatus } from './useUpdateStockStatus';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AcceptStockModal from './AcceptStockModal';

export type PageNameType = 'track' | 'report' | 'lead' | 'stock';

export type ContentCardProps = {
  item: { id: string };
  onEdit: () => void;
};

function StockContentCard({ item, onEdit }: ContentCardProps) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const company_id = searchParams.get('company_id');
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenAcceptStockModal, setOpenAcceptStockModal] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const [isOpenCommentModal, setOpenCommentModal] = useState(false);
  const { updateStockSatus, isLoadingUpdateStatus } = useUpdateStockStatus();
  const { deleteStock, isLoadingDelete } = useStockDelete();
  const navigate = useNavigate();
  const handleConfirm = (stock_task_status: string) => {
    updateStockSatus(
      {
        id: item?.id,
        stock_task_status,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['stockUpdateStatus'], data);
          queryClient.invalidateQueries({ queryKey: ['stocks'] });
          message.success('Company updated successfully');
          if (data.stock_task_status == 'confirmed') {
            navigate(`/stock/${item?.name}/${company_id}/drivers/${item.id}`);
            setOpenAcceptStockModal(false);
          }
        },
      },
    );
  };

  const handleDelete = () => {
    deleteStock(item.id, {
      onSuccess: (data) => {
        queryClient.setQueryData(['stockDelete'], data);
        queryClient.invalidateQueries({ queryKey: ['stocks'] });
        message.success('Stock deleted successfully');
      },
    });
  };

  const getFilteredMenuItems = (status: string): MenuProps['items'] => {
    const itemsMenu: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <p className="d-flex align-center">
            <img src="/img/card/menu/d-check.svg" alt="" />
            <span className="card__menu--text ml-10">Просмотреть </span>
          </p>
        ),
        className: 'mb-4',
        style: {
          display: ['in_process', 'confirmed', 'completed'].includes(status)
            ? ''
            : 'none',
        },
      },
      {
        key: '10',
        label: (
          // <p className="d-flex align-center">
          //   <img src="/img/card/menu/plus.svg" alt="" />
          //   <span className="card__menu--text ml-10">Отправить водителям </span>
          // </p>

          <Link
            to={`/stock/${item?.name}/${company_id}/drivers/${item.id}`}
            className="d-flex align-center"
          >
            <img src="/img/card/menu/plus.svg" alt="" />
            <span className="card__menu--text ml-10">Отправить водителям</span>
          </Link>
        ),
        className: 'mb-4',
        style: {
          display: ['in_process', 'confirmed'].includes(status) ? '' : 'none',
        },
      },
      {
        key: '11',
        label: (
          <Link
            to={`/stock/${item?.name}/${company_id}/employees/${item.id}`}
            className="d-flex align-center"
          >
            <img src="/img/card/menu/car.svg" alt="" />
            <span className="card__menu--text ml-10">Водители </span>
          </Link>
        ),
        className: 'mb-4',
        style: {
          display: ['confirmed', 'completed'].includes(status) ? '' : 'none',
        },
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
        key: '4',
        label: (
          <Popconfirm
            placement="top"
            title="Вы уверены, что хотите удалить этот элемент?"
            description="Удалить элемент"
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
        // visible: status === 'in_process',
      },
    ];

    return itemsMenu;
  };

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
                <p className="name">{item?.name}</p>
                {item?.rate && (
                  <p className="rate">
                    <span>{item?.rate}</span>
                    <img src="/img/card/star.svg" alt="rate" />
                  </p>
                )}
              </div>
            </div>
            <Dropdown
              menu={{
                items: getFilteredMenuItems(item?.stock_task_status),
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
                <img src="/img/card/car.svg" alt="" />
                <span>Кл. машин</span>
              </div>
              <div className="card__item--value">
                {/* {item?.contract_data.driver_data?.car_data_get.car_model} */}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/date.svg" alt="" />
                <span>Дата акции</span>
              </div>
              <div className="card__item--value">
                {convertTimestamp(item.beginning_time)}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/rating.svg" alt="" />
                <span>Компания</span>
              </div>
              <div className="card__item--value">
                {item?.contract_data?.company_data?.name}
              </div>
            </div>

            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/bag.svg" alt="" />
                <span>Задание</span>
              </div>
              <div className="card__item--value">{item?.name}</div>
            </div>
            <div className="card__item card__item--comment">
              <div className="card__item--label">
                <img src="/img/card/comment.svg" alt="" />
                <span>Комментарий</span>
              </div>
              <div className="card__item--value">{item?.comment}</div>
            </div>

            {item?.stock_task_status == 'in_process' ? (
              <div className="card__bottom">
                <div className="d-flex justify-center">
                  <button
                    className="btn btn-decline"
                    disabled={isLoadingUpdateStatus}
                    onClick={() => handleConfirm('rejected')}
                  >
                    Отклонить
                  </button>
                  <button
                    disabled={isLoadingUpdateStatus}
                    className="btn btn-confirm"
                    onClick={() => setOpenAcceptStockModal(true)}
                    // onClick={() => handleConfirm('confirmed')}
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="card__item mb-0">
                  <div className="card__item--label">
                    <img src="/img/card/loading.svg" alt="" />
                    <span>Статус</span>
                  </div>
                  <div
                    className="card__item--value card__item--value-status"
                    style={{
                      backgroundColor:
                        STOCK_STATUS[item.stock_task_status]?.color,
                    }}
                  >
                    <span className="dot-live mr-5"></span>
                    {STOCK_STATUS[item.stock_task_status]?.value}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <CreateCommentModal
        pagename="stock"
        onCloseModal={() => setOpenCommentModal(false)}
        isOpenModal={isOpenCommentModal}
        retrieveData={item}
      />
      <AcceptStockModal
        isOpenModal={isOpenAcceptStockModal}
        onCloseModal={() => setOpenAcceptStockModal(false)}
        onAccept={() => handleConfirm('confirmed')}
        isLoading={isLoadingUpdateStatus}
      />
    </>
  );
}

export default StockContentCard;
