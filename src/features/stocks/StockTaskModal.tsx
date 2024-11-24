import { Button, Form } from 'antd';
import Modal from '../../ui/Modal';
import { useStockTask } from './useStock';
import { useSearchParams } from 'react-router-dom';
// import { useContext } from 'react';
// import { StockTaskContext } from '../../context/StockTaskContext';
export type StaffType = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: string;
};
function StockTaskModal({
  isOpenModal,
  onCloseModal,
}: {
  isOpenModal: boolean;
  onCloseModal: () => void;
}) {
  const { tasks, isLoading } = useStockTask(isOpenModal);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  // const { setStockTaskText } = useContext(StockTaskContext);
  const onChange = (a: string, id: string) => {
    // setStockTaskText(a);
    params.set('task_id', id);
    setSearchParams(params);
    onCloseModal();
  };
  return (
    <Modal
      title={``}
      width="large"
      open={isOpenModal}
      onCancel={() => onCloseModal()}
      loading={isLoading}
    >
      <Form>
        <div className="mt-20" style={{ padding: '0px 20px' }}>
          <h1 className="task__modal__title">Все задания</h1>
          <div className="task__modal__row">
            {tasks &&
              tasks.map((item: { id: string; task: string }) => (
                <div
                  key={item?.id}
                  className="task__modal__item"
                  onClick={() => onChange(item?.task, item?.id)}
                >
                  {item?.task}
                </div>
              ))}
          </div>
          <div className="w-100 d-flex justify-end align-end">
            <Button
              className="mt-5"
              onClick={() => onCloseModal()}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #21529C',
                width: '',
                height: 40,
                color: 'black',
              }}
            >
              Отменить
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default StockTaskModal;
