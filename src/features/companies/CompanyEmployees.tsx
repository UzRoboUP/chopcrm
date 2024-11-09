import ContentHeader from '../../ui/ContentHeader';
import { useParams } from 'react-router-dom';
import { useCompanyEmployees } from './useCompanyEmployees';
import CompanyEmployeesCard from './CompanyEmployeesCard';
import EmptyCard from '../../ui/EmptyCard';

export default function CompanyEmployees() {
  const params = useParams();
  const { data } = useCompanyEmployees();
  console.log(data);

  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader pagename={'Компании (' + params.name + ')'}  />
      </div>

      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {data?.results?.length > 0 ? (
              (data?.results || []).map((item: { id: string }) => (
                <CompanyEmployeesCard
                  key={item.id}
                  item={item}
                  pagename={'employee'}
                  onEdit={() => {
                    // setCurrentDataId('');
                    // setOpenEditModal(true);
                    // setTimeout(() => setCurrentDataId(item.id), 0);
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
  );
}
