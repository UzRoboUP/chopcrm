import StatusCard from './StatusCard';

export default function PostingStatus({
  reportsCount,
}: {
  reportsCount: {
    notified: string;
    non_notified: string;
    pending: string;
    rejected: string;
    sent: string;
    confirmed: string;
    not_assigned: string;
  }[];
}) {
  return (
    <>
      <StatusCard
        text="Не назначено"
        count={reportsCount?.[4]?.not_assigned}
        color="#C17272"
        param='not_assigned'
         paramStatus='status_pasting'
      />
      <StatusCard
        text="В ожидании"
        count={reportsCount?.[0]?.pending}
        color="#FF9500"
        param='pending'
        paramStatus='status_pasting'
      />
      <StatusCard
        text="Отправлен фотоотчет"
        count={reportsCount?.[2]?.sent}
        color="#007AFF"
        param='photo_report_sent'
         paramStatus='status_pasting'
      />
      <StatusCard
        text="Отклонен фотоотчет"
        count={reportsCount?.[1]?.rejected}
        color="#FF0000"
        param='photo_report_rejected'
         paramStatus='status_pasting'
      />
      <StatusCard
        text="Подтверждено"
        count={reportsCount?.[3].confirmed}
        color="#30B0C7"
        param='confirmed'
         paramStatus='status_pasting'
      />
    </>
  );
}
