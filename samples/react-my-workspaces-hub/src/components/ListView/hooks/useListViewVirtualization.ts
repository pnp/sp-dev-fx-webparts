import * as React from 'react';
import { useStaticVirtualizerMeasure } from '@fluentui/react-virtualizer';
import type { TFlatRow } from '../internal/types';

/** Inputs to the virtualization sizer used by the table body. */
export interface IListViewVirtualizationInput<TItem> {
  flatRows: TFlatRow<TItem>[];
  rowHeight: number;
}

/** Output bag plus the per-row size resolver. */
export interface IListViewVirtualizationResult {
  scrollRef: (instance: HTMLDivElement | null) => void;
  containerSizeRef: React.MutableRefObject<number>;
  virtualizerLength: number;
  bufferItems: number;
  bufferSize: number;
  /** Returns the height (px) of the row at `index`. Pass to `<Virtualizer getItemSize>`. */
  getItemSize: (index: number) => number;
}

/**
 * Static virtualization measurement for the ListView body. All rows share a
 * uniform `rowHeight`; `getItemSize` is provided for `<Virtualizer>` API
 * compatibility and always returns that height.
 */
export const useListViewVirtualization = <TItem,>(
  input: IListViewVirtualizationInput<TItem>
): IListViewVirtualizationResult => {
  const { rowHeight } = input;

  const measure = useStaticVirtualizerMeasure({
    defaultItemSize: rowHeight,
    direction: 'vertical'
  });

  const getItemSize = React.useCallback((): number => rowHeight, [rowHeight]);

  return {
    scrollRef: measure.scrollRef as unknown as (instance: HTMLDivElement | null) => void,
    containerSizeRef: measure.containerSizeRef,
    virtualizerLength: measure.virtualizerLength,
    bufferItems: measure.bufferItems,
    bufferSize: measure.bufferSize,
    getItemSize
  };
};
