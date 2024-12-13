/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import {
  Dropdown,
  DropdownProps,
  MenuProps,
  message,
  Popconfirm,
  Spin,
} from 'antd';
import { useState } from 'react';
import { REPORT_PHOTO_STATUS } from '../../utils/constants';
import { convertTimestamp } from '../../utils/helpers';
import CreateCommentModal from '../tracks/CreateCommentModal';
import { useReportDelete } from '../tracks/useReportDelete';
import { useUpdateReportStatus } from './useUpdateReportStatus';
import ReportAcceptModal from './ReportAcceptModal';
import ReportCommentModal from './ReportCommentModal';
import dayjs from 'dayjs';

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
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenReportCommentModal, setOpenReportCommentModal] = useState(false);
  const { updateReportStatus, isLoadingUpdateReportStatus } =
    useUpdateReportStatus();

  const onChangeReportStatus = (status: string) => {
    updateReportStatus(
      { status_foto_report: status, id: item?.id },
      {
        onSuccess: () => {
          if (status == 'confirmed' || status == 'photo_report_rejected') {
            setOpenModal(false);
            setOpenReportCommentModal(true);
          }
        },
      },
    );
  };

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
                <p className="name">{item?.contract?.driver?.full_name}</p>
                {item?.rate && (
                  <p className="rate">
                    <span>{item?.rate.toFixed(1)}</span>
                    <img
                      src={
                        item?.contract?.driver?.image || '/img/card/star.svg'
                      }
                      alt="rate"
                    />
                  </p>
                )}
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
                {item?.contract?.driver?.phone_number}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/car.svg" alt="" />
                <span>Тип машины</span>
              </div>
              <div className="card__item--value">
                {item?.contract?.driver?.car_data?.car_model}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/book.svg" alt="" />
                <span>Компания</span>
              </div>
              <div className="card__item--value">
                {item?.contract?.company?.name}
              </div>
            </div>
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/date.svg" alt="" />
                <span>Время последней обработки</span>
              </div>
              <div className="card__item--value">
                {item?.last_processing_time &&
                  dayjs(item?.last_processing_time).format('YYYY.DD.MM HH:MM')}
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
                <span>Статус фотоотчета</span>
              </div>
              <div
                className="card__item--value card__item--value-status"
                style={{
                  backgroundColor:
                    REPORT_PHOTO_STATUS[item?.status_foto_report]?.color,
                }}
              >
                <span className="dot-live mr-5"></span>
                {REPORT_PHOTO_STATUS[item?.status_foto_report]?.value}
              </div>
            </div>
          </div>
          {['photo_report_sent', 'confirmed', 'photo_report_rejected'].includes(
            item?.status_foto_report,
          ) && (
            <button
              className="card__bottom--btn"
              onClick={() => setOpenModal(true)}
            >
              <span className="ml-5">Посмотреть</span>
            </button>
          )}
          {['not_notified'].includes(item?.status_foto_report) && (
            <button
              disabled={isLoadingUpdateReportStatus}
              className="card__bottom--btn"
              onClick={() => onChangeReportStatus('notified')}
            >
              {isLoadingUpdateReportStatus && <Spin size="small" />}
              <span className="ml-5">Запросить</span>
            </button>
          )}
          {['notified'].includes(item?.status_foto_report) && (
            <button
              className="card__bottom--btn"
              disabled={
                new Date().getDate() - new Date(item?.updated_at).getDate() < 3
              }
              onClick={() => window.open(item?.contract?.driver?.phone_number)}
            >
              <span className="ml-5">
                {new Date().getDate() - new Date(item?.updated_at).getDate() > 3
                  ? 'Позвонить'
                  : 'Запросить'}
              </span>
            </button>
          )}
        </div>
      </div>
      <ReportAcceptModal
        updateReportPhotoStatus={onChangeReportStatus}
        isLoading={isLoadingUpdateReportStatus}
        photo_control={item?.photo_control}
        status={item?.status_foto_report}
        driverName={item?.contract?.driver?.full_name}
        open={isOpenModal}
        onClose={() => setOpenModal(false)}
      />
      <ReportCommentModal
        driverId={item?.contract?.driver?.id}
        id={item.id}
        open={isOpenReportCommentModal}
        onClose={() => setOpenReportCommentModal(false)}
      />
    </>
  );
}

export default ReportContentCard;
