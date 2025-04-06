import { insertImage } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

function createInput(doc: Document): HTMLInputElement {
  const input = doc.createElement("input");

  input.type = "file";
  input.accept = "image/*";
  input.setAttribute("display", "none");

  return input;
}

/**
 * "Insert image" button on the format ribbon
 */
export const InsertImageButton: RibbonItem = {
  key: "buttonNameInsertImage",
  text: "Insert image",
  iconName: "imageIcon",
  type: "button",
  onClick: (editor) => {
    const document = editor.getDocument();
    const fileInput = createInput(document) as HTMLInputElement;
    document.body.appendChild(fileInput);

    fileInput.addEventListener("change", () => {
      if (fileInput.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
          insertImage(editor, fileInput.files[i]);
        }
      }
    });

    try {
      fileInput.click();
    } finally {
      document.body.removeChild(fileInput);
    }
  },
};
