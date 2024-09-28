import ITourStep from "../model/ITourStep";
import { ITourStepConfig } from "./ITourProps";

export class TourHelper {

  public static getTourSteps(settings: ITourStepConfig[]): ITourStep[] {

    const result: ITourStep[] = new Array<ITourStep>();

    if (settings !== undefined) {
      settings.forEach(ele => {
        if (ele.Enabled) {
          result.push(
            {
              selector: '[data-sp-feature-instance-id=\'' + ele.WebPart + '\']',
              content: ele.StepDescription
            });
        }
      });

    }
    return result;
  }

}
