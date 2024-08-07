import { useUser } from '../features/authentication/useUser';

function Header() {
  const { userData } = useUser();
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
                <input type="text" placeholder="Поиск" />
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
