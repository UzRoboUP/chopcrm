import StatusCard from './StatusCard';

export default function CompanyStatus({
  reportsCount,
}: {
  reportsCount: {
    approved: string;
    completed: string;
    in_process: string;
    active: string;
  }[];
}) {
  return (
    <>
      <StatusCard
        text="Активные"
        count={reportsCount?.[0]?.active}
        color="#30B0C7"
        param="active"
        paramStatus="company_status"
      />
      <StatusCard
        text="В процессе  одобрение"
        count={reportsCount?.[1]?.in_process}
        color="#FF9500"
        param="in_process"
        paramStatus="company_status"
      />
      <StatusCard
        text="Одобренные"
        count={reportsCount?.[2]?.approved}
        color="#007AFF"
        param="approved"
        paramStatus="company_status"
      />
      <StatusCard
        text="Отклоненные"
        count={reportsCount?.[3]?.completed}
        color="#FF0000"
        param="completed"
        paramStatus="company_status"
      />
    </>
  );
}
