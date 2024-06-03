import backIcon from '@assets/icon/back.png';
import DrawItem from '@pages/draw/DrawItem';
import { covertCanUseCanvasData, covertMap } from '@pages/draw/config';
import { handlePostMessage } from '@utils/brigde';
import { useRecoilState } from 'recoil';
import { collectionState } from 'src/stores/collection/collection.atom';
import { useTranslation } from 'react-i18next';
export type CollectionType = {
  id: string;
  name: string;
  frameList: string;
}[];

const CreativePatterns = () => {
  const handleGoBack = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ route: { goPage: 'Home', screen: 'DesignScreen' }, type: 'route' }),
      );
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ route: { goPage: 'Home', screen: 'DesignScreen' }, type: 'route' }));
    }
  };

  const handleEditLight = (collectionId: string) => {
    handlePostMessage('go-detail', { collectionId });
  };
  const [collectionInfo] = useRecoilState(collectionState);
  const { t } = useTranslation();
  return (
    <div className="w-screen h-full min-h-screen bg-[rgba(19,20,22,1)]">
      <div className="flex items-center justify-center mb-[20px] relative h-[148px] px-[32px]">
        <div
          className="bg-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-full w-[82px] h-[82px] absolute left-[32px]"
          onClick={handleGoBack}
        >
          <img src={backIcon} className="w-[32px] h-[32px] inline-block" />
        </div>
        <div className="text-[40px] text-white font-bold">{t('creative-patterns')}</div>
      </div>
      <div className="px-[5px] flex flex-wrap items-center flex-1 overflow-x-hidden overflow-y-auto">
        {collectionInfo?.map((itemData, index) => {
          return (
            <div
              key={index}
              className="m-[5px] rounded-[60px] h-[434px] bg-[rgba(52,53,54,0.3)] w-[calc((100vw-30px)/2)] px-[24px] pt-[24px] pb-[32px] flex flex-col justify-between"
              onClick={() => handleEditLight(itemData.id)}
            >
              <div className="w-full h-full bg-[rgba(118,118,118,0.1)] rounded-[40px] relative">
                <div className="flex justify-center items-center flex-col">
                  {(itemData.frameList as unknown as { selected: boolean; frame: number[][] }[])
                    .map((item) => {
                      if (!item.selected) return null;
                      const list = covertCanUseCanvasData(covertMap(item.frame));
                      return list.map((draw, x) => {
                        return (
                          <div className="flex justify-center items-center" key={x}>
                            {draw.map((v, y) => {
                              return (
                                <DrawItem
                                  x={x}
                                  y={y}
                                  key={x + y}
                                  selectStatus={v.selectStatus}
                                  style={{ width: 10, height: 10 }}
                                />
                              );
                            })}
                          </div>
                        );
                      });
                    })
                    .flat()}
                </div>
              </div>
              <div className="text-white text-[28px] text-center mt-[32px]">{itemData.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CreativePatterns;
