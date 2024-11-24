export const STOCK_STATUS = {
    in_process: {
      color: '#FF9500',
      value: [
        {
          key: '1',
          label: (
            <p className="d-flex align-center">
              <img src="/img/card/menu/destination.svg" alt="" />
              <span className="card__menu--text ml-10">Место нахождения</span>
            </p>
          ),
          className: 'mb-4',
        },
        {
          key: '2',
          label: (
            <p
              onClick={() => {
                setOpenMenu(false);
                setOpenCommentModal(true);
              }}
              className="d-flex align-center"
            >
              <img src="/img/card/menu/comment.svg" alt="" />
              <span className="card__menu--text ml-10">Оставить коментарий</span>
            </p>
          ),
          className: 'mb-4',
        },
        {
          key: '3',
          label: (
            <p
              onClick={() => {
                onEdit();
                setOpenMenu(false);
              }}
              className="d-flex align-center"
            >
              <img src="/img/card/menu/edit.svg" alt="" />
              <span className="card__menu--text ml-10">Изменить профиль</span>
            </p>
          ),
          className: 'mb-4',
        },
        {
          key: '4',
          label: (
            <Popconfirm
              placement="top"
              title="Вы уверены, что хотите удалить этот элемент?"
              description="Удалить элемент"
              okText={'Yes'}
              cancelText="No"
              open={popconfirmOpen}
              onConfirm={handleDelete}
              okButtonProps={{
                loading: isLoadingDelete,
                disabled: isLoadingDelete,
              }}
              cancelButtonProps={{
                disabled: isLoadingDelete,
              }}
              onCancel={() => setPopconfirmOpen(false)}
            >
              <p
                onClick={() => setPopconfirmOpen(true)}
                className="d-flex align-center card__menu--label card__menu--label-delete"
              >
                <img src="/img/card/menu/delete.svg" alt="" />
                <span
                  className="card__menu--text ml-10"
                  style={{ color: '#FF2D55' }}
                >
                  Удалить из списка
                </span>
              </p>
            </Popconfirm>
          ),
          className: 'card__menu--label-delete',
        },
      ];
    },
    completed: {
      color: '#FF2800',
      value: 'Откланен',
    },
    active: {
      color: '#30B0C7',
      value: 'Подтвержден',
    },
  } as const;