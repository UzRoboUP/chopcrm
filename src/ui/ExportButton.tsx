import download from '../../public/img/page-header/download.svg';
import { useExportDrivers } from '../features/export/useExportDriver';
import { Spin } from 'antd';
export default function ExportButton() {
  const { isLoading, setActive } = useExportDrivers();

  return (
    <button className="export-btn" onClick={() => setActive(true)}>
      {!isLoading ? (
        <img
          className="pointer"
          width="20px"
          height="20px"
          src={download}
          alt=""
        />
      ) : (
        <Spin />
      )}
      Экспорт
    </button>
  );
}
