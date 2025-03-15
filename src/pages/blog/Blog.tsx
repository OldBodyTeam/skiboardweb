const Blog = () => {
  return (
    <div className="p-4 flex flex-col h-screen space-y-2 bg-[#131416]">
      <div className="rounded-2xl overflow-hidden">
        <video controls autoPlay>
          <source src="https://ski-music.oss-cn-beijing.aliyuncs.com/video/20250315-202451.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="rounded-2xl overflow-hidden">
        <video controls autoPlay>
          <source src="https://ski-music.oss-cn-beijing.aliyuncs.com/video/20250315-2027471.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="w-full flex-1 rounded-2xl overflow-hidden">
        <iframe
          src="https://ski-music.oss-cn-beijing.aliyuncs.com/docs/%E8%AF%B4%E6%98%8E%E4%B9%A6%E6%9C%80%E7%BB%88%E8%AE%BE%E8%AE%A11220.pdf"
          frameBorder="none"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};
export default Blog;
