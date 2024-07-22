import { Button, Input } from "antd";
import { useState } from "react";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [role, setRole] = useState('');

  const { login, isPending } = useLogin();


  function handleLogin(e: MouseEvent) {
    e.preventDefault();
    login({
      email: "mmyname@gmail.com",
      password: '123456'
    });
  }

  return (
    <div className="login">
      <div className="login__form">
        <div className="d-flex mb-35">
          <Input disabled={isPending} onInput={(e) => setRole(e.target.value)} value={role} style={{ height: 60, width: 250 }} placeholder='Login' className='login__input' />
          <Input disabled={isPending} style={{ height: 60, width: 225 }} placeholder='Parol' className='login__input ml-20' />
        </div>
        <Button disabled={isPending} onClick={(e) => handleLogin(e)} className='login__btn'>
          {isPending ? 'Yuklanmoqda...' : 'Kirish'}
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
