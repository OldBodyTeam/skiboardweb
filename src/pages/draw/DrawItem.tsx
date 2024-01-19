import { FC, CSSProperties } from 'react';

export type DrawItemProps = FC<{
  x: number;
  y: number;
  handleSelected?: (x: number, y: number) => void;
  selectStatus: boolean;
  style?: CSSProperties;
  selectedColor?: string;
  color?: string;
}>;
const DrawItem: DrawItemProps = (props) => {
  const {
    x,
    y,
    handleSelected,
    selectStatus,
    style,
    selectedColor = 'bg-[rgba(251,228,0,1)]',
    color = 'bg-[rgba(255,255,255,0.15)]',
  } = props;
  return (
    <div
      className={`w-[40px] h-[40px] rounded-full ${selectStatus ? selectedColor : color}`}
      style={style}
      onClick={() => {
        handleSelected?.(x, y);
      }}
    />
  );
};
export default DrawItem;
