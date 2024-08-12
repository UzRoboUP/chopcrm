/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import TrackContentCard from '../tracks/TrackContentCard';
import { useTracks } from '../tracks/useTracks';
function Operator() {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useTracks();

  if (isLoading && !Object.keys(data || {})?.length) {
    return;
  }

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader pagename="track" />
      </div>
      <div className="content__report"></div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.results?.length > 0 ? (
              (data?.results || []).map((item: { id: string }) => (
                <TrackContentCard
                  key={item.id}
                  item={item}
                  pagename="track"
                  onEdit={() => {
                    setCurrentDataId('');
                    setOpenEditModal(true);
                    setTimeout(() => setCurrentDataId(item.id), 0);
                  }}
                />
              ))
            ) : (
              <EmptyCard text="operator" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Operator;
