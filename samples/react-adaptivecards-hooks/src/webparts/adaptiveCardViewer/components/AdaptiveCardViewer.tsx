import * as React from 'react';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

import { AppContext } from '../../../services/AppContext';
import { AdaptiveCardHost } from '../../../controls/AdaptiveCardHost/AdaptiveCardHost';

export const AdaptiveCardViewer: React.FunctionComponent = () => {

  // get the state object from context
  const { acViewerState } = React.useContext(AppContext);


  const [showSpinner, setShowSpinner] = React.useState(false);

  React.useEffect(() => {
    console.log(`AdaptiveCardViewer.useEffect[acViewerState]`);

    if (acViewerState.isLoading) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }

  }, [acViewerState]);

  return (
    <>
      {showSpinner &&
        <Spinner styles={{ root: { padding: "2*5px 5px", textAlign: "center" } }} size={SpinnerSize.large} label="Loading..." ariaLive="assertive" />
      }

      {!showSpinner &&
        <AdaptiveCardHost themeVariant={acViewerState.themeVariant}
          template={acViewerState.templateJSON}
          data={acViewerState.dataJSON}
          useTemplating={acViewerState.useTemplating} />
      }
    </>
  );
};
