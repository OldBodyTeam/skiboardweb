import { FC } from 'react';

export type ButtonShadowProps = {
  icon: string;
  handleOptions: () => void;
};
const ButtonShadow: FC<ButtonShadowProps> = (props) => {
  const { icon, handleOptions } = props;
  return (
    <div onClick={handleOptions} className="w-[62px] h-[62px] mr-[8px] active:opacity-30">
      <img src={icon} alt="icon-opt" className="w-full h-full rounded-full" />
    </div>
  );
};
export default ButtonShadow;
