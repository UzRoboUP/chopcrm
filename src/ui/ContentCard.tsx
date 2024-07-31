import { Dropdown, DropdownProps, MenuProps, Space } from "antd";
import { useState } from "react";

export type PageNameType = 'track' | 'report' | 'lead' | 'stock';

export type ContentCardProps = {
  item: unknown;
  pagename: PageNameType;
};

function ContentCard({ item, pagename }: ContentCardProps) {
  const [isOpenMenu, setOpenMenu] = useState(false);

  console.log('item', item);
  const itemsMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className="d-flex align-center">
          <img src="/img/card/menu/destination.svg" alt="" />
          <span className="card__menu--text ml-10">Место нахождения</span>
        </p>
      ),
      className: 'mb-4'
    },
    {
      key: '2',
      label: (
        <p className="d-flex align-center">
          <img src="/img/card/menu/comment.svg" alt="" />
          <span className="card__menu--text ml-10">Оставить коментарий</span>
        </p>
      ),
      className: 'mb-4'
    },
    {
      key: '3',
      label: (
        <p className="d-flex align-center">
          <img src="/img/card/menu/edit.svg" alt="" />
          <span className="card__menu--text ml-10">Изменить профиль</span>
        </p>
      ),
      className: 'mb-4'
    },
    {
      key: '4',
      label: (
        <p className="d-flex align-center card__menu--label card__menu--label-delete">
          <img src="/img/card/menu/delete.svg" alt="" />
          <span className="card__menu--text ml-10" style={{ color: '#FF2D55' }}>Удалить из списка</span>
        </p>
      ),
      className: 'card__menu--label-delete'
    },
  ];

  const handleOpenMenu: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenMenu(nextOpen);
    }
  };
  console.log(pagename);

  const renderUserHeader = () => {
    switch (pagename) {
      case 'track':
        return <p className="rate"><span>Сегодня 12:40</span></p>;
      case 'report':
      case 'stock':
        return <p className="rate"><span>4.5</span><img src="/img/card/star.svg" alt="rate" /></p>;
      default:
        return null;
    }
  };

  return (
    <div className="content__col">
      <div className="content__card card">
        <div className="card__header">
          <div className="card__user">
            <p className="card__user--avatar">
              <img src="/img/card/empty-avatar.svg" alt="avatar" />
            </p>
            <div className="card__user--info">
              <p className="name">Jahongir Umirzaqov</p>
              {renderUserHeader()}
            </div>
          </div>
          <Dropdown
            menu={{
              items: itemsMenu,
              selectable: false,
              defaultSelectedKeys: [''],
            }}
            placement="bottom"
            trigger={['click']}
            arrow={{ pointAtCenter: true }}
            open={isOpenMenu}
            destroyPopupOnHide={true}
            onOpenChange={handleOpenMenu}
            className="drawer-header__settings"
          >
            <div className="card__dots cursor-pointer">
              <Space>
                <img src="/img/card/dots.svg" alt="dots" />
              </Space>
            </div>
          </Dropdown>
        </div>
        <div className="card__items">
          <div className="card__item">
            <div className="card__item--label">
              <img src="/img/card/phone.svg" alt="" />
              <span>Телефон</span>
            </div>
            <div className="card__item--value">+998 91 335 09 15</div>
          </div>
          <div className="card__item">
            <div className="card__item--label">
              <img src="/img/card/car.svg" alt="" />
              <span>Тип машины</span>
            </div>
            <div className="card__item--value">Nexia 2</div>
          </div>
          {pagename === 'track' &&
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/rating.svg" alt="" />
                <span>Рейтинг</span>
              </div>
              <div className="card__item--value">5</div>
            </div>
          }
          {['track', 'report', 'stock'].includes(pagename) &&
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/book.svg" alt="" />
                <span>Компания</span>
              </div>
              <div className="card__item--value">Coca Cola</div>
            </div>}
          {['report', 'lead', 'stock'].includes(pagename) &&
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/date.svg" alt="" />
                {pagename === 'report' && <span>Время последней обработки</span>}
                {pagename === 'lead' && <span>Дата регистрации</span>}
                {pagename === 'stock' && <span>Активность водителя</span>}
              </div>
              <div className="card__item--value">16.05.2024 15:00</div>
            </div>
          }
          <div className="card__item card__item--comment">
            <div className="card__item--label">
              <img src="/img/card/comment.svg" alt="" />
              <span>Комментарий</span>
            </div>
            <div className="card__item--value">Проехать с улицы Алишер навои
              до улицы фараби 15:00 - 16:00 20.05.2024</div>
          </div>
          {pagename === 'stock' &&
            <div className="card__item">
              <div className="card__item--label">
                <img src="/img/card/loading.svg" alt="" />
                <span>Статус фотоотчета</span>
              </div>
              <div className="card__item--value card__item--value-status">
                <span className="dot-live"></span>
                фото отчет
                отправлен</div>
            </div>
          }
        </div>
        {pagename === 'report' &&
          <div className="card__bottom">
            <button className="card__bottom--btn">
              <span className="ml-5">Запросить</span>
            </button>
          </div>
        }
        {pagename === 'lead' &&
          <div className="card__bottom">
            <button className="card__bottom--btn">
              <img src="/img/card/location.svg" alt="" />
              <span className="ml-5">Показать последнюю активность</span>
            </button>
          </div>
        }
      </div >
    </div>
  );
}

export default ContentCard;
