import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useMemoizedFn, useSize } from 'ahooks';
import './cover.less';
import ButtonShadow from 'src/components/button-shadow/ButtonShadow';
import ButtonBg from 'src/components/button-bg/ButtonBg';
import { getInitOptData, covertCanUseCanvasData, covertDataToServer } from './config';
import { handlePostMessage } from '@utils/brigde';
import { useRecoilState } from 'recoil';
import { collectionDetailState, collectionName } from 'src/stores/collection-detail/collectionDetail.atom';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
enableMapSet();

const Draw = () => {
  // 清理
  const [clear, setClear] = useState(false);
  // 放大缩小
  const [scale, setScale] = useState(false);
  // 禁止点击
  const [tap, setTap] = useState(true);
  const [btnSelected, setBtnSelected] = useState({ scale: false, clear: false, draw: true });
  const handleScale = () => {
    setScale((prev) => !prev);
    setBtnSelected((prev) => {
      return {
        ...prev,
        scale: !prev.scale,
      };
    });
  };
  const handleTap = () => {
    setTap(true);
    setClear(false);
    setBtnSelected((prev) => {
      return {
        ...prev,
        draw: true,
        clear: false,
      };
    });
  };
  const handleClear = () => {
    setClear(true);
    setTap(false);
    setBtnSelected((prev) => {
      return {
        ...prev,
        draw: false,
        clear: true,
      };
    });
  };
  /**
   * 数据结构变更
   * 操作有哪些数据 - 画板初始化数据 option
   * 当前数据的操作记录 - 堆栈信息
   * */
  const [drawWork, setDrawWork] = useImmer<ReturnType<typeof getInitOptData>[]>([]);
  const [editIndex, setEditIndex] = useState<number>(0);
  const handleGoBack = () => {
    handlePostMessage('route', { goPage: 'Home', screen: 'DesignScreen' });
  };
  const handleCopy = (currentOptIndex: number) => {
    handlePostMessage('copy-frame', { frameIndex: currentOptIndex });
    setDrawWork((draft) => {
      if (draft.length < 10) {
        const data = draft[currentOptIndex];
        draft.push(data);
      }
      return draft;
    });
  };
  const handleDelete = (currentOptIndex: number) => {
    handlePostMessage('delete-frame', {
      frameIndex: currentOptIndex,
    });
    // 剩一个应该无法删除
    setDrawWork((prev) => {
      if (prev.length <= 1) return prev;
      prev.splice(currentOptIndex, 1);
    });
    setEditIndex(0);
  };
  // 创建新的画布
  const handleAddDrawList = () => {
    // handlePostMessage('create-frame', {});
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
    console.log(x, y);
    setDrawWork((draft) => {
      const currentDrawBlock = draft[editIndex];
      const { drawBlock, drawRestoreStack } = currentDrawBlock;
      // 处理选择的区块
      const row = drawBlock.get(x)!;
      // 新增
      if (tap && !clear && !row.get(`${x}-${y}`)?.selectStatus) {
        row?.set(`${x}-${y}`, { selectStatus: true });
        drawBlock.set(x, row);
        // 处理操作堆栈
        drawRestoreStack.next.push({ x, y });
        drawRestoreStack.prev = [];
      } else if (!tap && clear && row.get(`${x}-${y}`)?.selectStatus) {
        // 清理操作
        row?.set(`${x}-${y}`, { selectStatus: false });
        drawBlock.set(x, row);
        drawRestoreStack.next = [];
        drawRestoreStack.prev.push({ x, y });
      }
    });
  };
  // 转换数据
  const itemData = useMemo(() => {
    if (drawWork[editIndex] && drawWork[editIndex].drawBlock) {
      return covertCanUseCanvasData(drawWork[editIndex].drawBlock);
    } else {
      return [];
    }
  }, [drawWork, editIndex]);

  const [hasRestoreOpt, setHasRestoreOpt] = useState(false);
  const [hasBackOpt, setHasBackOpt] = useState(false);

  useEffect(() => {
    const drawRestoreStack = [...get(drawWork, `${editIndex}.drawRestoreStack.prev`, [])];
    setHasRestoreOpt(drawRestoreStack.length > 0);
  }, [drawWork, editIndex]);

  useEffect(() => {
    const drawBackStack = [...get(drawWork, `${editIndex}.drawRestoreStack.next`, [])];
    setHasBackOpt(drawBackStack.length > 0);
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
    const drawBackStack = [...drawWork[editIndex].drawRestoreStack.next];
    const item = drawBackStack.pop();
    // const item = drawRestoreStack.next.pop();
    if (item) {
      setDrawWork((draft) => {
        const optData = draft[editIndex];
        optData.drawRestoreStack.prev = [...optData.drawRestoreStack.prev, item];
        optData.drawRestoreStack.next = [...drawBackStack];
        const { x, y } = item;
        const row = optData.drawBlock.get(x)!;
        row?.set(`${x}-${y}`, { selectStatus: false });
        optData.drawBlock.set(x, row);
      });
    }
  };
  const optBlockRef = useRef<HTMLDivElement>(null);
  const optBlockSize = useSize(optBlockRef);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerRefSize = useSize(headerRef);
  const openModal = () => {
    const currentData = drawWork.map((v) => covertCanUseCanvasData(v.drawBlock));
    handlePostMessage('modify-name', {
      serverData: currentData.map((v, index) => {
        return {
          selected: index === editIndex,
          frame: covertDataToServer(v),
        };
      }),
    });
  };
  const handleSaveCollection = () => {
    const currentData = drawWork.map((v) => covertCanUseCanvasData(v.drawBlock));
    handlePostMessage('create-collection', {
      name: drawName,
      serverData: currentData.map((v, index) => {
        return {
          selected: index === editIndex,
          frame: covertDataToServer(v),
        };
      }),
    });
  };
  const [collectionDetail] = useRecoilState(collectionDetailState);
  const [drawName] = useRecoilState(collectionName);
  useEffect(() => {
    if (collectionDetail) {
      setDrawWork((draft) => {
        draft = [];
        collectionDetail.frameList?.forEach((item) => {
          // draft.push({ ...getInitOptData() });
          const optData = { ...getInitOptData() };
          const drawBlock = optData.drawBlock;
          item.frame.forEach((x, index) => {
            const row = new Map(drawBlock.get(index)!);
            x.forEach((y) => {
              row?.set(`${index}-${y}`, { selectStatus: true });
              console.log(row.get(`${index}-${y}`)?.selectStatus);
            });
            drawBlock.set(index, row);
          });
          draft.push({ ...optData, drawBlock });
        });
        return draft;
      });
      collectionDetail.frameList?.forEach((item, index) => {
        if (item.selected) {
          setEditIndex(index);
        }
      });
    } else {
      setDrawWork((draft) => {
        draft.push({ ...getInitOptData() });
        return draft;
      });
    }
  }, [collectionDetail, setDrawWork]);
  const { t } = useTranslation();

  const handlePlayDrawSpeed = useMemoizedFn((index: number) => {
    handlePostMessage('speed', { speed: index });
  });

  return (
    <div className="bg-[rgba(89,56,236,1)] h-screen w-screen">
      <div className="flex items-center justify-center mb-[10px] relative pt-[10px]" ref={headerRef}>
        <div onClick={openModal} className="flex items-center h-full">
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
      <div
        className="overflow-auto w-screen"
        style={{ height: `calc(100vh - ${optBlockSize?.height ?? 0}px - ${headerRefSize?.height ?? 0}px)` }}
      >
        <div
          className="overflow-auto"
          style={{ overflow: scale ? 'auto' : 'hidden', height: scale ? '100%' : undefined }}
        >
          <div
            className="flex justify-center items-center flex-col py-2"
            style={{
              transform: scale ? 'scale(2)' : 'scale(1)',
              transformOrigin: '0 0',
              // pointerEvents: tap ? 'all' : 'none',
            }}
          >
            {itemData?.map((item, x) => {
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
      </div>
      <div className="absolute left-0 bottom-0" ref={optBlockRef}>
        <div className="flex items-center justify-between mx-[67px] p-[17px] bg-[rgba(155,136,244,1)] rounded-[48px] mb-[32px]">
          <div className="flex items-center">
            <ButtonShadow icon={hasRestoreOpt ? leftIcon : ''} handleOptions={handleRestore} />
            <ButtonShadow icon={hasBackOpt ? rightIcon : ''} handleOptions={handleBack} />
          </div>
          <div className="flex items-center">
            <ButtonBg icon={magicIcon} handleOptions={handleTap} selected={btnSelected.draw} />
            <ButtonBg icon={scaleIcon} handleOptions={handleScale} selected={btnSelected.scale} />
            <ButtonBg icon={cleanIcon} handleOptions={handleClear} selected={btnSelected.clear} />
          </div>
        </div>
        <div className="bg-[#F0F3F6] p-[48px] w-screen" style={{ borderRadius: '30px 30px 0 0' }}>
          <div className="text-[44px] font-bold text-[#333333] leading-[53px]">{t('draw-light-frames')}</div>
          <div className="mt-[32px] overflow-x-auto overflow-y-hidden flex items-start mx-[-10px] ">
            {drawWork?.map((item, index) => {
              return (
                <div key={index + String(editIndex === index) + item.drawBlock.size}>
                  <div
                    className="min-w-[180px] w-[180px] h-[180px] flex items-center justify-center bg-[#F0F3F6] relative flex-col mx-[10px]"
                    style={
                      editIndex === index
                        ? { border: '2px solid rgba(89, 56, 236, 1)' }
                        : { border: '2px solid #000000' }
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
                                color="bg-[#f0f3f6]"
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
          <div
            className="flex items-center justify-between my-[32px]"
            style={{ visibility: drawWork.length > 1 ? 'visible' : 'hidden' }}
          >
            <div className="text-[44px] text-[#333333] font-bold leading-[53px]">{t('draw-light-speed')}</div>
            <Progress onChange={handlePlayDrawSpeed} />
          </div>
          <div className="flex items-center justify-between mb-[20px]">
            <div className="h-[96px] bg-[#D7DCE1] rounded-[48px] flex justify-center items-center text-[36px] leading-[50px] text-[#333333] font-semibold flex-1">
              {t('preview')}
            </div>
            <div
              className="h-[96px] bg-[#F7E54C] rounded-[48px] flex justify-center items-center text-[36px] leading-[50px] text-[#333333] font-semibold flex-1 ml-[16px]"
              onClick={handleSaveCollection}
            >
              {t('save')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Draw;
