
import * as React from 'react';
import { useEffect, useState } from 'react';


interface ChatDisplayProps {
  token: string;
  domain: string;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ token, domain }) => {
  const [directLine, setDirectLine] = useState<any>(null);

  useEffect(() => {
    const createDirectLine = async () => {
      const directLineInstance = (window as any).WebChat.createDirectLine({
        token: token,
        domain: `${domain}v3/directline`,
      });
      setDirectLine(directLineInstance);
    };

    createDirectLine();
   
  }, [token, domain]);

  useEffect(() => {
    if (directLine) {
       // eslint-disable-next-line no-console
      console.log('directLine:', directLine);
    }
      
  }, [directLine]);

  return <div id="webchat" />;
};

export default ChatDisplay;