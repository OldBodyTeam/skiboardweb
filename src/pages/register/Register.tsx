import { Input } from 'antd-mobile';
import './register.less';
import { useState } from 'react';
import yellow from '@assets/register/yellow.png';
import blue from '@assets/register/blue.png';
const Register = () => {
  const [username, setUsername] = useState<string>();
  const handleUsername = (value: string) => {
    setUsername(value);
  };
  const [email, setEmail] = useState<string>();
  const handleEmail = (value: string) => {
    setEmail(value);
  };
  const [password, setPassword] = useState<string>();
  const handlePassword = (value: string) => {
    setPassword(value);
  };
  const handleLogin = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ goPage: 'Login' }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ goPage: 'Login' }));
    }
  };

  const handleRegister = () => {
    console.log('register');
  };
  return (
    <div className="bg-[#131416] h-screen w-screen scope">
      <div className="relative mb-[175px] h-[255px]">
        <img src={blue} className="absolute top-0 left-0 z-[2] w-[430px] h-[255px]" onClick={handleLogin} />
        <img src={yellow} className="absolute top-0 left-0 z-[1] w-[580px] h-[215px]" />
        <div className="absolute top-0 left-0 z-[3]" onClick={handleLogin}>
          <div className="text-white login-logo font-bold absolute top-[98px] left-0 ignore-register-block whitespace-nowrap">
            Sign Up
          </div>
        </div>
      </div>

      <div className="ignore-register-block w-screen">
        <div className="form-block">
          <div className="text-white opacity-40 login-form-label">Username</div>
          <Input
            autoComplete="off"
            autoCapitalize="off"
            placeholder="Enter Username"
            className="login-form-input bg-[#131416] border-solid border-b-[1px] w-full border-[rgba(255,255,255,0.4)] pb-[33px] !text-white"
            onChange={handleUsername}
            value={username}
          />
        </div>
        <div className="form-block">
          <div className="text-white opacity-40 login-form-label">Email</div>
          <Input
            autoComplete="off"
            autoCapitalize="off"
            placeholder="Enter Email"
            className="login-form-input bg-[#131416] border-solid border-b-[1px] w-full border-[rgba(255,255,255,0.4)] pb-[33px] !text-white"
            onChange={handleEmail}
            value={email}
          />
        </div>
        <div>
          <div className="text-white opacity-40 login-form-label">Password</div>
          <Input
            placeholder="Enter Password"
            className="login-form-input bg-[#131416] border-solid border-b-[1px] w-full border-[rgba(255,255,255,0.4)] pb-[33px] !text-white overflow-hidden"
            type="password"
            onChange={handlePassword}
            value={password}
          />
        </div>
        <div
          className="bg-[#FDDE31] flex items-center justify-center h-[120px] text-[#333333] rounded-full form-button"
          onClick={handleRegister}
        >
          Sign Up
        </div>
        <div className="h-[40px]"></div>
      </div>
    </div>
  );
};
export default Register;
