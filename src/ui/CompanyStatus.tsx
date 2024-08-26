import StatusCard from './StatusCard';

export default function CompanyStatus({
  reportsCount,
}: {
  reportsCount: {
    non_confirmed: string;
    confirmed: string;
    in_process: string;
    processed: string;
  }[];
}) {
  return (
    <>
      <StatusCard
        text="Активные"
        count={reportsCount?.[1]?.confirmed}
        color="#30B0C7"
        param="confirmed"
        paramStatus="status_client_company"
      />
      <StatusCard
        text="В процессе  одобрение"
        count={reportsCount?.[2]?.in_process}
        color="#FF9500"
        param="in-process"
        paramStatus="status_client_company"
      />
      <StatusCard
        text="Одобренные"
        count={reportsCount?.[3]?.processed}
        color="#007AFF"
        param="processed"
        paramStatus="status_client_company"
      />
      <StatusCard
        text="Отклоненные"
        count={reportsCount?.[0]?.non_confirmed}
        color="#FF0000"
        param="non-confirmed"
        paramStatus="status_client_company"
      />
    </>
  );
}
