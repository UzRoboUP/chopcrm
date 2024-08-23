/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown, DropdownProps, MenuProps, message, Popconfirm } from 'antd';
import { useState } from 'react';
import { PASTING_STATUS } from '../../utils/constants';
import { usePastingDelete } from './usePastingDelete';

export type PageNameType = 'track' | 'report' | 'lead' | 'stock' | 'pasting';

export type ContentCardProps = {
  item: { id: string };
  pagename: PageNameType;
  onEdit: () => void;
  onOpenModal: () => void;
};

function PastingContentCard({
  item,
  pagename,
  onOpenModal,
  onEdit,
}: ContentCardProps) {
  const queryClient = useQueryClient();

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const { deletePasting, isLoadingDelete } = usePastingDelete();

  const handleDelete = () => {
    deletePasting(item.id, {
      onSuccess: (data) => {
        queryClient.setQueryData(['pastingDelete'], data);
        queryClient.invalidateQueries({ queryKey: ['pastings'] });
        message.success('Pasting deleted successfully');
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
                {item?.contract_data?.driver_data?.car_data?.car_model}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/book.svg" alt="" />
                <span>Компания</span>
              </div>
              <div className="card__item--value">
                {item?.contract_data?.company_data?.name}
              </div>
            </div>
            <div className="card__item mb-0">
              <div className="card__item--label">
                <img src="/img/card/loading.svg" alt="" />
                <span>Статус</span>
              </div>
              <div
                className="card__item--value card__item--value-status"
                style={{
                  backgroundColor: PASTING_STATUS[item.status_pasting]?.color,
                }}
              >
                <span className="dot-live mr-5"></span>
                {PASTING_STATUS[item.status_pasting]?.value}
              </div>
            </div>
          </div>
          <div className="card__bottom">
            {['notified', 'confirmed', 'pending'].includes(
              item.status_pasting,
            ) && (
              <button className="card__bottom--btn" onClick={onOpenModal}>
                <span className="ml-5">Посмотреть</span>
              </button>
            )}
            {item.status_pasting === 'photo_report_rejected' && (
              <button className="card__bottom--btn" onClick={onOpenModal}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M18.5355 1.46447C20 2.92893 20 5.28595 20 10C20 14.714 20 17.0711 18.5355 18.5355C17.0711 20 14.714 20 10 20C5.28595 20 2.92893 20 1.46447 18.5355C-7.462e-07 17.0711 -6.43171e-07 14.714 -4.37114e-07 10C-2.31056e-07 5.28595 -1.28028e-07 2.92893 1.46447 1.46447C2.92893 -7.462e-07 5.28596 -6.43171e-07 10 -4.37114e-07C14.714 -2.31056e-07 17.0711 -1.28028e-07 18.5355 1.46447Z"
                    fill="#30B0C7"
                  />
                  <path
                    d="M16.937 15.1594L16.8673 14.9494C16.7023 14.4589 16.1613 13.9472 15.6644 13.8125L13.8251 13.31C13.3263 13.1743 12.6148 13.3568 12.2498 13.7217L11.5842 14.3874C9.16495 13.7336 7.26791 11.8365 6.61508 9.4178L7.28079 8.7521C7.64573 8.38716 7.82817 7.67659 7.69247 7.1778L7.19092 5.33759C7.05522 4.83972 6.54267 4.29876 6.05307 4.13554L5.84311 4.06495C5.35256 3.90173 4.65297 4.0668 4.28806 4.43171L3.2923 5.42837C3.11441 5.60533 3.00071 6.11145 3.00071 6.1133C2.96589 9.27474 4.20552 12.3206 6.4418 14.5569C8.67259 16.7877 11.7071 18.0255 14.8593 17.999C14.8758 17.999 15.3966 17.8871 15.5745 17.7101L16.5703 16.7143C16.9352 16.3495 17.1002 15.6499 16.937 15.1594Z"
                    fill="white"
                  />
                </svg>

                <span className="ml-5">Позвонить</span>
              </button>
            )}
            {item.status_pasting === 'non-assigned' && (
              <button className="card__bottom--btn" onClick={onOpenModal}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M18.5355 1.46447C20 2.92893 20 5.28595 20 10C20 14.714 20 17.0711 18.5355 18.5355C17.0711 20 14.714 20 10 20C5.28595 20 2.92893 20 1.46447 18.5355C-7.462e-07 17.0711 -6.43171e-07 14.714 -4.37114e-07 10C-2.31056e-07 5.28595 -1.28028e-07 2.92893 1.46447 1.46447C2.92893 -7.462e-07 5.28596 -6.43171e-07 10 -4.37114e-07C14.714 -2.31056e-07 17.0711 -1.28028e-07 18.5355 1.46447Z"
                    fill="#30B0C7"
                  />
                  <g clipPath="url(#clip0_4001_18506)">
                    <path
                      d="M4.74998 4.68754V2.9375C4.74998 2.69565 4.94564 2.5 5.18754 2.5C5.42933 2.5 5.62499 2.69565 5.62499 2.9375V4.68754C5.62499 4.92933 5.42933 5.12499 5.18754 5.12499C4.94564 5.12502 4.74998 4.92933 4.74998 4.68754ZM12.1876 5.12502C12.4293 5.12502 12.6251 4.92936 12.6251 4.68757V2.9375C12.6251 2.69565 12.4293 2.5 12.1876 2.5C11.9457 2.5 11.7499 2.69565 11.7499 2.9375V4.68754C11.7499 4.92933 11.9457 5.12502 12.1876 5.12502ZM16.9999 12.9999C16.9999 14.9329 15.4329 16.5 13.4999 16.5C11.5672 16.5 9.99998 14.9329 9.99998 12.9999C9.99998 11.0671 11.5672 9.49999 13.4999 9.49999C15.4329 9.49999 16.9999 11.0671 16.9999 12.9999ZM16.1251 12.9999C16.1251 11.5526 14.9475 10.3749 13.5 10.3749C12.0525 10.3749 10.875 11.5526 10.875 12.9999C10.875 14.4475 12.0525 15.625 13.5 15.625C14.9475 15.625 16.1251 14.4475 16.1251 12.9999ZM6.50002 7.75H4.74998V9.49999H6.50002V7.75ZM4.74998 12.125H6.50002V10.3749H4.74998V12.125ZM7.37497 9.49999H9.12504V7.75H7.37497V9.49999ZM7.37497 12.125H9.12504V10.3749H7.37497V12.125ZM3.87503 12.9129V6.87497H13.5V8.62501H14.375V5.21221C14.375 4.6807 13.9511 4.24998 13.4274 4.24998H13.0625V4.68757C13.0625 5.16945 12.6702 5.56255 12.1876 5.56255C11.7048 5.56255 11.3126 5.16945 11.3126 4.68757V4.24998H6.06246V4.68757C6.06246 5.16945 5.67026 5.56255 5.18757 5.56255C4.70477 5.56255 4.31254 5.16945 4.31254 4.68757V4.24998H3.94806C3.42432 4.24998 3 4.6807 3 5.21221V12.9129C3 13.4427 3.42432 13.8751 3.94806 13.8751H9.12504V12.9999H3.94806C3.90842 12.9999 3.87503 12.9589 3.87503 12.9129ZM11.7499 9.49999V7.75H10V9.49999H11.7499ZM14.8125 12.9999H13.4999V11.6874C13.4999 11.4457 13.3043 11.25 13.0624 11.25C12.8206 11.25 12.6251 11.4457 12.6251 11.6874V13.4375C12.6251 13.6793 12.8206 13.875 13.0624 13.875H14.8125C15.0543 13.875 15.25 13.6793 15.25 13.4375C15.25 13.1957 15.0543 12.9999 14.8125 12.9999Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4001_18506">
                      <rect
                        width="14"
                        height="15"
                        fill="white"
                        transform="translate(3 2.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ml-5">Назначить время об клейки</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PastingContentCard;
