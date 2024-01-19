import { useEffect, useMemo, useState } from 'react';
import DrawItem from './DrawItem';
import leftIcon from '@assets/icon/left.png';
import rightIcon from '@assets/icon/right.png';
import cleanIcon from '@assets/icon/clean.png';
import scaleIcon from '@assets/icon/scale.png';
import magicIcon from '@assets/icon/magic.png';
import addIcon from '@assets/icon/add.png';
import editIcon from '@assets/icon/edit.png';
import backIcon from '@assets/icon/back.png';
import Progress from 'src/components/progress/Progress';
const drawData = new Map<number, Map<string, { selectStatus: boolean }>>();
const data = [1, 3, 5, 5, 7, 7, 9, 9, 11, 11, 13, 13, 15, 17, 15];
for (let i = 0; i < data.length; i++) {
  const col = new Map();

  for (let j = 0; j < data[i]; j++) {
    col.set(`${i}-${j}`, { selectStatus: false });
  }

  drawData.set(i, col);
}

const Draw = () => {
  const [drawBlock, setDrawBlock] = useState(drawData);
  const [drawRestoreStack, setDrawRestoreStack] = useState<{
    prev: Array<{ x: number; y: number }>;
    next: Array<{ x: number; y: number }>;
  }>({ prev: [], next: [] });
  const [clear, setClear] = useState(false);
  const itemData = useMemo(() => {
    const drawBlockObj = Object.fromEntries(drawBlock);
    return Object.keys(drawBlockObj).map((v) => {
      const drawBlockItemObj = Object.fromEntries(drawBlockObj[v]);
      return Object.keys(drawBlockItemObj).map((k) => drawBlockItemObj[k]);
    });
  }, [drawBlock]);
  const handleSelected = (x: number, y: number) => {
    setDrawRestoreStack((step) => {
      step.next.push({ x, y });
      step.prev = [...step.next];
      return {
        next: [...step.next],
        prev: [],
      };
    });
    setDrawBlock((prev) => {
      const row = prev.get(x)!;
      row?.set(`${x}-${y}`, { selectStatus: !clear });
      prev.set(x, row);
      return new Map(prev);
    });
  };
  const handleRestore = () => {
    const item = drawRestoreStack.prev.pop();
    if (item) {
      setDrawRestoreStack((step) => {
        return {
          next: [...step.next, item],
          prev: [...drawRestoreStack.prev],
        };
      });
      const { x, y } = item;
      setDrawBlock((prev) => {
        const row = prev.get(x)!;
        row?.set(`${x}-${y}`, { selectStatus: true });
        prev.set(x, row);
        return new Map(prev);
      });
    }
  };
  const handleBack = () => {
    const item = drawRestoreStack.next.pop();
    if (item) {
      setDrawRestoreStack((step) => {
        return {
          next: [...drawRestoreStack.next],
          prev: [...step.prev, item],
        };
      });
      const { x, y } = item;
      setDrawBlock((prev) => {
        const row = prev.get(x)!;
        row?.set(`${x}-${y}`, { selectStatus: false });
        prev.set(x, row);
        return new Map(prev);
      });
    }
  };
  const [scale, setScale] = useState(false);
  const handleScale = () => {
    setScale((prev) => !prev);
  };
  const [drawWork, setDrawWork] = useState<{ selectStatus: boolean }[][][]>([]);
  const [editIndex, setEditIndex] = useState<number>(0);
  useEffect(() => {
    setDrawWork((prev) => {
      prev[editIndex] = itemData;
      return prev;
    });
  }, [itemData, editIndex]);
  const handleGoBack = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ goPage: 'Design-Home', itemData }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ goPage: 'Design-Home', itemData }));
    }
  };
  return (
    <div className="bg-[rgba(89,56,236,1)] h-screen w-screen">
      <div className="flex items-center justify-center mb-[20px] relative pt-[10px]">
        <div className="text-[40px] text-white font-bold">Smiling Face</div>
        <img src={editIcon} className="w-[37px] h-[44px] inline-block ml-[10px]" />
        <div
          className="bg-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-full absolute left-[32px] w-[82px] h-[82px]"
          onClick={handleGoBack}
        >
          <img src={backIcon} className="w-[32px] h-[32px] inline-block" />
        </div>
      </div>
      <div className="overflow-auto mb-[32px]">
        <div
          className="flex justify-center items-center flex-col"
          style={{ transform: scale ? 'scale(2)' : 'scale(1)', transformOrigin: '0 0' }}
        >
          {itemData.map((item, x) => {
            return (
              <div className="flex justify-center items-center" key={x}>
                {item.map((v, y) => {
                  return (
                    <DrawItem x={x} y={y} key={x + y} selectStatus={v.selectStatus} handleSelected={handleSelected} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between mx-[67px] p-[17px] bg-[rgba(155,136,244,1)] rounded-[48px]">
        <div className="flex items-center">
          <div onClick={handleRestore} className="w-[62px] h-[62px] mr-[8px]">
            <img src={rightIcon} alt="rightIcon" className="w-full h-full rounded-full" />
          </div>
          <div onClick={handleBack} className="w-[62px] h-[62px]">
            <img src={leftIcon} alt="leftIcon" className="w-full h-full rounded-full" />
          </div>
        </div>
        <div className="flex items-center">
          <div onClick={handleScale} className="w-[62px] h-[62px] mr-[8px]">
            <img src={magicIcon} alt="magicIcon" className="w-full h-full rounded-full" />
          </div>
          <div onClick={handleScale} className="w-[62px] h-[62px] mr-[8px]">
            <img src={scaleIcon} alt="scaleIcon" className="w-full h-full rounded-full" />
          </div>
          <div onClick={() => setClear(true)} className="w-[62px] h-[62px]">
            <img src={cleanIcon} alt="cleanIcon" className="w-full h-full rounded-full" />
          </div>
        </div>
      </div>
      <div
        className="bg-[#F0F3F6] absolute left-0 bottom-0 p-[48px] w-screen"
        style={{ borderRadius: '30px 30px 0 0' }}
      >
        <div className="text-[44px] font-bold text-[#333333] leading-[53px]">Frames</div>
        <div className="mt-[32px] overflow-x-auto overflow-y-hidden flex items-center mx-[-10px]">
          {drawWork.map((item, index) => {
            return (
              <div
                key={item.length + index}
                className="w-[180px] h-[180px] flex items-center justify-center bg-[#F0F3F6] relative flex-col mx-[10px]"
                style={
                  editIndex === index ? { border: '2px solid rgba(89, 56, 236, 1)' } : { border: '1px solid #000000' }
                }
                onClick={() => setEditIndex(index)}
              >
                {item.map((item, x) => {
                  return (
                    <div className="flex justify-center items-center" key={x}>
                      {item.map((v, y) => {
                        return (
                          <DrawItem
                            x={x}
                            y={y}
                            key={x + y}
                            selectStatus={v.selectStatus}
                            handleSelected={handleSelected}
                            style={{ width: 5, height: 5 }}
                            selectedColor="bg-yellow-500"
                            color="bg-[#F0F3F6]"
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div
            className="w-[180px] h-[180px] flex items-center justify-center bg-[#F0F3F6]"
            style={{ border: '1px solid #000000' }}
            onClick={() => setEditIndex(drawWork.length)}
          >
            <img src={addIcon} className="w-[24px] h-[24px]" />
          </div>
        </div>
        <div className="flex items-center justify-between my-[32px]">
          <div className="text-[44px] text-[#333333] font-bold leading-[53px]">Speed</div>
          <Progress />
        </div>
        <div className="flex items-center justify-between mb-[20px]">
          <div className="h-[96px] bg-[#D7DCE1] rounded-[48px] flex justify-center items-center text-[36px] leading-[50px] text-[#333333] font-semibold flex-1">
            Preview
          </div>
          <div className="h-[96px] bg-[#F7E54C] rounded-[48px] flex justify-center items-center text-[36px] leading-[50px] text-[#333333] font-semibold flex-1 ml-[16px]">
            Save
          </div>
        </div>
      </div>
    </div>
  );
};
export default Draw;
