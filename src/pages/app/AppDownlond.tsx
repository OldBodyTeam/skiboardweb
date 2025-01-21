import { Button, Flex } from 'antd';
import { QRCodeCanvas } from 'qrcode.react';
const AppDownload = () => {
  const handleAppDownload = () => {
    window.open('/Lumii.apk');
  };
  return (
    <Flex vertical justify="center" align="center" className="w-screen h-screen">
      <Button onClick={handleAppDownload} type="link">
        下载APP
      </Button>
      <div className=" items-center justify-center space-x-4 mt-6 hidden">
        <div className="flex flex-col justify-center items-center">
          <QRCodeCanvas value={location.origin + '/Lumii.apk'} />
          <div className="text-xs mt-2">Android Download </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <QRCodeCanvas value={'itms-apps://itunes.apple.com/app/idYOUR_APP_ID'} />
          <div className="text-xs  mt-2">IOS Download </div>
        </div>
      </div>
    </Flex>
  );
};
export default AppDownload;
