import ContentHeader from '../../ui/ContentHeader';
import { useParams } from 'react-router-dom';
import StockDriverCard from './StockDriverCard';
import EmptyCard from '../../ui/EmptyCard';
// import { useDriver } from "../driver/useDriver";
import { useCompanyEmployees } from '../companies/useCompanyEmployees';

export default function StockDrivers() {
  const params = useParams();
  const { contractData } = useCompanyEmployees();
  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader
          pagename={'Акции (' + params.name + ')'}
          hasAddStockDriverButton={true}
          carRate={true}
        />
      </div>

      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {contractData?.results?.length > 0 ? (
              (contractData?.results || []).map((item: { id: string }) => (
                <StockDriverCard key={item.id} item={item} pagename="stock" />
              ))
            ) : (
              <EmptyCard text="Акции" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
