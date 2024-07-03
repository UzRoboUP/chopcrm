import ContentCard from "../../ui/ContentCard";
import ContentHeader from '../../ui/ContentHeader';
function Tracking() {

  return (
    <div className="content">
     <div className="content__header">
        <ContentHeader pageName="Отслеживание" />
      </div>
      <div className="content__report">
      </div>
      <div className="content__main">
        <div className="content__cards">
          <ContentCard pagename='tracking' />
        </div>
      </div>
    </div>
  );
}

export default Tracking;
