/// <reference types="vite/client" />
declare interface Window {
  ReactNativeWebView: {
    postMessage: (a: string) => void;
  };
  getDrawTitle: (name: string) => void;
  getCollectionList: (data: CollectionType) => void;
}
