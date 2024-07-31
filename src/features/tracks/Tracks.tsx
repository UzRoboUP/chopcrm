/* eslint-disable @typescript-eslint/no-unused-vars */
import ContentCard from "../../ui/ContentCard";
import ContentHeader from "../../ui/ContentHeader";
import Spinner from "../../ui/Spinner";
import { useTracks } from "./useTracks";
function Tracks() {

  const { data } = useTracks();

  if (!Object.keys(data || {})?.length) {
    return <Spinner />;
  }

  // { count, current_page, total_pages, results }
  console.log('DATA: ', data);

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader pagename="track" />
      </div>
      <div className="content__report">
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.results?.length > 0 ? (data?.results || []).map((item: { id: string; }) => (
              <ContentCard key={item.id} item={item} pagename='track' />
            )) : <p className="text-center">No data</p>}

          </div>
        </div>
      </div>
    </div >
  );
}


export default Tracks;