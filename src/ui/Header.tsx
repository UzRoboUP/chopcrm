/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dropdown, DropdownProps, Input } from 'antd';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

function Header() {
  const { userData } = useUser();
  const [searchParam, setSearchParam] = useSearchParams();
  const param = new URLSearchParams(searchParam.toString());
  const [isOpenNotification, setOpenNotification] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(`wss://crmapi.leetcode.uz/ws/chat/message/`);

  //   // When the connection is opened
  //   socket.onopen = () => {
  //     console.log('Connected to the WebSocket server');
  //     setIsConnected(true);
  //   };

  //   // When a message is received from the server
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('WSDATA: ', data);

  //     /* eslint-disable no-debugger */
  //     debugger;
  //     if (data.type === 'notification') {
  //       setNotifications((prev) => [...prev, data.message]);
  //     }
  //   };

  //   // When the connection is closed
  //   socket.onclose = () => {
  //     console.log('Disconnected from the WebSocket server');
  //     setIsConnected(false);
  //   };

  //   // Clean up when the component is unmounted
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    param.set('search', e.target.value);
    setSearchParam(param);
  };

  const notificationItems = [
    ...((notifications || []).length
      ? notifications.map((item) => ({
          label: <small className="pb-0 pt-0">{item.message}</small>,
          key: 'id-' + item.id,
        }))
      : []),
  ];

  const handleOpenNotification: DropdownProps['onOpenChange'] = (
    nextOpen,
    info,
  ) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenNotification(nextOpen);
    }
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
                <Input
                  type="text"
                  placeholder="Поиск"
                  onChange={onSearch}
                  value={`${searchParam.get('search') ? searchParam.get('search') : ''}`}
                />
              </div>
              <div className="header__actions">
                <Dropdown
                  menu={{
                    items: notificationItems,
                    selectable: false,
                    defaultSelectedKeys: [''],
                  }}
                  placement="bottom"
                  trigger={['click']}
                  arrow={{ pointAtCenter: true }}
                  open={isOpenNotification}
                  destroyPopupOnHide={true}
                  onOpenChange={handleOpenNotification}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <p className="ml-0">
                      <img
                        src={`/img/header/${notifications?.length ? 'notification' : 'notification-off'}.svg`}
                        alt="Notification Icon"
                      />
                    </p>
                  </a>
                </Dropdown>
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
