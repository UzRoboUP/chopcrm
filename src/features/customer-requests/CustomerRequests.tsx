import ClientStatus from '../../ui/ClientStatus';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import Spinner from '../../ui/Spinner';
import { useClients } from '../client/useClients';
import CustomRequestContentCard from './CustomRequestContentCard';
// import { useCustomRequest } from './useCustomRequest';

export default function CustomerRequests() {
  const { clientsList, isLoading, clientsListCount } = useClients();
  console.log(clientsListCount);
  
  if (isLoading) {
    return <Spinner />;
  }
  const CustomerRequestReports = () => {
    if (isLoading) {
      return <Spinner />;
    }

    const reportItems =clientsList || [];

    if (reportItems.length > 0) {
      return reportItems.map((item: { id: string }) => (
        <CustomRequestContentCard key={item.id} item={item} />
      ));
    }
    
    return <EmptyCard text="tracks" />;
  };
  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader pagename="Заявки клиентов" hasPhone={true} />
      </div>
      <div className="content__report content__report__container">
        <ClientStatus reportsCount={clientsListCount} />
      </div>
      <div className="content__report"></div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">{CustomerRequestReports()}</div>
        </div>
      </div>
    </div>
  );
}
