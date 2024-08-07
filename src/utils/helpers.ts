export function convertTimestamp(timestamp: string) {
  // Parse the timestamp into a Date object
  const date = new Date(timestamp);

  // Convert the date to UTC
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth() + 1; // Months are zero-indexed
  const utcDay = date.getUTCDate();

  // Convert time to the desired format
  const utcHour = date.getUTCHours(); // Get the hour in UTC
  const utcMinute = '00'; // Always round to the nearest hour

  // Format the date and time strings
  const formattedDate = `${String(utcDay).padStart(2, '0')}.${String(utcMonth).padStart(2, '0')}.${utcYear}`;
  const formattedTime = `${String(utcHour).padStart(2, '0')}:${utcMinute}`;

  // Combine the date and time
  return `${formattedDate} ${formattedTime}`;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
