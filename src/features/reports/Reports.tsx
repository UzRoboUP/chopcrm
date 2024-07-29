import { useState } from "react";
import ContentCard from "../../ui/ContentCard";
import Modal from "../../ui/Modal";
import { DatePicker } from "antd";

function Reports() {

  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div className="content">
      <div className="content__header">
        <button onClick={() => setOpenModal(true)}>Open modal</button>
      </div>
      <div className="content__report">
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            <div className="content__col">
              <ContentCard pagename='report' />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={
          <h2>Передвижение водителя</h2>
        }
        width="middle"
        open={isOpenModal}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusamus unde, eveniet neque quibusdam, asperiores libero sunt assumenda architecto porro non alias mollitia! Mollitia nobis beatae officiis illum, tenetur voluptate?
        <br />
        <DatePicker />
        <br />
        <div className="d-flex justify-center">
          <button className="btn btn-decline" >Отклонить</button>
          <button className="btn btn-confirm">Подтвердить</button>
        </div>

      </Modal>
    </div>
  );
}

export default Reports;
