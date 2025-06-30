//import { ScrollArea } from "@mantine/core";
import * as React from "react";

export interface IRenderTableProps {
  tableResults: any;
}

export const RenderTable: React.FunctionComponent<IRenderTableProps> = (
  props
) => {
  return (
    <p>
      As Mega Charizard X, its body and legs are more physically fit, though its
      arms remain thin. Its skin turns black with a sky-blue underside and
      soles. Two spikes with blue tips curve upward from the front and back of
      each shoulder, while the tips of its horns sharpen, turn blue, and curve
      slightly upward. Its brow and claws are larger, and its eyes are now red.
      It has two small, fin-like spikes under each horn and two more down its
      lower neck. The finger disappears from the wing membrane, and the lower
      edges are divided into large, rounded points. The third joint of each
      wing-arm is adorned with a claw-like spike. Mega Charizard X breathes blue
      flames out the sides of its mouth, and the flame on its tail now burns
      blue. It is said that its new power turns it black and creates more
      intense flames.
    </p>
  );
};
