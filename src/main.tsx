import ReactDOM from 'react-dom/client';
import '@assets/common.less';
import App from './App';
import { RecoilRoot } from 'recoil';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
