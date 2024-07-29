import { Button, Input } from "antd";
import { useState } from "react";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const { login, isLoading } = useLogin();

  function handleLogin() {
    login({
      username: credentials.username,
      password: credentials.password
    });
  }

  return (
    <div className="login">
      <div className="login__form">
        <div className="d-flex mb-35">
          <Input disabled={isLoading} onChange={({ target: { value: username } }) => setCredentials(prev => ({ ...prev, username }))} value={credentials.login} style={{ height: 60, width: 250 }} placeholder='Login' className='login__input' />
          <Input disabled={isLoading} onChange={({ target: { value: password } }) => setCredentials(prev => ({ ...prev, password }))} value={credentials.password} style={{ height: 60, width: 250 }} placeholder='Parol' className='login__input ml-20' />
        </div>
        <Button disabled={isLoading} onClick={handleLogin} className='login__btn'>
          {isLoading ? 'Yuklanmoqda...' : 'Kirish'}
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
