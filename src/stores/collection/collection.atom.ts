import { CollectionEntity } from '@services/data-contracts';
import { atom } from 'recoil';
export type CollectionStateType = {
  frameList: { selected: boolean; frame: number[][] }[];
} & Omit<CollectionEntity, 'frameList'>;
const collectionState = atom<CollectionStateType[] | undefined>({
  key: 'collectionState',
  default: [],
});
export { collectionState };
