import { Modal as ModalUI, Spin } from 'antd';
import { ReactNode } from 'react';

type ModalProps = {
  title: ReactNode;
  loading?: boolean;
  open: boolean;
  width: 'small' | 'middle' | 'large';
  children: ReactNode;
  onCancel: () => void;
};

function Modal({
  title,
  open = false,
  loading,
  width = 'small',
  onCancel,
  children,
}: ModalProps) {
  const modalWidth = width === 'small' ? 400 : width === 'middle' ? 525 : 780;

  return (
    <ModalUI
      destroyOnClose={true}
      className="modal"
      title={
        <div className="modal__header text-center">
          {title}
          <p style={{ position: 'absolute', right: 30, top: 15, cursor: 'pointer' }} onClick={onCancel}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.9996 13.0496L6.74961 18.2996C6.59961 18.4496 6.42461 18.5246 6.22461 18.5246C6.02461 18.5246 5.84961 18.4496 5.69961 18.2996C5.54961 18.1496 5.47461 17.9746 5.47461 17.7746C5.47461 17.5746 5.54961 17.3996 5.69961 17.2496L10.9496 11.9996L5.69961 6.74961C5.54961 6.59961 5.47461 6.42461 5.47461 6.22461C5.47461 6.02461 5.54961 5.84961 5.69961 5.69961C5.84961 5.54961 6.02461 5.47461 6.22461 5.47461C6.42461 5.47461 6.59961 5.54961 6.74961 5.69961L11.9996 10.9496L17.2496 5.69961C17.3996 5.54961 17.5746 5.47461 17.7746 5.47461C17.9746 5.47461 18.1496 5.54961 18.2996 5.69961C18.4496 5.84961 18.5246 6.02461 18.5246 6.22461C18.5246 6.42461 18.4496 6.59961 18.2996 6.74961L13.0496 11.9996L18.2996 17.2496C18.4496 17.3996 18.5246 17.5746 18.5246 17.7746C18.5246 17.9746 18.4496 18.1496 18.2996 18.2996C18.1496 18.4496 17.9746 18.5246 17.7746 18.5246C17.5746 18.5246 17.3996 18.4496 17.2496 18.2996L11.9996 13.0496Z" fill="#FF2800" />
            </svg>
          </p>
        </div>
      }
      open={open}
      width={modalWidth}
      footer={null}
      closable={false}
      maskClosable={false}
      afterClose={() => { }}
    >
      <div className="modal__body">
        {loading ? <div className='d-flex justify-center mt-20 mb-20'>
          <Spin size="default" />
        </div> : children}
      </div>
    </ModalUI>
  );
}

export default Modal;
