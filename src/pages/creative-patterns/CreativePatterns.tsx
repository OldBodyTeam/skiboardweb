import DrawItem from '@pages/draw/DrawItem';
import { covertCanUseCanvasData, covertMap } from '@pages/draw/config';
import { handlePostMessage } from '@utils/brigde';
import { useSize } from 'ahooks';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { collectionState } from 'src/stores/collection/collection.atom';
export type CollectionType = {
  id: string;
  name: string;
  frameList: string;
}[];

const CreativePatterns = () => {
  const handleEditLight = (collectionId: string) => {
    handlePostMessage('go-detail', { collectionId });
  };
  const [collectionInfo] = useRecoilState(collectionState);
  const divRef = useRef<HTMLDivElement>(null);
  const size = useSize(divRef);
  useEffect(() => {
    if ((size?.height ?? 0) > 0) {
      handlePostMessage('page-height', {
        height: Math.max(document.body.offsetHeight, document.body.scrollHeight, size?.height ?? 0),
      });
    }
  }, [size]);

  return (
    <div className="w-screen bg-[rgba(19,20,22,1)] " ref={divRef}>
      <div className="px-[5px] flex flex-wrap items-center flex-1">
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
