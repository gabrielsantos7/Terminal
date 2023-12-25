import { getCurrentTime } from "../helper";

const Username = () => {
  return (
    <>
      <span className='datetime color-white'>{getCurrentTime()}</span>
      <span className='username'>
        visitor@terminal.com:<span className='color-main-blue'>~</span>
        <span className='color-white'>$</span>
      </span>
    </>
  );
};

export default Username;
