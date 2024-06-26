import backIcon from '@assets/icon/back.png';
// import deleteIcon from '@assets/icon/delete-copy.png';
// import DrawItem from '@pages/draw/DrawItem';
import { useState } from 'react';
import { configData } from './config';
import { covertCanUseCanvasData } from '@pages/draw/config';
import DrawItem from '@pages/draw/DrawItem';
import { handlePostMessage } from '@utils/brigde';
import { useTranslation } from 'react-i18next';
const ScrollText = () => {
  const handleGoBack = () => {
    handlePostMessage('back', { goPage: 'Home', screen: 'DesignScreen' });
  };
  // const handleEditLight = () => {
  //   if (window.ReactNativeWebView) {
  //     window.ReactNativeWebView.postMessage(JSON.stringify({ goPage: 'EditLight' }));
  //   } else {
  //     const postMessage = window.parent.postMessage;
  //     postMessage(JSON.stringify({ goPage: 'EditLight' }));
  //   }
  // };
  const [textStr, setTextStr] = useState<Array<string>>([]);
  const [textValue, setTextValue] = useState<string>('');
  const handleGenerate = () => {
    const str = textValue.trim().toLowerCase().split('');
    setTextStr(str);
    handlePostMessage('chooseText', { str });
  };
  const { t } = useTranslation();
  return (
    <div className="w-screen min-h-screen bg-[rgba(19,20,22,1)]">
      <div className="flex items-center justify-center mb-[10px] relative pt-[10px] h-[148px]">
        <div className="text-[40px] text-white font-bold">{t('scroll-text')}</div>
        <div
          className="bg-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-full absolute left-[32px] w-[82px] h-[82px]"
          onClick={handleGoBack}
        >
          <img src={backIcon} className="w-[32px] h-[32px] inline-block" />
        </div>
      </div>
      <div className="mx-[10px] flex  items-center relative">
        <input
          className="flex-1 bg-[rgba(52,53,54,0.3)] rounded-[32px] h-[100px] text-[28px] pl-[32px]"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder={t('scroll-text-placeholder')}
        />
        <div
          className="w-[300px] h-[100px] rounded-[32px] bg-[#F9DD58] flex items-center justify-center absolute top-0 right-0 text-[32px] font-bold text-[#131416]"
          onClick={handleGenerate}
        >
          {t('scroll-text-generate')}
        </div>
      </div>
      {textStr.length > 0 ? (
        <div className="flex items-center overflow-x-auto overflow-y-hidden bg-[rgba(52,53,54,0.3)] p-[27px] flex-wrap m-[10px] rounded-[32px]">
          {textStr.map((text) => {
            const item = configData.get(text);
            if (!item) return null;
            return (
              <div
                key={text}
                className="bg-[rgba(118,118,118,0.1)] w-[calc((100vw-104px)/3)] m-[5px] rounded-[32px] h-[230px] flex items-center justify-center"
              >
                <div className="flex justify-center items-center flex-col">
                  {covertCanUseCanvasData(item).map((item, x) => {
                    return (
                      <div className="flex justify-center items-center" key={x} style={{ pointerEvents: 'none' }}>
                        {item.map((v, y) => {
                          return (
                            <DrawItem
                              x={x}
                              y={y}
                              key={x + y}
                              selectStatus={v.selectStatus}
                              style={{ width: 7, height: 7 }}
                              selectedColor="bg-yellow-500"
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
export default ScrollText;
