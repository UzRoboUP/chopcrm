import { Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";

function Settings() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = (info) => {
    const newFileList = [...info.fileList];

    // You can also implement file status checks here (e.g., uploading, done, error, removed)

    setFileList(newFileList);
    console.log('fileList', fileList);
  };

  const uploadProps = {
    name: 'files',
    multiple: true,
    fileList: fileList,
    onChange: handleChange,
    beforeUpload: () => false, // Return false to prevent auto uploading
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
  };

  return (
    <div className="content">
      <div className="content__header">
      </div>
      <div className="content__main">
        <div className="content__setting setting">
          <div className="setting__top">
            <div className="setting__image">
              <Upload
                {...uploadProps}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                fileList={fileList}
                onChange={handleChange}
              >
                <img src="/img/upload.svg" alt="" />
              </Upload>
            </div>
            <div className="setting__info">
              <h2 className="setting__title">Фото профиля</h2>
              <p className="setting__text">Мы рекомендуем изображения не менее 1000 x 1000, вы можете загрузить PNG или JPG размером менее 10 МБ</p>
              <button className="setting__btn">Загрузить</button>
            </div>
          </div>
          <div className="setting__bottom">
            <form className="setting__form">
              <div className="setting__form-top">
                <div className="setting__form-item">
                  <label className="setting__form-label d-flex align-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_1780_14082)">
                        <path d="M9 13.3125C9.31066 13.3125 9.5625 13.0607 9.5625 12.75V8.25C9.5625 7.93934 9.31066 7.6875 9 7.6875C8.68934 7.6875 8.4375 7.93934 8.4375 8.25V12.75C8.4375 13.0607 8.68934 13.3125 9 13.3125Z" fill="#1C0D64" />
                        <path d="M9 5.25C9.41421 5.25 9.75 5.58579 9.75 6C9.75 6.41421 9.41421 6.75 9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25Z" fill="#1C0D64" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9ZM9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625Z" fill="#1C0D64" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1780_14082">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="ml-5">Фамилия *</span>
                  </label>
                  <input className="setting__form-input" type="text" placeholder="Введите фамилия" />
                </div>
                <div className="setting__form-item">
                  <label className="setting__form-label">Имя *</label>
                  <input className="setting__form-input" type="text" placeholder="Введите имя" />
                </div>
                <div className="setting__form-item">
                  <label className="setting__form-label">Отчество</label>
                  <input className="setting__form-input" type="text" placeholder="Введите отчество" />
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="703" height="2" viewBox="0 0 703 2" fill="none">
                <path d="M1 1H702.5" stroke="#E5E7EB" strokeLinecap="round" />
              </svg>
              <div className="setting__form-bottom">
                <label className="setting__form-label">Номер телефона:</label>
                <input className="setting__form-input ml-10" type="phone" placeholder="+998()" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
