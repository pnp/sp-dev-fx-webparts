import {ITreeChildren } from './ITreeChildren';
export interface ITreeData {
   title: any;
   expanded ?: boolean;
   children ? : ITreeChildren[];
}
