import { FC } from 'react';

export type ButtonBgProps = {
  icon: string;
  handleOptions: () => void;
  selected: boolean;
};
const ButtonBg: FC<ButtonBgProps> = (props) => {
  const { handleOptions, icon, selected } = props;
  return (
    <div
      onClick={handleOptions}
      className="w-[62px] h-[62px] mr-[8px] rounded-[62px]"
      style={{ background: selected ? '#F7E54A' : '#FFFFFF' }}
    >
      <img src={icon} alt="magicIcon" className="w-full h-full rounded-full" />
    </div>
  );
};
export default ButtonBg;
