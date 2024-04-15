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
    <div>
      <input disabled={isPending} type="text" value={role} onInput={(e) => setRole(e.target.value)} name="role" placeholder="Enter your role" />
      <button disabled={isPending} onClick={(e) => handleLogin(e)}>
        {isPending ? 'Loading...' : 'Log in'}
      </button>
    </div>
  );
}

export default LoginForm;
