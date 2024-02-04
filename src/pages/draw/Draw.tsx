import { useMemo, useState } from 'react';
import DrawItem from './DrawItem';
import leftIcon from '@assets/icon/left.png';
import rightIcon from '@assets/icon/right.png';
import cleanIcon from '@assets/icon/clean.png';
import scaleIcon from '@assets/icon/scale.png';
import magicIcon from '@assets/icon/magic.png';
import addIcon from '@assets/icon/add.png';
import editIcon from '@assets/icon/edit.png';
import backIcon from '@assets/icon/back.png';
import copyIcon from '@assets/draw/copy.png';
import deleteIcon from '@assets/draw/delete.png';
import Progress from 'src/components/progress/Progress';
import { useImmer } from 'use-immer';
import { enableMapSet } from 'immer';
import { Input, Modal } from 'antd-mobile';
import { debounce } from 'lodash';
import { useMemoizedFn } from 'ahooks';
enableMapSet();
const drawData = new Map<number, Map<string, { selectStatus: boolean }>>();
const data = [1, 3, 5, 5, 7, 7, 9, 9, 11, 11, 13, 13, 15, 17, 15];
for (let i = 0; i < data.length; i++) {
  const col = new Map();

  for (let j = 0; j < data[i]; j++) {
    col.set(`${i}-${j}`, { selectStatus: false });
  }

  drawData.set(i, col);
}
export type DrawBlockType = Map<number, Map<string, { selectStatus: boolean }>>;
export type DrawRestoreStackType = {
  prev: Array<{ x: number; y: number }>;
  next: Array<{ x: number; y: number }>;
};
const getInitOptData = () => {
  return {
    drawBlock: new Map(drawData),
    drawRestoreStack: { prev: [] as { x: number; y: number }[], next: [] as { x: number; y: number }[] },
  };
};
const covertCanUseCanvasData = (drawCanvas: DrawBlockType) => {
  const drawBlockObj = Object.fromEntries(drawCanvas);
  return Object.keys(drawBlockObj).map((v) => {
    const drawBlockItemObj = Object.fromEntries(drawBlockObj[v]);
    return Object.keys(drawBlockItemObj).map((k) => drawBlockItemObj[k]);
  });
};
const Draw = () => {
  // 清理
  const [clear, setClear] = useState(false);
  // 放大缩小
  const [scale, setScale] = useState(false);
  // 禁止点击
  const [tap, setTap] = useState(false);
  const handleScale = () => {
    setTap(true);
    setClear(false);
  };
  const handleClear = () => {
    setClear(true);
    setTap(false);
  };
  /**
   * 数据结构变更
   * 操作有哪些数据 - 画板初始化数据 option
   * 当前数据的操作记录 - 堆栈信息
   * */
  const [drawWork, setDrawWork] = useImmer([{ ...getInitOptData() }]);
  const [editIndex, setEditIndex] = useState<number>(0);
  const handleGoBack = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ goPage: 'Design-Home', itemData }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ goPage: 'Design-Home', itemData }));
    }
  };
  const handleCopy = (currentOptIndex: number) => {
    setDrawWork((draft) => {
      if (draft.length < 10) {
        const data = draft[currentOptIndex];
        draft.push(data);
      }
      return draft;
    });
  };
  const handleDelete = (currentOptIndex: number) => {
    setDrawWork((prev) => {
      prev.splice(currentOptIndex, 1);
      return [...prev];
    });
    setEditIndex(0);
  };
  const handleAddDrawList = () => {
    setDrawWork((draft) => {
      if (draft.length < 10) {
        const data = getInitOptData();
        draft.push({ ...data });
      }
      return draft;
    });
  };

  const handleCurrentOptBlock = (currentOptIndex: number) => {
    setEditIndex(currentOptIndex);
  };
  // 圆点操作的数据
  const handleSelected = (x: number, y: number) => {
    setDrawWork((draft) => {
      const currentDrawBlock = draft[editIndex];
      const { drawBlock, drawRestoreStack } = currentDrawBlock;
      // 处理选择的区块
      const row = drawBlock.get(x)!;
      row?.set(`${x}-${y}`, { selectStatus: !clear });
      drawBlock.set(x, row);
      // 处理操作堆栈
      drawRestoreStack.next.push({ x, y });
      drawRestoreStack.prev = [];
    });
  };
  // 转换数据
  const itemData = useMemo(() => {
    return covertCanUseCanvasData(drawWork[editIndex].drawBlock);
  }, [drawWork, editIndex]);

  const handleRestore = () => {
    const drawRestoreStack = [...drawWork[editIndex].drawRestoreStack.prev];
    const item = drawRestoreStack.pop();
    if (item) {
      setDrawWork((draft) => {
        const optData = draft[editIndex];
        optData.drawRestoreStack.next = [...optData.drawRestoreStack.next, item];
        optData.drawRestoreStack.prev = [...drawRestoreStack];
        const { x, y } = item;
        const row = optData.drawBlock.get(x)!;
        row?.set(`${x}-${y}`, { selectStatus: true });
        optData.drawBlock.set(x, row);
      });
    }
  };

  const handleBack = () => {
    const drawRestoreStack = [...drawWork[editIndex].drawRestoreStack.next];
    const item = drawRestoreStack.pop();
    // const item = drawRestoreStack.next.pop();
    if (item) {
      setDrawWork((draft) => {
        const optData = draft[editIndex];
        optData.drawRestoreStack.prev = [...optData.drawRestoreStack.prev, item];
        optData.drawRestoreStack.next = [...drawRestoreStack];
        const { x, y } = item;
        const row = optData.drawBlock.get(x)!;
        row?.set(`${x}-${y}`, { selectStatus: false });
        optData.drawBlock.set(x, row);
      });
    }
  };
  const [visible, setVisible] = useState(false);
  const [drawInputName, setDrawInputName] = useState('Smiling Face');
  const [drawName, setDrawName] = useState('Smiling Face');
  const handleModifyName = useMemoizedFn(() => {
    setVisible(true);
  });
  return (
    <div className="bg-[rgba(89,56,236,1)] h-screen w-screen">
      <div className="flex items-center justify-center mb-[20px] relative pt-[10px]">
        <div onClick={handleModifyName} className="flex items-center h-full">
          <div className="text-[40px] text-white font-bold">{drawName}</div>
          <img src={editIcon} className="w-[37px] h-[44px] inline-block ml-[10px]" />
        </div>

        <div
          className="bg-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-full absolute left-[32px] w-[82px] h-[82px]"
          onClick={handleGoBack}
        >
          <img src={backIcon} className="w-[32px] h-[32px] inline-block" />
        </div>
      </div>
      <div className="overflow-auto mb-[32px]" style={{ overflow: scale ? 'auto' : 'hidden' }}>
        <div
          className="flex justify-center items-center flex-col"
          style={{
            transform: scale ? 'scale(2)' : 'scale(1)',
            transformOrigin: '0 0',
            pointerEvents: tap ? 'all' : 'none',
          }}
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
          <div onClick={handleClear} className="w-[62px] h-[62px]">
            <img src={cleanIcon} alt="cleanIcon" className="w-full h-full rounded-full" />
          </div>
        </div>
      </div>
      <div
        className="bg-[#F0F3F6] absolute left-0 bottom-0 p-[48px] w-screen"
        style={{ borderRadius: '30px 30px 0 0' }}
      >
        <div className="text-[44px] font-bold text-[#333333] leading-[53px]">Frames</div>
        <div className="mt-[32px] overflow-x-auto overflow-y-hidden flex items-start mx-[-10px] ">
          {drawWork.map((item, index) => {
            return (
              <div key={index + String(editIndex === index) + item.drawBlock.size}>
                <div
                  className="min-w-[180px] w-[180px] h-[180px] flex items-center justify-center bg-[#F0F3F6] relative flex-col mx-[10px]"
                  style={
                    editIndex === index ? { border: '2px solid rgba(89, 56, 236, 1)' } : { border: '2px solid #000000' }
                  }
                  onClick={() => handleCurrentOptBlock(index)}
                >
                  <img
                    src={copyIcon}
                    className="absolute top-[10px] right-[10px] w-[32px] h-[32px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(index);
                    }}
                  />
                  <img
                    src={deleteIcon}
                    className="absolute bottom-[10px] right-[10px] w-[32px] h-[32px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  />
                  {covertCanUseCanvasData(item.drawBlock).map((item, x) => {
                    return (
                      <div className="flex justify-center items-center" key={x} style={{ pointerEvents: 'none' }}>
                        {item.map((v, y) => {
                          return (
                            <DrawItem
                              x={x}
                              y={y}
                              key={x + y}
                              selectStatus={v.selectStatus}
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
                <div className="flex items-center justify-center mt-[8px] text-[rgba(51,51,51,1)] text-[24px]">
                  {index + 1}/10
                </div>
              </div>
            );
          })}
          {drawWork.length < 10 ? (
            <div
              className="w-[180px] h-[180px] flex items-center justify-center bg-[#F0F3F6] min-w-[180px] mx-[10px]"
              style={{ border: '2px solid #000000' }}
              onClick={handleAddDrawList}
              key="add-btn"
            >
              <img src={addIcon} className="w-[24px] h-[24px]" />
            </div>
          ) : null}
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
      <Modal
        visible={visible}
        closeOnAction
        onClose={() => {
          setVisible(false);
        }}
        actions={[{ key: 'Confirm', text: 'Confirm', onClick: () => setDrawName(drawInputName) }]}
        content={
          <div>
            <div>更改名称</div>
            <Input placeholder="请输入名称" onChange={debounce((val) => setDrawInputName(val))} value={drawInputName} />
          </div>
        }
      ></Modal>
    </div>
  );
};
export default Draw;
