import { CollectionEntity } from '@services/data-contracts';
import { atom } from 'recoil';
export type CollectionStateType = {
  frameList: { selected: boolean; frame: number[][] }[];
} & Omit<CollectionEntity, 'frameList'>;
const collectionDetailState = atom<CollectionStateType | undefined>({
  key: 'collectionDetailState',
  default: undefined,
});
const collectionName = atom<string>({
  key: 'collectionName',
  default: 'Smiling Face',
});
export { collectionDetailState, collectionName };
