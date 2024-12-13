import ContentHeader from "../../ui/ContentHeader";
import { useParams } from "react-router-dom";
import CompanyDriverCard from "./CompanyDriverCard";
import EmptyCard from "../../ui/EmptyCard";
import { useDriver } from "../driver/useDriver";

export default function CompanyDrivers() {
    const params = useParams();
    const { drivers } = useDriver();
  return (
    <div className="content">
    <div className="content__header">
      <ContentHeader
        pagename={"Компании (" + params.name + ")"}
        hasAddCompanyDriverButton
      />
    </div>
   
    <div className="content__main">
      <div className="content__cards">
        <div className="content__row">
        {drivers?.results?.length > 0 ? (
              (drivers?.results || []).map((item: { id: string }) => (
                <CompanyDriverCard
                  key={item.id}
                  item={item}
                  pagename="track"
                 
                
                />
              ))
            ) : (
              <EmptyCard text="drivers" />
            )}
        </div>
      </div>
    </div>

   
  </div>
  )
}
