const Banner = () => {
  const asciiLines = [
      `  ________      ___.         .__       .__      _________              __                `,
    ' /  _____/_____ \_ |_________|__| ____ |  |    /   _____/____    _____/  |_  ____  ______',
    '/   \  ___\__  \ | __ \_  __ \  |/ __ \|  |    \_____  \\__  \  /    \   __\/  _ \/  ___/',
    '\    \_\  \/ __ \| \_\ \  | \/  \  ___/|  |__  /        \/ __ \|   |  \  | (  <_> )___ \ ',
    ' \______  (____  /___  /__|  |__|\___  >____/ /_______  (____  /___|  /__|  \____/____  >',
    '        \/     \/    \/              \/               \/     \/     \/                \/ ',
  ];

  return (
    <div className='ascii-art'>
      {asciiLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default Banner;
