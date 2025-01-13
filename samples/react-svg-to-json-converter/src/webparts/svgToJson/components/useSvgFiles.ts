import { useState, useEffect } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { fetchSvgFiles } from './svgService';

export const useSvgFiles = (siteUrl: string, libraryName: string, context: WebPartContext) => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const svgFiles = await fetchSvgFiles(siteUrl, libraryName, context);
        setFiles(svgFiles);
      } catch (error) {
        setError(error.message);
      }
    };

    if (siteUrl && libraryName) {
      fetchFiles();
    }
  }, [siteUrl, libraryName, context]);

  return { files, error };
};