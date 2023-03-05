
interface IHtmlUtils {
  getTextFromHtml: (html: string) => string;
}
export  const useHtmlUtils = ():IHtmlUtils => {

  const getTextFromHtml = (html: string):string => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || undefined;
  };
  return {getTextFromHtml}
};
