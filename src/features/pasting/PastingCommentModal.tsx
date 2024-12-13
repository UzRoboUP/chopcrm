import { useState } from 'react';
import Modal from '../../ui/Modal';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { usePastingComment } from './usePastingComment';
import { useUser } from '../authentication/useUser';
export default function PastingCommentModal({
  open,
  onClose,
  id,
  driverId,
}: {
  id: string;
  driverId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(1);
  const { commentPasting, isLoadingUpdate } = usePastingComment();
  const { userData } = useUser();

  const handleConfirm = () => {
    commentPasting(
      {
        id,
        rate: rating,
        comment: comment,
        by_whom: userData?.id,
        to_whom: driverId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };
  return (
    <Modal title="" width="small" open={open} onCancel={() => onClose()}>
      <div>
        <div className="d-flex flex-column justify-center mb-5">
          <Typography.Title level={5}>Оставить комментарии</Typography.Title>
          <TextArea
            style={{ width: '100%', float: 'inline-end', height: 60 }}
            defaultValue={comment}
            value={comment}
            disabled={isLoadingUpdate}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="mt-20">
          <Typography.Title level={5}> Поставить оценку </Typography.Title>
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={star <= rating ? '#FFE602' : 'none'}
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="30"
              height="30"
              // onMouseEnter={() => setHover(star)}
              // onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              style={{ cursor: 'pointer' }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        {/* <p>Ваш рейтинг: {rating}</p> */}
        <div className="d-flex justify-center mt-20">
          <button
            className="btn btn-decline"
            onClick={() => onClose()}
            disabled={isLoadingUpdate}
          >
            Отменить
          </button>
          <button
            disabled={isLoadingUpdate}
            className="btn btn-confirm"
            onClick={handleConfirm}
          >
            Добавить
          </button>
        </div>
      </div>
    </Modal>
  );
}
