import { Input } from 'antd-mobile';
import './login.less';
import yellow from '@assets/login/yellow.png';
import blue from '@assets/login/blue.png';
const Login = () => {
  const handleLogin = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ goPage: 'Home' }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ goPage: 'Home' }));
    }
  };
  const handleGotoRegister = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ goPage: 'Register' }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ goPage: 'Register' }));
    }
  };
  return (
    <div className="bg-[#131416] h-full w-screen scope min-h-screen">
      <div className="mb-[175px] relative h-[255px]">
        <img src={yellow} className="absolute top-0 left-0 z-[2] w-[430px] h-[255px]" onClick={handleGotoRegister} />
        <img src={blue} className="absolute top-0 left-0 z-[1] w-[580px] h-[215px]" />
        <div className="relative top-0 left-0 z-[3]" onClick={handleGotoRegister}>
          <div className="text-black login-logo font-bold absolute top-[98px] left-0 ignore-register-block">Login</div>
        </div>
      </div>

      <div className="ignore-register-block w-screen">
        <div className="form-block">
          <div className="text-white opacity-40 login-form-label">Username/Email</div>
          <Input
            autoComplete="off"
            autoCapitalize="off"
            placeholder="Enter Username/Email"
            className="login-form-input bg-[#131416] border-solid border-b-[1px] w-full border-[rgba(255,255,255,0.4)] pb-[33px] !text-white"
            tabIndex={undefined}
          />
        </div>
        <div>
          <div className="text-white opacity-40 login-form-label">Password</div>
          <Input
            placeholder="Enter Password"
            className="login-form-input bg-[#131416] border-solid border-b-[1px] w-full border-[rgba(255,255,255,0.4)] pb-[33px] !text-white overflow-hidden"
            type="password"
            tabIndex={undefined}
          />
        </div>
        <div
          className="bg-[#FDDE31] flex items-center justify-center h-[120px] text-[#333333] rounded-full form-button"
          onClick={handleLogin}
        >
          Login
        </div>
        <div className="h-[40px]"></div>
      </div>
    </div>
  );
};
export default Login;
