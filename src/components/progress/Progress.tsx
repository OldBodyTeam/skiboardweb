import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import './style.less';
import sliderItem from '@assets/icon/slider-item.png';
import { useMemo, useRef } from 'react';
import { useSize } from 'ahooks';
const Progress = () => {
  const [{ x }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const containerRef = useRef(null);
  const containerSize = useSize(containerRef);
  const imgRef = useRef(null);
  const imgSize = useSize(imgRef);
  const distance = useMemo(() => {
    return (containerSize?.width ?? 0) - (imgSize?.width ?? 0);
  }, [containerSize?.width, imgSize?.width]);
  const bind = useDrag(
    ({ offset: [ox], dragging }) => {
      api.start({ x: ox });
      if (!dragging) {
        const itemWidth = (containerSize?.width ?? 0) / 5;
        const index = Math.round(ox / itemWidth);
        api.start({ x: itemWidth * index });
      }
    },
    { axis: 'x', pointer: { touch: true }, filterTaps: true, bounds: { right: distance, left: 0 } },
  );
  return (
    <div className="progress-container" ref={containerRef}>
      {[0, 1, 2, 3, 4].map((v) => {
        return <div className="flex items-center justify-center flex-1">{v}</div>;
      })}
      <animated.div {...bind()} className={'absolute left-0 top-0'} style={{ x }}>
        <img src={sliderItem} alt="sliderItem" className="w-[87px] h-[109px] inline-block" ref={imgRef} />
      </animated.div>
    </div>
  );
};
export default Progress;
