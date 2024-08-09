/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentCard from '../../services/tracks/TrackContentCard';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import UpdateDataModal from './UpdateDataModal';
import { useTrack } from './useTrack';
import { useTracks } from './useTracks';
function Tracks() {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useTracks();

  const { retrieveData, isLoadingData } = useTrack(currentDataId);

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
                <ContentCard
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
              <EmptyCard text="tracks" />
            )}
          </div>
        </div>
      </div>
      <UpdateDataModal
        pagename="track"
        retrieveData={retrieveData}
        isOpenModal={isOpenEditModal}
        isLoadingData={isLoadingData}
        onCloseModal={() => setOpenEditModal(false)}
      />
    </div>
  );
}

export default Tracks;
