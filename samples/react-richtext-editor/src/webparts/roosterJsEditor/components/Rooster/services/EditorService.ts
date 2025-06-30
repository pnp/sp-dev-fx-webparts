import { createModelFromHtml, Editor } from "roosterjs-content-model-core";
import { EditorCore } from "roosterjs-content-model-types";

class EditorService extends Editor {
  constructor(editorDiv: HTMLDivElement) {
    super(editorDiv);
  }

  public getEditorCore(): EditorCore {
    return this.getCore();
  }

  public setContentModel(content: string): void {
    const core = this.getEditorCore();
    const model = createModelFromHtml(content);
    core.api.setContentModel(core, model);
  }
}

export default EditorService;
