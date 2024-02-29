const handlePostMessage = (type: string, data: Record<string, unknown>) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, ...data }));
  } else {
    const postMessage = window.parent.postMessage;
    postMessage(JSON.stringify({ type, ...data }));
  }
};
export { handlePostMessage };
