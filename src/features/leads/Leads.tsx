import ContentCard from "../../ui/ContentCard";

function Leads() {
  return (
    <div className="content">
      <div className="content__header">
      </div>
      <div className="content__report">
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            <div className="content__col">
              <ContentCard pagename='lead' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;
