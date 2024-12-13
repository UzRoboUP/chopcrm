export function formatDate(inputDate: string): string {
  const date: Date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function convertTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth() + 1;
  const utcDay = date.getUTCDate();

  const utcHour = date.getUTCHours();
  const utcMinute = '00';

  const formattedDate = `${String(utcDay).padStart(2, '0')}.${String(
    utcMonth,
  ).padStart(2, '0')}.${utcYear}`;
  const formattedTime = `${String(utcHour).padStart(2, '0')}:${utcMinute}`;

  return `${formattedDate} ${formattedTime}`;
}

export function formatDuration(
  hours: number,
  minutes: number,
  seconds: number,
) {
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
}

// * Example: const durationString = formatDuration(1, 23, 45);
