import * as React from 'react';
import styles from './DocuGenie.module.scss';
import type { IDocuGenieProps } from './IDocuGenieProps';
import { UploadOutlined, RedoOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { Button, Card, List, message, notification, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { NotificationConfig, NotificationPlacement } from 'antd/es/notification/interface';
import { MarkdownRenderer } from './MarkdownRenderer';


const DocuGenie: React.FC<IDocuGenieProps> = (props) => {
  const {
    hasTeamsContext,
  } = props;



  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ sender: string; message: string, timestamp: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const config: NotificationConfig =
  {
    placement: 'bottom',
    duration: 3,
    bottom: 100,
    prefixCls: 'ant-notification',
    maxCount: 3,
    rtl: false,
    stack: true,
    showProgress: true,
    closeIcon: <RedoOutlined />,
  };


  const [api, contextHolder] = notification.useNotification(config);




  const openNotification = (placement: NotificationPlacement, message: string) => {
    api.success({
      message: message,
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
  };

  // Handle file upload
  const handleFileUpload = (file: File): boolean => {
    setFile(file);
    openNotification('bottom', `${file.name} file attached successfully.`)
    //message.success(`${file.name} file uploaded successfully.`);
    return false; // Prevent default upload behavior
  };

  // Handle question submission
  const handleQuestionSubmit = async (): Promise<void> => {
    if (!file || !question) {
      message.error('Please upload a file and enter a question.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('question', question);

    try {
      const response = await fetch('http://localhost:7210/api/DocumentChat', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from Azure Function.');
      }

      const result = await response.json();
      const { question, answer } = result;
      const timestamp = new Date().toLocaleString();
      setChatHistory([
        ...chatHistory,
        { sender: 'User', message: question, timestamp },
        { sender: 'Docu Genie', message: answer, timestamp },
      ]);
      setQuestion(''); // Clear the question input
    } catch (error) {
      message.error('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset chat
  const resetChat = (): void => {
    setFile(null);
    setQuestion('');
    setChatHistory([]);
    message.info('Chat has been reset.');
  };

  return (
    <>
      {contextHolder}
      <section className={`${styles.docuGenie} ${hasTeamsContext ? styles.teams : ''}`}>
        <Card title="Chat with Docu Genie" className={styles.chatContainer} extra={<Button shape="circle" icon={<RedoOutlined />} onClick={resetChat} />} styles={{
          header: {
            backgroundColor: '#e91e63',
            borderBottom: '1px solid #e8e8e8',
            fontSize: '1.4rem',
            color: '#fff',
            fontWeight: 400
          },
          body: {
            border: '1px solid #e8e8e8',
            borderRadius: '5px',
          }
        }}>
          <div className={styles.chatWindow}>
            <List
              dataSource={chatHistory}
              renderItem={(item) => (
                <List.Item className={item.sender === 'User' ? styles.userMessageContainer : styles.aiMessageContainer}>
                  <div className={item.sender === 'User' ? styles.userMessage : styles.aiMessage}>
                    {/* <strong>{item.sender}</strong> */}
                    <div className={styles.timestamp}>{item.timestamp}</div>
                    
                    {item.sender === 'User' ? <div>{item.message}</div> : <MarkdownRenderer markdownContent={item.message} />}                    

                  </div>
                </List.Item>
              )}
            />
          </div>

          <div className={styles.inputSection}>
            <TextArea
              rows={2}
              placeholder="Ask a question about the file..."
              value={question}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
            />

            <Button
              onClick={handleQuestionSubmit}
              size="large"
              loading={isLoading}
              disabled={!file || !question}
            >
              Submit
            </Button>
          </div>
          <div className={styles.uploadSection}>

            <Upload
              beforeUpload={handleFileUpload}
              showUploadList={false}
              accept=".pdf,.docx,.txt"
            >

              <Button
                type="primary"
                icon={<UploadOutlined />}
              >
                Attach file
              </Button>

            </Upload>
            {file && <div className={styles.fileName}>{file.name}</div>}
          </div>
        </Card>

      </section>
    </>
  );
};

export default DocuGenie;