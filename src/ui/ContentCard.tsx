/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import {
  Dropdown,
  DropdownProps,
  MenuProps,
  message,
  Popconfirm,
  Space,
} from 'antd';
import { useState } from 'react';
import CreateCommentModal from '../features/tracks/CreateCommentModal';
import { useTrackDelete } from '../features/tracks/useTrackDelete';

export type PageNameType = 'track' | 'report' | 'lead' | 'stock';

export type ContentCardProps = {
  item: { id: string };
  pagename: PageNameType;
  onEdit: () => void;
};

function ContentCard({ item, pagename, onEdit }: ContentCardProps) {
  const queryClient = useQueryClient();

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const [isOpenCommentModal, setOpenCommentModal] = useState(false);

  let isLoadingDelete = false;

  const { deleteTrack, isLoadingDelete: isLoadingTrackDelete } =
    useTrackDelete();

  switch (pagename) {
    case 'track':
      isLoadingDelete = isLoadingTrackDelete;
      break;
    case 'report':
      // isLoadingDelete = isLoadingTrackDelete;
      break;
    case 'lead':
      // isLoadingDelete = isLoadingTrackDelete;
      break;
    case 'stock':
      // isLoadingDelete = isLoadingTrackDelete;
      break;

    default:
      throw new Error('There is no such pagename property');
  }

  const handleDelete = () => {
    switch (pagename) {
      case 'track':
        deleteTrack(item.id, {
          onSuccess: (data) => {
            queryClient.setQueryData(['trackDelete'], data);
            queryClient.invalidateQueries({ queryKey: ['tracks'] });
            message.success('Track deleted successfully');
          },
        });
        break;

      default:
        throw new Error('There is no such pagename property');
    }
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

  const renderUserHeader = () => {
    switch (pagename) {
      case 'track':
        return (
          <p className="rate">
            <span>Сегодня 12:40</span>
          </p>
        );
      case 'report':
      case 'stock':
        return (
          <p className="rate">
            <span>4.5</span>
            <img src="/img/card/star.svg" alt="rate" />
          </p>
        );
      default:
        return null;
    }
  };

  //   {
  //     "id": "07d5bde1-31e0-470a-9286-e0f6738b4906",
  //     "created_at": "2024-08-03",
  //     "updated_at": "2024-08-03",
  //     "passport": null,
  //     "full_name": "Ravshan Khatamov",
  //     "address": "Tashkent",
  //     "phone_number": "+998996600420",
  //     "card_data": null,
  //     "image": null,
  //     "driver_status": "ready_to_work",
  //     "car_data": null,
  //     "car_data_get": {
  //         "car_model": "",
  //         "car_brand": "",
  //         "car_service_type": "",
  //         "manufactured_year": null,
  //         "government_number": "",
  //         "tech_passport_number": "",
  //         "issue_date_of_tech_passport": null,
  //         "issue_date_of_power_attorney": null,
  //         "photo_of_tech_passport": null,
  //         "photo_of_tech_passport2": null,
  //         "photo_of_power_attorney": null,
  //         "license_photo_of_driver": null,
  //         "icense_photo_of_driver2": null,
  //         "car_photo": null
  //     },
  //     "last_active_time": "2024-08-03T23:40:36.914594+05:00"
  // }

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
                <p className="name">{item.driver_data.fullName}</p>
                {renderUserHeader()}
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
              destroyPopupOnHide={true}
              onOpenChange={handleOpenMenu}
              className="drawer-header__settings"
            >
              <div className="card__dots cursor-pointer">
                <Space>
                  <img src="/img/card/dots.svg" alt="dots" />
                </Space>
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
                {item.driver_data.phone_number}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/car.svg" alt="" />
                <span>Тип машины</span>
              </div>
              <div className="card__item--value">
                {item.driver_data.car_data_get.model}
              </div>
            </div>
            {pagename === 'track' && (
              <div className="card__item">
                <div className="card__item--label">
                  <img src="/img/card/rating.svg" alt="" />
                  <span>Рейтинг</span>
                </div>
                <div className="card__item--value">{item.rate.rate_avg}</div>
              </div>
            )}
            {['track', 'report', 'stock'].includes(pagename) && (
              <div className="card__item">
                <div className="card__item--label">
                  <img src="/img/card/book.svg" alt="" />
                  <span>Компания</span>
                </div>
                <div className="card__item--value">
                  {item.company_data.name}
                </div>
              </div>
            )}
            {['report', 'lead', 'stock'].includes(pagename) && (
              <div className="card__item">
                <div className="card__item--label">
                  <img src="/img/card/date.svg" alt="" />
                  {pagename === 'report' && (
                    <span>Время последней обработки</span>
                  )}
                  {pagename === 'lead' && <span>Дата регистрации</span>}
                  {pagename === 'stock' && <span>Активность водителя</span>}
                </div>
                <div className="card__item--value">16.05.2024 15:00</div>
              </div>
            )}
            <div className="card__item card__item--comment">
              <div className="card__item--label">
                <img src="/img/card/comment.svg" alt="" />
                <span>Комментарий</span>
              </div>
              <div className="card__item--value">{item?.comment}</div>
            </div>
            {pagename === 'stock' && (
              <div className="card__item">
                <div className="card__item--label">
                  <img src="/img/card/loading.svg" alt="" />
                  <span>Статус фотоотчета</span>
                </div>
                <div className="card__item--value card__item--value-status">
                  <span className="dot-live"></span>
                  фото отчет отправлен
                </div>
              </div>
            )}
          </div>
          {pagename === 'report' && (
            <div className="card__bottom">
              <button className="card__bottom--btn">
                <span className="ml-5">Запросить</span>
              </button>
            </div>
          )}
          {pagename === 'lead' && (
            <div className="card__bottom">
              <button className="card__bottom--btn">
                <img src="/img/card/location.svg" alt="" />
                <span className="ml-5">Показать последнюю активность</span>
              </button>
            </div>
          )}
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

export default ContentCard;
