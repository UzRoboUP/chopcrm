import ContentHeader from "../../ui/ContentHeader";


export default function CustomerRequests() {
  return (
    <div className="content">
    <div className="content__header">
      <ContentHeader
        pagename="Заявки клиентов"
        hasPhone={true}
      />
    </div>
    <div className="content__report"></div>
    <div className="content__main">
      <div className="content__cards">
        <div className="content__row">
           .......
        </div>
      </div>
    </div>
  </div>
  )
}
