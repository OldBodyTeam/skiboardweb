import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import './style.less';
import sliderItem from '@assets/icon/slider-item.png';
import { FC, useMemo, useRef, useState } from 'react';
import { useMemoizedFn, useSize } from 'ahooks';
const Progress: FC<{ onChange: (index: number) => void }> = (props) => {
  const { onChange } = props;
  const [{ x }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const containerRef = useRef(null);
  const containerSize = useSize(containerRef);
  const fatherRef = useRef(null);
  const fatherSize = useSize(fatherRef);
  const imgRef = useRef(null);
  const imgSize = useSize(imgRef);
  const distance = useMemo(() => {
    return (containerSize?.width ?? 0) - (imgSize?.width ?? 0);
  }, [containerSize?.width, imgSize?.width]);
  const [currentOptIndex, setCurrentOptIndex] = useState(0);
  const handleChangeIndex = useMemoizedFn((index: number) => {
    setCurrentOptIndex(index);
    onChange(index);
  });
  const leftDistance = useMemo(() => {
    return ((fatherSize?.width ?? 0) - (containerSize?.width ?? 0)) / 2;
  }, [fatherSize, containerSize]);
  const bind = useDrag(
    ({ offset: [ox], dragging }) => {
      api.start({ x: ox });
      if (!dragging) {
        const itemWidth = (containerSize?.width ?? 0) / 5;
        const index = Math.round(ox / itemWidth);
        handleChangeIndex(index);
        api.start({ x: itemWidth * index });
      }
    },
    { axis: 'x', pointer: { touch: true }, filterTaps: true, bounds: { right: distance, left: leftDistance } },
  );
  return (
    <div className="progress-container" ref={fatherRef}>
      <div className="flex-1 items-center justify-center flex" ref={containerRef}>
        {[0, 1, 2, 3, 4].map((v) => {
          return (
            <div
              className="flex items-center justify-center flex-1 z-10 pointer-events-none text-[28px]"
              style={{ color: currentOptIndex === v ? 'white' : 'black' }}
              key={v}
            >
              {v}
            </div>
          );
        })}
        <animated.div {...bind()} className={'absolute left-[32px] top-[-13px]'} style={{ x }}>
          <img src={sliderItem} alt="sliderItem" className="w-[88px] h-[110px] inline-block" ref={imgRef} />
        </animated.div>
      </div>
    </div>
  );
};
export default Progress;
