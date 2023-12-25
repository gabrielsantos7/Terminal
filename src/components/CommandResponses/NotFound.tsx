const NotFound = () => {
  return (
    <>
      <br /> <br />
      <span className='color-main-red'>
        Command not found. For a list of commands, type{' '}
        <span className='command'>'help'</span>
      </span>
      <br /> <br />
    </>
  );
};

export default NotFound;
