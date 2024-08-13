import StatusCard from './StatusCard';

export default function StockStatus({
  reportsCount,
}: {
  reportsCount: {
    pending: string;
    rejected: string;
    confirmed: string;
  }[];
}) {
  return (
    <>
      <StatusCard
        text="Подтвержден"
        count={reportsCount?.[0]?.confirmed}
        color="#30B0C7"
      />
      <StatusCard
        text="Отклонен"
        count={reportsCount?.[2]?.rejected}
        color="#FF2800"
      />
      <StatusCard
        text="В ожидании"
        count={reportsCount?.[1]?.pending}
        color="#FF9500"
      />
    </>
  );
}
