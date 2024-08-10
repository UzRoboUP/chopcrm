import { Radio } from 'antd';

export default function HeaderRadioGroup({
  menu,
  onChange,
  type,
}: {
  menu: { name: string; id: string }[];
  onChange: (a: { id: string; name: string; type: string }) => void;
  type: string;
}) {
  return (
    <Radio.Group className="ant-dropdown-menu radio-group-menu">
      {menu.map((item: { name: string; id: string }) => (
        <Radio
          onChange={() =>
            onChange({ id: item.id, name: item.name, type: type })
          }
          value={item.name}
          key={item.id}
          style={{ display: 'flex', padding: '4px 16px' }}
        >
          <span className="form-box-check-title"> {item.name}</span>
        </Radio>
      ))}
    </Radio.Group>
  );
}
