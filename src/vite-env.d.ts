/// <reference types="vite/client" />
declare interface Window {
  ReactNativeWebView: {
    postMessage: (a: string) => void;
  };
}
