/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import {
  format,
  parseISO,
} from 'date-fns';

const getDir = (radian: number, width: number, height: number): { x0: number; y0: number; x1: number; y1: number } => {
  const HALF_WIDTH = width * 0.5;
  const HALF_HEIGHT = height * 0.5;
  const lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
  const HALF_LINE_LENGTH = lineLength / 2;

  const x0 = HALF_WIDTH + Math.sin(radian) * HALF_LINE_LENGTH;
  const y0 = HALF_HEIGHT - Math.cos(radian) * HALF_LINE_LENGTH;
  const x1 = width - x0;
  const y1 = height - y0;

  return { x0, x1, y0, y1 };
};

export const useUtils = () => {
  const getTruncateText = React.useCallback((text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  }, []);

  const getShortText = React.useCallback((text: string, length: number) => {
    if (text.length > length) {
      //  const numberCharsToCut = 6;
      const first = text.substring(0, length / 2);
      const last = text.substring(text.length - length / 2, text.length);

      const newText = first.trimEnd() + "..." + last.trimStart();
      return newText;
    }
    return text;
  }, []);

  const getFileExtension = React.useCallback((fileName: string | undefined): string | undefined => {
    return fileName?.split(".").pop();
  }, []);

  const getFileSize = React.useCallback((size: number): string => {
    if (size < 1024) {
      return size + " bytes";
    } else if (size < 1048576) {
      return (size / 1024).toFixed(2) + " KB";
    } else if (size < 1073741824) {
      return (size / 1048576).toFixed(2) + " MB";
    } else {
      return (size / 1073741824).toFixed(2) + " GB";
    }
  }, []);

  const getTimeFromDate = React.useCallback((date: string): string => {
    try {
      if (date) {
        return format(parseISO(date), "dd MMM, p");
      }
      return "";
    } catch (error) {
      console.log(["getTimeFromDate"], error);

      return "";
    }
  }, []);

  const isDateSameDayAndMonth = (dateLeft: Date, dateRight: Date): boolean => {
    if (!dateLeft && !dateRight) {
      return false;
    }
    const dateLeftDay = format(dateLeft, "d");
    const dateLeftMonth = format(dateLeft, "M");
    const dateRightDay = format(dateRight, "d");
    const dateRightMonth = format(dateRight, "M");

    if (dateLeftDay === dateRightDay && dateLeftMonth === dateRightMonth) {
      return true;
    } else {
      return false;
    }
  };

  const convertBackgroundCssLinearGradientToImage = React.useCallback(
    (cssLinearGradient: string, width: number, height: number): string => {
      const split = cssLinearGradient.split("rgba");
      const rba1full = split[1].trim();
      const rba2full = split[2].trim();
      const rba1 = rba1full.substring(0, rba1full.indexOf(")") + 1);
      const rba2 = rba2full.substring(0, rba2full.indexOf(")") + 1);
      const div = document.createElement("div");
      div.style.width = width + "px";
      div.style.height = height + "px";
      div.style.background = cssLinearGradient;
      const canvaspng = document.createElement("canvas");
      canvaspng.width = width;
      canvaspng.height = height;

      const ctx = canvaspng?.getContext("2d");

      if (ctx) {
        const w = width;
        const h = height;
        const cssAng = 180;
        const dir = getDir(cssAng, w, h);
        const gr = ctx.createLinearGradient(dir.x0, dir.y0, dir.x1, dir.y1);
        gr.addColorStop(0, `rgba${rba1}`);
        gr.addColorStop(1, `rgba${rba2}`);
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const dataUrl = canvaspng.toDataURL("image/png");
        return dataUrl;
      }
    },
    []
  );

  return {
    convertBackgroundCssLinearGradientToImage,
    getFileSize,
    getTruncateText,
    getTimeFromDate,
    getShortText,
    getFileExtension,
    isDateSameDayAndMonth,
  };
};
