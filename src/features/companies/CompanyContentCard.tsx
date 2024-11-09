/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown, DropdownProps, MenuProps, message, Popconfirm } from 'antd';
import { useState } from 'react';
import { CLIENT_COMPANY_STATUS } from '../../utils/constants';
import { convertTimestamp } from '../../utils/helpers';
import { useUpdateCompany, useUpdateCompanyStatus } from './useUpdateCompany';
import { Link } from 'react-router-dom';
import CreateCommentModal from '../tracks/CreateCommentModal';
import { useCompanyDelete } from './useCompanyDelete';

export type PageNameType =
  | 'track'
  | 'report'
  | 'lead'
  | 'stock'
  | 'pasting'
  | 'company';

export type ContentCardProps = {
  item: { id: string };
  pagename: PageNameType;
  onEdit: () => void;
  onOpenModal: () => void;
};

function CompanyContentCard({
  item,
  pagename,
  onOpenModal,
  onEdit,
}: ContentCardProps) {
  const queryClient = useQueryClient();

  console.log('item', item);
  const [isOpenCommentModal, setOpenCommentModal] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const { deleteCompany, isLoadingDelete } = useCompanyDelete();
  const { updateCompanySatus, isLoadingUpdateStatus } =
    useUpdateCompanyStatus();

  const handleDelete = () => {
    deleteCompany(item.id, {
      onSuccess: (data) => {
        queryClient.setQueryData(['companyDelete'], data);
        queryClient.invalidateQueries({ queryKey: ['companies'] });
        message.success('Company deleted successfully');
      },
    });
  };

  const handleConfirm = (company_status: string) => {
    updateCompanySatus(
      {
        id: item?.id,
        company_status,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['companyUpdate'], data);
          queryClient.invalidateQueries({ queryKey: ['companies'] });
          message.success('Company updated successfully');
        },
      },
    );
  };

  const itemsMenu: MenuProps['items'] = ['approved', 'active'].includes(
    item.company_status,
  )
    ? [
        {
          key: '1',
          label: (
            <Link
              to={`/companies/${item?.name}/${item.id}/drivers`}
              className="d-flex align-center"
            >
              <img src="/img/card/menu/plus.svg" alt="" />
              <span className="card__menu--text ml-10">Добавить водителей</span>
            </Link>
          ),
          className: 'mb-4',
        },
        {
          key: '2',
          label: (
            <p className="d-flex align-center">
              <img src="/img/card/menu/d-check.svg" alt="" />
              <span className="card__menu--text ml-10">Просмотреть</span>
            </p>
          ),
          className: 'mb-4',
        },
        {
          key: '3',
          label: (
            <Link
              to={`/companies/${item?.name}/${item.id}/employees`}
              className="d-flex align-center"
            >
              <img src="/img/card/menu/car.svg" alt="" />
              <span className="card__menu--text ml-10">Водители</span>
            </Link>
          ),
          className: 'mb-4',
        },
        {
          key: '4',
          label: (
            <p
              onClick={() => {
                setOpenMenu(false);
                setOpenCommentModal(true);
              }}
              className="d-flex align-center"
            >
              <img src="/img/card/menu/comment.svg" alt="" />
              <span className="card__menu--text ml-10">
                Оставить коментарий
              </span>
            </p>
          ),
          className: 'mb-4',
        },
        {
          key: '5',
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
        },
      ]
    : [
        {
          key: '1',
          label: (
            <Link
              to={`/companies/${item?.name}/${item.id}/drivers`}
              className="d-flex align-center"
            >
              <img src="/img/card/menu/plus.svg" alt="" />
              <span className="card__menu--text ml-10">Добавить водителей</span>
            </Link>
          ),
          className: 'mb-4',
        },
        {
          key: '2',
          label: (
            <p className="d-flex align-center">
              <img src="/img/card/menu/d-check.svg" alt="" />
              <span className="card__menu--text ml-10">Просмотреть</span>
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
                <img
                  src={item.image ? item.image : '/img/card/empty-avatar.svg'}
                  alt="avatar"
                  width={50}
                  height={50}
                />
              </p>
              <div className="card__user--info">
                <p className="name">
                  {item?.contract_data?.driver_data?.full_name}
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
                <img src="/img/card/car.svg" alt="" />
                <span>Тип машины</span>
              </div>
              <div className="card__item--value">
                {item?.contract_data?.driver_data?.car_data?.car_model}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img style={{ height: 22 }} src="/img/card/date.svg" alt="" />
                <span>Дата регистрации</span>
              </div>
              <div className="card__item--value">
                {convertTimestamp(item?.created_at)}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/book.svg" alt="" />
                <span>Компания</span>
              </div>
              <div className="card__item--value">{item?.name}</div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img
                  style={{ height: 22 }}
                  src="/img/card/menu/location-b.svg"
                  alt=""
                />
                <span>Место проведение</span>
              </div>
              <div className="card__item--value">{item?.address || '-'}</div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img style={{ height: 22 }} src="/img/card/target.svg" alt="" />
                <span>Тариф</span>
              </div>
              <div className="card__item--value">{item?.tariff || '-'}</div>
            </div>
            <div className="card__item mb-0">
              <div className="card__item--label">
                <img src="/img/card/loading.svg" alt="" />
                <span>Статус</span>
              </div>
              <div
                className="card__item--value card__item--value-status"
                style={{
                  backgroundColor:
                    CLIENT_COMPANY_STATUS[item.company_status]?.color,
                }}
              >
                <span className="dot-live mr-5"></span>
                {CLIENT_COMPANY_STATUS[item.company_status]?.value}
              </div>
            </div>
            {['approved', 'active'].includes(item.company_status) && (
              <>
                <div className="card__item card__item--comment">
                  <div className="card__item--label">
                    <img src="/img/card/comment.svg" alt="" />
                    <span>Комментарий</span>
                  </div>
                  <div className="card__item--value">
                    {item?.client_company_comment || 'без комментариев'}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="card__bottom">
            {item.company_status == 'in_process' && (
              <div className="d-flex justify-center">
                <button
                  className="btn btn-decline"
                  disabled={isLoadingUpdateStatus}
                  onClick={() => handleConfirm('completed')}
                >
                  Отклонить
                </button>
                <button
                  disabled={isLoadingUpdateStatus}
                  className="btn btn-confirm"
                  onClick={() => handleConfirm('approved')}
                >
                  Подтвердить
                </button>
              </div>
            )}
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

export default CompanyContentCard;
