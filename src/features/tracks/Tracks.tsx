/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import TrackContentCard from './TrackContentCard';
import UpdateDataModal from './UpdateDataModal';
import { useTrack } from './useTrack';
import { useTracks } from './useTracks';
function Tracks() {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentDataId, setCurrentDataId] = useState('');
  const { data, isLoading } = useTracks();

  const { retrieveData, isLoadingData } = useTrack(currentDataId);

  console.log('track: ', retrieveData);

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader
          pagename="Отслеживание"
          hasBrand={true}
          hasModel={true}
          hasCompany={true}
          hasPhone={true}
        />
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
