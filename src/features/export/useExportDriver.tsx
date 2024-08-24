import { useQuery } from '@tanstack/react-query';
import Export from '../../services/export';
import { message } from 'antd';
import { useState, useEffect } from 'react';

export function useExportDrivers() {
  const [isActive, setActive] = useState(false);

  const {
    isLoading: isLoadingTask,
    data: taskData,
    isError: isTaskError,
    error: taskError,
  } = useQuery({
    queryKey: ['export-drivers'],
    queryFn: () => Export.getExportDriversId(),
    enabled: isActive,
  });

  const {
    isLoading: isLoadingZip,
    data: zipData,
    isError: isZipError,
    error: zipError,
  } = useQuery({
    queryKey: ['export-drivers-zip', taskData?.task_id],
    queryFn: () => Export.getExportDriversZip(taskData?.task_id),
    enabled: !!taskData?.task_id,
  });

  useEffect(() => {
    if (zipData && isActive) {
      downloadFile(zipData);
      setActive(false);
    }
  }, [zipData]);

  const downloadFile = (data) => {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'myFile.zip';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (isTaskError) {
    message.error(taskError.message);
  }

  if (isZipError) {
    message.error(zipError.message);
  }

  return { isLoading: isLoadingTask || isLoadingZip, setActive };
}
