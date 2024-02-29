import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { collectionDetailState, collectionName } from 'src/stores/collection-detail/collectionDetail.atom';
import { CollectionStateType, collectionState } from 'src/stores/collection/collection.atom';

const usePostMessage = () => {
  const [, setCollectionInfo] = useRecoilState(collectionState);
  const [, setCollectionDetailInfo] = useRecoilState(collectionDetailState);
  const [, setCollectionName] = useRecoilState(collectionName);
  useEffect(() => {
    const listen = (
      e: MessageEvent<
        | { type: 'setCollection'; webData: CollectionStateType[] }
        | { type: 'setCollectionDetail'; webData: CollectionStateType }
        | { type: 'modifyCollectionName'; webData: { name: string } }
      >,
    ) => {
      switch (e.data.type) {
        case 'setCollection':
          setCollectionInfo(e.data.webData);
          return;
        case 'setCollectionDetail':
          setCollectionName(e.data.webData.name);
          setCollectionDetailInfo(e.data.webData);
          return;
        case 'modifyCollectionName':
          setCollectionName(e.data.webData.name);
          return;
        default:
      }
    };
    window.addEventListener('message', listen, false);
    return () => {
      window.removeEventListener('message', listen, false);
    };
  }, [setCollectionDetailInfo, setCollectionInfo, setCollectionName]);
};
export default usePostMessage;
