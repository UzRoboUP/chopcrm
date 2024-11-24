import { Button, Spin } from 'antd';
import Modal from '../../ui/Modal';

export default function AcceptStockModal({
  isOpenModal,
  onCloseModal,
  onAccept,
  isLoading,
}: {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onAccept: () => void;
  isLoading: boolean;
}) {
  return (
    <Modal
      width="middle"
      title=""
      open={isOpenModal}
      onCancel={() => onCloseModal()}
      closeIcon={true}
    >
      <div className="stock-accept-title">
        Чтобы подтвердить отправьте <br />
        уведомление водителям
      </div>
      <div className="d-flex justify-center">
        <Button disabled={isLoading} onClick={onAccept}>
          {isLoading ? (
            <>
              <Spin size="small" /> OK
            </>
          ) : (
            'OK'
          )}
        </Button>
      </div>
    </Modal>
  );
}
