function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__desc">
        <h1 className="dashboard__title">Здравствуйте, Shaxlo Oripova</h1>
        <p className="dashboard__text">Добро пожаловать в <span style={{ color: '#FF2800' }}>CHOP ANALYTICS</span></p>
      </div>
      <div className="dashboard__row">
        <div className="dashboard__col">
          <div className="dashboard__boxes">
            <div className="dashboard__box box-dashboard">
              <div className="box-dashboard__head">
                <h3 className="box-dashboard__title">Водители</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                  <path d="M1 4.26667L3.57065 6.38365C3.74038 6.52347 3.95433 6.6 4.17527 6.6H14.8247C15.0457 6.6 15.2596 6.52347 15.4293 6.38365L18 4.26667M4.30556 9.86667H4.315M14.6944 9.86667H14.7039M5.87395 1H13.1261C13.8039 1 14.4298 1.35893 14.766 1.94054L17.5023 6.67252C17.8284 7.23663 18 7.87503 18 8.52481V14.0667C18 14.5821 17.5772 15 17.0556 15H16.1111C15.5895 15 15.1667 14.5821 15.1667 14.0667V13.1333H3.83333V14.0667C3.83333 14.5821 3.41049 15 2.88889 15H1.94444C1.42285 15 1 14.5821 1 14.0667V8.52481C1 7.87503 1.17157 7.23663 1.49775 6.67252L4.23393 1.94054C4.57023 1.35893 5.1961 1 5.87395 1ZM4.77778 9.86667C4.77778 10.1244 4.56635 10.3333 4.30556 10.3333C4.04476 10.3333 3.83333 10.1244 3.83333 9.86667C3.83333 9.60897 4.04476 9.4 4.30556 9.4C4.56635 9.4 4.77778 9.60897 4.77778 9.86667ZM15.1667 9.86667C15.1667 10.1244 14.9552 10.3333 14.6944 10.3333C14.4337 10.3333 14.2222 10.1244 14.2222 9.86667C14.2222 9.60897 14.4337 9.4 14.6944 9.4C14.9552 9.4 15.1667 9.60897 15.1667 9.86667Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="box-dashboard__count">120</div>
              <div className="box-dashboard__line"></div>
            </div>
            <div className="dashboard__box box-dashboard">
              <div className="box-dashboard__head">
                <h3 className="box-dashboard__title">Лиды</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                  <path d="M1 4.26667L3.57065 6.38365C3.74038 6.52347 3.95433 6.6 4.17527 6.6H14.8247C15.0457 6.6 15.2596 6.52347 15.4293 6.38365L18 4.26667M4.30556 9.86667H4.315M14.6944 9.86667H14.7039M5.87395 1H13.1261C13.8039 1 14.4298 1.35893 14.766 1.94054L17.5023 6.67252C17.8284 7.23663 18 7.87503 18 8.52481V14.0667C18 14.5821 17.5772 15 17.0556 15H16.1111C15.5895 15 15.1667 14.5821 15.1667 14.0667V13.1333H3.83333V14.0667C3.83333 14.5821 3.41049 15 2.88889 15H1.94444C1.42285 15 1 14.5821 1 14.0667V8.52481C1 7.87503 1.17157 7.23663 1.49775 6.67252L4.23393 1.94054C4.57023 1.35893 5.1961 1 5.87395 1ZM4.77778 9.86667C4.77778 10.1244 4.56635 10.3333 4.30556 10.3333C4.04476 10.3333 3.83333 10.1244 3.83333 9.86667C3.83333 9.60897 4.04476 9.4 4.30556 9.4C4.56635 9.4 4.77778 9.60897 4.77778 9.86667ZM15.1667 9.86667C15.1667 10.1244 14.9552 10.3333 14.6944 10.3333C14.4337 10.3333 14.2222 10.1244 14.2222 9.86667C14.2222 9.60897 14.4337 9.4 14.6944 9.4C14.9552 9.4 15.1667 9.60897 15.1667 9.86667Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="box-dashboard__count">150</div>
              <div className="box-dashboard__line"></div>
            </div>
            <div className="dashboard__box box-dashboard">
              <div className="box-dashboard__head">
                <h3 className="box-dashboard__title">Акции</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                  <path d="M1 4.26667L3.57065 6.38365C3.74038 6.52347 3.95433 6.6 4.17527 6.6H14.8247C15.0457 6.6 15.2596 6.52347 15.4293 6.38365L18 4.26667M4.30556 9.86667H4.315M14.6944 9.86667H14.7039M5.87395 1H13.1261C13.8039 1 14.4298 1.35893 14.766 1.94054L17.5023 6.67252C17.8284 7.23663 18 7.87503 18 8.52481V14.0667C18 14.5821 17.5772 15 17.0556 15H16.1111C15.5895 15 15.1667 14.5821 15.1667 14.0667V13.1333H3.83333V14.0667C3.83333 14.5821 3.41049 15 2.88889 15H1.94444C1.42285 15 1 14.5821 1 14.0667V8.52481C1 7.87503 1.17157 7.23663 1.49775 6.67252L4.23393 1.94054C4.57023 1.35893 5.1961 1 5.87395 1ZM4.77778 9.86667C4.77778 10.1244 4.56635 10.3333 4.30556 10.3333C4.04476 10.3333 3.83333 10.1244 3.83333 9.86667C3.83333 9.60897 4.04476 9.4 4.30556 9.4C4.56635 9.4 4.77778 9.60897 4.77778 9.86667ZM15.1667 9.86667C15.1667 10.1244 14.9552 10.3333 14.6944 10.3333C14.4337 10.3333 14.2222 10.1244 14.2222 9.86667C14.2222 9.60897 14.4337 9.4 14.6944 9.4C14.9552 9.4 15.1667 9.60897 15.1667 9.86667Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="box-dashboard__count">20</div>
              <div className="box-dashboard__line"></div>
            </div>
          </div>
        </div>
        <div className="dashboard__col"></div>
      </div>
    </div>
  );
}

export default Dashboard;
