import { ReactNode } from 'react';

export default function FormBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="form__box">
      <span className="form__box__title">{title}</span>
      {children}
    </div>
  );
}
