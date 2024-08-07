/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown, DropdownProps, MenuProps, message, Popconfirm } from 'antd';
import { useState } from 'react';
import { convertTimestamp } from '../../utils/helpers';
import CreateCommentModal from '../tracks/CreateCommentModal';
import { useReportDelete } from '../tracks/useReportDelete';

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

  // {
  //   "contract": "94ba02d5-0385-4abf-ade4-fcd60833ee8f",
  //   "status_foto_report": "pending",
  //   "updated_at": "2024-08-06T16:37:27.595782+05:00",
  //   "created_at": "2024-08-06T16:37:27.595755+05:00",
  //   "id": "b5ff973f-54fe-4ab0-960d-b60ca8e4d29c",
  //   "contract_data": {
  //     "id": "94ba02d5-0385-4abf-ade4-fcd60833ee8f",
  //     "created_at": "2024-08-06T16:36:56.603781+05:00",
  //     "updated_at": "2024-08-06T16:36:56.603808+05:00",
  //     "company": "7217e6f7-3a4c-4d0f-98dd-16a93a3575d6",
  //     "driver": "07d5bde1-31e0-470a-9286-e0f6738b4906",
  //     "status_contract": "still_on",
  //     "driver_data": {
  //       "id": "07d5bde1-31e0-470a-9286-e0f6738b4906",
  //       "created_at": "2024-08-03",
  //       "updated_at": "2024-08-06",
  //       "passport": null,
  //       "full_name": "Kobe Brayn",
  //       "address": "Tashkent",
  //       "phone_number": "+998997777777",
  //       "card_data": null,
  //       "image": null,
  //       "driver_status": "ready_to_work",
  //       "car_data": "f1e21bfb-46dd-4544-83b6-dd38737a7d4f",
  //       "car_data_get": {
  //         "id": "f1e21bfb-46dd-4544-83b6-dd38737a7d4f",
  //         "created_at": "2024-08-06T16:32:43.552114+05:00",
  //         "updated_at": "2024-08-06T16:32:43.552150+05:00",
  //         "car_model": "Malibu2",
  //         "car_brand": "Chevrolet",
  //         "car_service_type": "sedan",
  //         "manufactured_year": "2024-08-06",
  //         "government_number": "70G906CA",
  //         "tech_passport_number": "1234552",
  //         "issue_date_of_tech_passport": "2024-08-06",
  //         "issue_date_of_power_attorney": "2024-08-06",
  //         "photo_of_tech_passport": null,
  //         "photo_of_tech_passport2": null,
  //         "photo_of_power_attorney": null,
  //         "license_photo_of_driver": null,
  //         "icense_photo_of_driver2": null,
  //         "car_photo": null
  //       },
  //       "last_active_time": "2024-08-06T16:35:25.997227+05:00"
  //     },
  //     "company_data": {
  //       "id": "7217e6f7-3a4c-4d0f-98dd-16a93a3575d6",
  //       "created_at": "2024-08-06T16:36:36.549881+05:00",
  //       "updated_at": "2024-08-06T16:36:36.549923+05:00",
  //       "name": "CocaCola",
  //       "image": null
  //     }
  //   },
  //   "report_comment": "None",
  //   "car_number_by_status": [
  //     {
  //       "non_notified": 0
  //     },
  //     {
  //       "notified": 0
  //     },
  //     {
  //       "pending": 2
  //     },
  //     {
  //       "rejected": 0
  //     },
  //     {
  //       "sent": 0
  //     },
  //     {
  //       "confirmed": 0
  //     }
  //   ],
  //   "rate": {
  //     "rate__avg": null
  //   }
  // },

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
                  {item?.contract_data.driver_data?.fullName}
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
                {item?.contract_data.driver_data?.phone_number}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/car.svg" alt="" />
                <span>Тип машины</span>
              </div>
              <div className="card__item--value">
                {item?.contract_data.driver_data?.car_data_get.model}
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
