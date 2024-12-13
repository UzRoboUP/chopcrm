import { Button } from 'antd';
import Modal from '../../ui/Modal';
import notImg from '../../../public/no-img.jpg';
import dayjs from 'dayjs';
export default function PastingAcceptModal({
  open,
  onClose,
  status,
  photo_control,
  driverName,
  updatePastingPhotoStatus,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  status: string;
  driverName: string;
  isLoading: boolean;
  updatePastingPhotoStatus: (status: string) => void;
  photo_control: {
    updated_at: string;
    image_right_side: string;
    image_left_side: string;
    image_back_side: string;
    image_front_side: string;
  };
}) {
  return (
    <Modal title="" width="middle" open={open} onCancel={() => onClose()}>
      <div className="pasting-modal-header d-flex justify-between">
        <span>{driverName ? driverName : '...'} </span>
        <span>{dayjs(photo_control?.updated_at).format('DD.MM.YYYY')}</span>
        <span>{dayjs(photo_control?.updated_at).format('HH:mm')}</span>
      </div>
      <div className="pasting-modal-row">
        <div className="pasting-modal-col">
          <img src={photo_control?.image_right_side || notImg} alt="" />
        </div>
        <div className="pasting-modal-col">
          <img src={photo_control?.image_left_side || notImg} alt="" />
        </div>
        <div className="pasting-modal-col">
          <img src={photo_control?.image_back_side || notImg} alt="" />
        </div>
        <div className="pasting-modal-col">
          <img src={photo_control?.image_front_side || notImg} alt="" />
        </div>
      </div>
      {status === 'photo_report_sent' ? (
        <div className="d-flex justify-center mt-10">
          <button
            className="btn btn-decline"
            onClick={() => updatePastingPhotoStatus('photo_report_rejected')}
            disabled={isLoading}
          >
            Отклонить
          </button>
          <button
            disabled={isLoading}
            className="btn btn-confirm"
            onClick={() => updatePastingPhotoStatus('confirmed')}
          >
            Подтвердить
          </button>
        </div>
      ) : (
        <div className="d-flex justify-center mt-10">
          <Button onClick={onClose}>OK</Button>
        </div>
      )}
    </Modal>
  );
}
