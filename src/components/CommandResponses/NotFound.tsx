const NotFound = () => {
  return (
    <div className='response'>
      <span className='color-main-red'>
        Command not found. For a list of commands, type{' '}
        <span className='command'>'help'</span>
      </span>
    </div>
  );
};

export default NotFound;
