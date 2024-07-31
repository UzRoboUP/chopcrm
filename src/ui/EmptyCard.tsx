import { Empty } from "antd";

function EmptyCard({ text }: { text: string; }) {
  return (
    <div className="mx-auto mt-20"><Empty style={{ marginTop: 50 }} image={Empty.PRESENTED_IMAGE_SIMPLE} description={
      <span className="text-center">No {text}</span>
    } />
    </div>
  );
}

export default EmptyCard;
