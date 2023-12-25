import { IUsernameProps } from "../models";


const Username = ({currentTime}: IUsernameProps) => {
  return (
    <>
      <span className='datetime color-white'>{currentTime}</span>
      <span className='username'>
        visitor@terminal.com:<span className='color-main-blue'>~</span>
        <span className='color-white'>$</span>
      </span>
    </>
  );
};

export default Username;
