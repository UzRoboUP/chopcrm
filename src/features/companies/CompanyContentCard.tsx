/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown, DropdownProps, MenuProps, message, Popconfirm } from 'antd';
import { useState } from 'react';
import { CLIENT_COMPANY_STATUS } from '../../utils/constants';
import { convertTimestamp } from '../../utils/helpers';
import { usePastingDelete } from '../pasting/usePastingDelete';
import { useUpdateCompany } from './useUpdateCompany';

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

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const { deletePasting, isLoadingDelete } = usePastingDelete();
  const { updateCompany, isLoadingUpdate } = useUpdateCompany();

  const handleDelete = () => {
    deletePasting(item.id, {
      onSuccess: (data) => {
        queryClient.setQueryData(['pastingDelete'], data);
        queryClient.invalidateQueries({ queryKey: ['pastings'] });
        message.success('Pasting deleted successfully');
      },
    });
  };

  const handleConfirm = (status_client_company: string) => {
    updateCompany(
      {
        id: item?.id,
        status_client_company,
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

  const itemsMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className="d-flex align-center">
          <img src="/img/card/menu/plus.svg" alt="" />
          <span className="card__menu--text ml-10">Добавить водителей</span>
        </p>
      ),
      className: 'mb-4',
    },
    {
      key: '2',
      label: (
        <p className="d-flex align-center">
          <img src="/img/card/menu/d-check.svg" alt="" />
          <span className="card__menu--text ml-10">
            Просмотреть всех водителей
          </span>
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
              <div className="card__item--value">{item?.location || '-'}</div>
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
                    CLIENT_COMPANY_STATUS[item.status_client_company]?.color,
                }}
              >
                <span className="dot-live mr-5"></span>
                {CLIENT_COMPANY_STATUS[item.status_client_company]?.value}
              </div>
            </div>
          </div>
          <div className="card__bottom">
            <div className="d-flex justify-center">
              <button
                className="btn btn-decline"
                disabled={isLoadingUpdate}
                onClick={() => handleConfirm('not-processed')}
              >
                Отклонить
              </button>
              <button
                disabled={isLoadingUpdate}
                className="btn btn-confirm"
                onClick={() => handleConfirm('processed')}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyContentCard;
