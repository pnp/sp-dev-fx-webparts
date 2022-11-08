import * as React from 'react';
import { createPortal } from 'react-dom';

const PortalIframe = ({
  children,
  ...props
}) => {
  const [contentRef, setContentRef] = React.useState(null);

  const mountWindow = contentRef?.contentWindow;
  const mountNode = contentRef?.contentWindow?.document?.body;

  // Pass the props to the child iframe
  if (mountWindow) mountWindow.props = props;

  return (
    <iframe width={props.width} height={props.height} style={{border:0}} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default PortalIframe;