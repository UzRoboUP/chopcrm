import StatusCard from './StatusCard';

export default function ReportStatus({
  reportsCount,
}: {
  reportsCount: {
    notified: string;
    non_notified: string;
    pending: string;
    rejected: string;
    sent: string;
    confirmed: string;
  }[];
}) {
  return (
    <>
      <StatusCard
        text="Уведомлено"
        count={reportsCount?.[1]?.notified}
        color="#FF9500"
        param='notified'
        paramStatus='status_foto_report'
      />
      <StatusCard
        text="Не уведомлено"
        count={reportsCount?.[0]?.non_notified}
        color="#C17272"
        param='not-notified'
         paramStatus='status_foto_report'
      />
      <StatusCard
        text="Отправлен фотоотчет"
        count={reportsCount?.[4]?.sent}
        color="#007AFF"
        param='photo_report_sent'
         paramStatus='status_foto_report'
      />
      <StatusCard
        text="Отклонен фотоотчет"
        count={reportsCount?.[3]?.rejected}
        color="#FF0000"
        param='photo_report_rejected'
         paramStatus='status_foto_report'
      />
      <StatusCard
        text="Подтверждено"
        count={reportsCount?.[5].confirmed}
        color="#30B0C7"
        param='confirmed'
         paramStatus='status_foto_report'
      />
    </>
  );
}
