import StatusCard from './StatusCard';

export default function ClientStatus({
  reportsCount,
}: {
  reportsCount: {
    processed : string;
    not_processed: string;
  };
}) {
  console.log(reportsCount);
  
  return (
    <>
      <StatusCard
        text="Обработано"
        count={reportsCount?.processed}
        color="#30B0C7"
        param='processed'
        paramStatus='client_user_status'
      />
      <StatusCard
        text="Не обработано"
        count={reportsCount?.not_processed}
        color="#FF2800"
        param='not_processed'
         paramStatus='client_user_status'
      />
    </>
  );
}
