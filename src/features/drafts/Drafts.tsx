import ContentHeader from "../../ui/ContentHeader";

export default function Drafts() {
  return (
    <div className="content">
    <div className="content__header">
      <ContentHeader
        pagename="Черновики"
        hasBrand={true}
        hasModel={true}
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
