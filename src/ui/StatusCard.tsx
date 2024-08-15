import { useSearchParams } from 'react-router-dom';

export default function StatusCard({
  text,
  color,
  count,
  param,
  paramStatus
}: {
  text: string;
  color: string;
  count: string;
  param: string;
  paramStatus:string
}) {
  const [searchParam, setSearchParam] = useSearchParams();
  const params = new URLSearchParams(searchParam.toString());

  const setParam = () => {
    params.set(paramStatus, param);
    setSearchParam(params);
  };

  return (
    <div
      className="report__box"
      style={{ borderColor: color }}
      onClick={setParam}
    >
      <div className="report__title">
        <div className="report__title__dot" style={{ background: color }}></div>
        <h5>{text}</h5>
      </div>
      <div className="report__count">{count} машины</div>
    </div>
  );
}
