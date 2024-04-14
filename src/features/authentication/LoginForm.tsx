import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const [role, setRole] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();


  function handleLogin() {
    login({
      fullName: "My Name",
      email: "mmyname@gmail.com",
      roles: [role]
    });
    navigate('/dashboard');
  }

  return (
    <div>
      <input type="text" value={role} onInput={(e) => setRole(e.target.value)} name="role" placeholder="Enter your role" />
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
}

export default LoginForm;
