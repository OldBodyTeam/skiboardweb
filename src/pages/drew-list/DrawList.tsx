import backIcon from '@assets/icon/back.png';
import deleteIcon from '@assets/icon/delete-copy.png';
import DrawItem from '@pages/draw/DrawItem';
const DrawList = () => {
  const handleGoBack = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ goPage: 'Home', screen: 'DesignScreen' }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ goPage: 'Home', screen: 'DesignScreen' }));
    }
  };
  const handleEditLight = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ goPage: 'EditLight' }));
    } else {
      const postMessage = window.parent.postMessage;
      postMessage(JSON.stringify({ goPage: 'EditLight' }));
    }
  };
  return (
    <div className="w-screen h-screen bg-[rgba(19,20,22,1)]">
      <div className="flex items-center justify-between mb-[20px] relative h-[148px] px-[32px]">
        <div
          className="bg-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-full w-[82px] h-[82px]"
          onClick={handleGoBack}
        >
          <img src={backIcon} className="w-[32px] h-[32px] inline-block" />
        </div>
        <div className="text-[40px] text-white font-bold">My Effects</div>
        <div className="text-[28px] text-white font-bold" onClick={handleEditLight}>
          Edit
        </div>
      </div>
      <div className="px-[5px] flex flex-wrap items-center">
        {[[[{ selectStatus: true }]]].map((itemData, index) => {
          return (
            <div
              key={index}
              className="m-[5px] rounded-[60px] h-[434px] bg-[rgba(52,53,54,0.3)] w-[calc((100vw-30px)/2)] px-[24px] pt-[24px] pb-[32px] flex flex-col justify-between"
            >
              <div className="w-full h-full bg-[rgba(118,118,118,0.1)] rounded-[40px] relative">
                <div className="flex justify-center items-center flex-col">
                  {itemData.map((item, x) => {
                    return (
                      <div className="flex justify-center items-center" key={x}>
                        {item.map((v, y) => {
                          return <DrawItem x={x} y={y} key={x + y} selectStatus={v.selectStatus} />;
                        })}
                      </div>
                    );
                  })}
                </div>
                <img src={deleteIcon} alt="deleteIcon" className="absolute top-0 right-0 w-[56px] h-[56px]" />
              </div>
              <div className="text-white text-[28px] text-center mt-[32px]">Smiling Face</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DrawList;
