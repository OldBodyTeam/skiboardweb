import ReactDOM from 'react-dom/client';
import '@assets/common.less';
import App from './App';
import { RecoilRoot } from 'recoil';
import 'intl-pluralrules';
import './utils/i18next';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
