/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, GetProp, message, Upload, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { useUser } from '../authentication/useUser';
import { useUpdateSetting } from './useUpdateSetting';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function Settings() {
  const { userData } = useUser();
  const { updateProfile, isLoading } = useUpdateSetting();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState({});

  const handleChange: UploadProps['onChange'] = (info) => {
    console.log(info.file.originFileObj);
    setImageFile(info.file?.originFileObj);
    getBase64(info.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    surname: '',
    image: null,
    phone_number: '',
    staff_status: '',
  });

  console.log('imageFile', imageFile);

  const submit = () => {
    const formData = new FormData();
    formData.append('staff_status', 'operator');
    formData.append('image', imageFile);
    formData.append('first_name', profile.first_name);
    formData.append('last_name', profile.last_name);
    formData.append('surname', profile.surname);
    formData.append('phone_number', profile.phone_number);
    formData.append('id', userData.id);
    updateProfile(formData);
  };

  console.log('userData', userData);

  useEffect(() => {
    setProfile(userData);
  }, []);

  return (
    <div className="content">
      <div className="content__header"></div>
      <div className="content__main">
        <div className="content__setting setting">
          <div className="setting__top">
            <div className="setting__image">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  <img src="/img/upload.svg" alt="" />
                )}
              </Upload>
            </div>
            <div className="setting__info">
              <h2 className="setting__title">Фото профиля</h2>
              <p className="setting__text">
                Мы рекомендуем изображения не менее 1000 x 1000, вы можете
                загрузить PNG или JPG размером менее 10 МБ
              </p>
              <Button
                loading={isLoading}
                onClick={submit}
                disabled={isLoading}
                className="setting__btn"
                style={{
                  borderRadius: 10,
                  background: '#ffd4cc',
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: '150%',
                  letterSpacing: 0.32,
                  padding: '22px 40px',
                }}
              >
                Oбновлять
              </Button>
            </div>
          </div>
          <div className="setting__bottom">
            <form className="setting__form">
              <div className="setting__form-top">
                <div className="setting__form-item">
                  <label className="setting__form-label d-flex align-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1780_14082)">
                        <path
                          d="M9 13.3125C9.31066 13.3125 9.5625 13.0607 9.5625 12.75V8.25C9.5625 7.93934 9.31066 7.6875 9 7.6875C8.68934 7.6875 8.4375 7.93934 8.4375 8.25V12.75C8.4375 13.0607 8.68934 13.3125 9 13.3125Z"
                          fill="#1C0D64"
                        />
                        <path
                          d="M9 5.25C9.41421 5.25 9.75 5.58579 9.75 6C9.75 6.41421 9.41421 6.75 9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25Z"
                          fill="#1C0D64"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9ZM9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625Z"
                          fill="#1C0D64"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1780_14082">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="ml-5">Фамилия *</span>
                  </label>
                  <input
                    className="setting__form-input"
                    type="text"
                    placeholder="Введите фамилия"
                    defaultValue={profile.last_name}
                    onChange={({ target: { value: last_name } }) =>
                      setProfile((prev) => ({ ...prev, last_name }))
                    }
                  />
                </div>
                <div className="setting__form-item">
                  <label className="setting__form-label">Имя *</label>
                  <input
                    className="setting__form-input"
                    type="text"
                    placeholder="Введите имя"
                    defaultValue={profile.first_name}
                    onChange={({ target: { value: first_name } }) =>
                      setProfile((prev) => ({ ...prev, first_name }))
                    }
                  />
                </div>
                <div className="setting__form-item">
                  <label className="setting__form-label">Отчество</label>
                  <input
                    className="setting__form-input"
                    type="text"
                    placeholder="Введите отчество"
                    defaultValue={profile.surname}
                    onChange={({ target: { value: surname } }) =>
                      setProfile((prev) => ({ ...prev, surname }))
                    }
                  />
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="703"
                height="2"
                viewBox="0 0 703 2"
                fill="none"
              >
                <path d="M1 1H702.5" stroke="#E5E7EB" strokeLinecap="round" />
              </svg>
              <div className="setting__form-bottom">
                <label className="setting__form-label">Номер телефона:</label>
                <input
                  className="setting__form-input ml-10"
                  type="phone"
                  placeholder="+998()"
                  defaultValue={profile.phone_number}
                  onChange={({ target: { value: phone_number } }) =>
                    setProfile((prev) => ({ ...prev, phone_number }))
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
