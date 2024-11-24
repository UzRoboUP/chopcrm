import { Empty, Radio } from 'antd';
interface MenuItem {
  [key: string]: string; // Adjust this if you need specific properties
  id: string;
  // lable?:string|undefined
}
export default function HeaderRadioGroup({
  menu,
  onChange,
  searchParam,
  name,
  defaultValue,
}: {
  name: string;
  menu: MenuItem[];
  onChange: (a: { id: string; name: string; searchParam: string }) => void;
  searchParam: string;
  defaultValue?: string | null;
}) {
  return (
    <Radio.Group
      className="ant-dropdown-menu radio-group-menu"
      defaultValue={defaultValue}
    >
      {menu?.length > 0 ? (
        menu.map((item) => (
          <Radio
            onChange={() =>
              onChange({
                id: item.id,
                name: item[name],
                searchParam: searchParam,
              })
            }
            value={item[name]}
            key={item.id}
            style={{ display: 'flex', padding: '4px 16px' }}
          >
            <span className="form-box-check-title">
              {item.label || item[name]}
            </span>
          </Radio>
        ))
      ) : (
        <Empty />
      )}
    </Radio.Group>
  );
}
