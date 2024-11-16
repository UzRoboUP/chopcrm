import ContentHeader from '../../ui/ContentHeader';
import { useParams } from 'react-router-dom';
import { useCompanyEmployees } from './useCompanyEmployees';
import CompanyEmployeesCard from './CompanyEmployeesCard';
import EmptyCard from '../../ui/EmptyCard';
import UpdateContractModal from '../contract/UpdateContractModal';
import { useState } from 'react';
import { useContract } from '../contract/useContract';

export default function CompanyEmployees() {
  const params = useParams();
  const [currentDataId, setCurrentDataId] = useState('');
  const { contractData } = useCompanyEmployees();
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const {retrieveData,isLoadingData}= useContract(currentDataId)
  return (

    <>
     <div className="content">
      <div className="content__header">
        <ContentHeader pagename={'Компании (' + params.name + ')'}  />
      </div>

      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {contractData?.results?.length > 0 ? (
              (contractData?.results || []).map((item: { id: string }) => (
                <CompanyEmployeesCard
                  key={item.id}
                  item={item}
                  pagename={'employee'}
                  onEdit={() => {
                    setCurrentDataId('');
                    setOpenEditModal(true);
                    setTimeout(() => setCurrentDataId(item.id), 0);
                  }}
                />
              ))
            ) : (
              <EmptyCard text="drivers" />
            )}
          </div>
        </div>
      </div>
    </div>
        

    <UpdateContractModal
      retrieveData={retrieveData}
      isOpenModal={isOpenEditModal}
      isLoadingData={isLoadingData}
      onCloseModal={() => setOpenEditModal(false)}
    />
    </>
   
    
  );
}
