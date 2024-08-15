import { useSearchParams } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { Input } from 'antd';

function Header() {
  const { userData } = useUser();
  const [searchParam, setSearchParam] = useSearchParams();
  const param = new URLSearchParams(searchParam.toString());

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    param.set('search', e.target.value);
    setSearchParam(param);
  };

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__row">
          <div className="header__col">
            <span></span>
          </div>
          <div className="header__col">
            <div className="header__content">
              <div className="header__search">
                <img src="/img/header/search.svg" alt="Search Icon" />
                <Input type="text" placeholder="Поиск" onChange={onSearch}   value={`${searchParam.get('search') ? searchParam.get('search') : ''}`}/>
              </div>
              <div className="header__actions">
                <p>
                  <img
                    src="/img/header/notification.svg"
                    alt="Notification Icon"
                  />
                </p>
                <p>
                  <img src="/img/header/global.svg" alt="Globe Icon" />
                </p>
                <div className="header__profile">
                  <p>
                    <img
                      src={userData?.image || '/img/header/empty-avatar.svg'}
                      alt="Profile Picture"
                    />
                  </p>

                  <div className="header__profile--details">
                    <div className="name">
                      {userData?.first_name || 'unkonw name'}{' '}
                      {userData?.last_name}
                    </div>
                    <div className="role">{userData?.staff_status}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
