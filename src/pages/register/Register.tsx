import { Input } from 'antd-mobile';
import './register.less';
import { useState } from 'react';
import yellow from '@assets/register/yellow.png';
import blue from '@assets/register/blue.png';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
const Register = () => {
  const [username, setUsername] = useState<string>();
  const handleUsername = debounce((value: string) => {
    setUsername(value);
  });
  const [email, setEmail] = useState<string>();
  const handleEmail = debounce((value: string) => {
    setEmail(value);
  });
  const [password, setPassword] = useState<string>();
  const handlePassword = debounce((value: string) => {
    setPassword(value);
  });
  const handleLogin = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'route', goPage: 'Login' }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ goPage: 'Login', type: 'route' }));
    }
  };

  const handleRegister = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ username, email, password, type: 'request' }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ username, email, password, type: 'request' }));
    }
  };
  const { t } = useTranslation();
  return (
    <div className="bg-[#131416] h-screen w-screen scope">
      <div className="relative mb-[175px] h-[255px] w-screen">
        <img src={blue} className="absolute top-0 left-0 z-[2] w-[430px] h-[255px]" onClick={handleLogin} />
        <img src={yellow} className="absolute top-0 left-0 z-[1] w-[580px] h-[215px]" />
        <div className="absolute top-0 left-0 z-[3]" onClick={handleLogin}>
          <div className="text-white login-logo font-bold absolute top-[98px] left-0 ignore-register-block whitespace-nowrap">
            {t('register')}
          </div>
        </div>
      </div>

      <div className="ignore-register-block w-screen">
        <div className="form-block" lang="en">
          <div className="text-white opacity-40 login-form-label">{t('register-user-label')}</div>
          <Input
            autoComplete="off"
            autoCapitalize="off"
            placeholder={t('register-user-placeholder')}
            className="login-form-input bg-[#131416] border-solid border-b-[1px] w-full border-[rgba(255,255,255,0.4)] pb-[33px] !text-white"
            onChange={handleUsername}
            value={username}
            inputMode="email"
            tabIndex={undefined}
          />
        </div>
        <div className="form-block" lang="en">
          <div className="text-white opacity-40 login-form-label">{t('register-email-label')}</div>
          <Input
            autoComplete="off"
            autoCapitalize="off"
            placeholder={t('register-email-placeholder')}
            className="login-form-input bg-[#131416] border-solid border-b-[1px] w-full border-[rgba(255,255,255,0.4)] pb-[33px] !text-white"
            onChange={handleEmail}
            value={email}
            inputMode="email"
            tabIndex={undefined}
          />
        </div>
        <div>
          <div className="text-white opacity-40 login-form-label">{t('register-password-label')}</div>
          <Input
            placeholder={t('register-password-placeholder')}
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
          {t('register')}
        </div>
        <div
          className="bg-[#333333] flex items-center justify-center h-[120px] text-[#FDDE31] rounded-full form-button !mt-4 border-[1px] border-[#FDDE31]"
          onClick={handleLogin}
        >
          {t('login')}
        </div>
        <div className="h-[40px]"></div>
      </div>
    </div>
  );
};
export default Register;
