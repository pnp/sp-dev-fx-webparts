import * as React from "react";
//import styles from "./SmartDevOps.module.scss";
import { ISmartDevOpsProps } from "./ISmartDevOpsProps";
import AzureDevOpsService from "../../../services/AzureDevOpsService";
import "react-chat-elements/dist/main.css";
// MessageBox component
import { MessageList } from "react-chat-elements";
import { IChatMessage, IWorkItem } from "../../../interfaces/webpart.types";
import {
  getStyles,
  loadingSpinnerStyles,
  sendChatTextFiledStyles,
} from "./styles";
import { TextField } from "@fluentui/react/lib/TextField";
import {
  getSystemMessage,
  getUserMessage,
} from "../../../helpers/openaiHelpers";
import {
  DEVOPS_BOT_NAME,
  FUNCTIONS,
  SYSTEM_MESSAGE,
  TRY_LATER_MESSAGE,
} from "../../../constants/OpenAPIConstants";
import { useOpenAI } from "../../../hooks";
import { IconButton, Spinner, SpinnerSize } from "@fluentui/react";
import DevOpsMapper, {
  mapDevOpsBugs,
  mapDevOpsTasks,
} from "../../../mapper/DevOpsMapper";
import TaskList from "./TaskList/TaskList";
import parse from "html-react-parser";
import { Placeholder } from "@pnp/spfx-controls-react";
import * as strings from "SmartDevOpsWebPartStrings";
import { AppConstants } from "../../../constants/AppConstants";
import BugList from "./BugList/BugList";
import CommitList from "./CommitList/CommitList";
import {
  Divider,
  Grid,
  Header,
  Label,
  List,
  Message,
  Segment,
} from "semantic-ui-react";

const firstChatMessage: IChatMessage = {
  position: "left",
  type: "text",
  title: DEVOPS_BOT_NAME,
  text: (
    <>
      Hi, I am the <b>DevOps Bot</b>. I can help you with queries about the
      Azure DevOps tasks. Please type your query below.
    </>
  ),
  date: new Date(),
  focus: true,
};
export const SmartDevOps: React.FC<ISmartDevOpsProps> = (props) => {
  const systemMessage = getSystemMessage(SYSTEM_MESSAGE);

  const { httpClient, organizationName, openAPIKey, context } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [chatMessages, setChatMessages] = React.useState<IChatMessage[]>([
    firstChatMessage,
  ]);
  const [openaiMessages, setOpenaiMessages] = React.useState<any[]>([
    systemMessage,
  ]);

  const { callOpenAI } = useOpenAI(httpClient);

  const chatStyles = getStyles();

  // function to show tasks list
  const showDevOpsTasksMessage = (finalResponse: any) => {
    const newChatMessage = {
      position: "left",
      type: "text",
      title: DEVOPS_BOT_NAME,
      text: <TaskList tasks={finalResponse} />,
      date: new Date(),
      className: chatStyles.chatMessage,
      focus: true,
    };
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      newChatMessage,
    ]);
  };
  // function to show bugs list
  const showDevOpsBugsMessage = (finalResponse: any) => {
    const newChatMessage = {
      position: "left",
      type: "text",
      title: DEVOPS_BOT_NAME,
      text: <BugList bugs={finalResponse} />,
      date: new Date(),
      className: chatStyles.chatMessage,
      focus: true,
    };
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      newChatMessage,
    ]);
  };
  // function to recent commits
  const showRecentCommitsMessage = (
    finalResponse: any,
    respositoryName: string
  ) => {
    const newChatMessage = {
      position: "left",
      type: "text",
      title: DEVOPS_BOT_NAME,
      text: (
        <CommitList commits={finalResponse} respositoryName={respositoryName} />
      ),
      date: new Date(),
      className: chatStyles.chatMessage,
      focus: true,
    };
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      newChatMessage,
    ]);
  };

  // function to show generic message
  const showMessage = (finalResponse: any) => {
    const newChatMessage = {
      position: "left",
      type: "text",
      title: DEVOPS_BOT_NAME,
      text: parse(finalResponse),
      date: new Date(),
      className: chatStyles.chatMessage,
      focus: true,
    };
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      newChatMessage,
    ]);
  };

  async function callFunction(functionName: string, functionArguments: any) {
    let functionResult;

    if (functionName === "getAssignedTasks") {
      const workItems: IWorkItem[] = await AzureDevOpsService.getAssignedTasks(
        functionArguments.projectName,
        organizationName
      );
      functionResult = workItems.map(mapDevOpsTasks);
    }
    if (functionName === "getAssignedBugs") {
      const workItems: IWorkItem[] = await AzureDevOpsService.getAssignedBugs(
        functionArguments.projectName,
        organizationName
      );
      functionResult = workItems.map(mapDevOpsBugs);
    }
    if (functionName === "getRecentCommitsAsync") {
      const commitResponse: IWorkItem[] =
        await AzureDevOpsService.getRecentCommitsAsync(
          functionArguments.projectName,
          functionArguments.repositoryName,
          organizationName
        );

      functionResult = commitResponse
        ? commitResponse.map((t: any) => DevOpsMapper.mapDevOpsCommits(t))
        : [];
    }
    return functionResult;
  }

  // function to process the response from OpenAI
  const processResponse = async (response: any) => {
    console.log(response);

    // if response is null or undefined then show an error message
    if (response === null || response === undefined) {
      showMessage(TRY_LATER_MESSAGE);
      return;
    }

    try {
      const response_finish_reason = response.choices[0].finish_reason;

      switch (response_finish_reason) {
        case "stop": {
          const responseText = response.choices[0].message.content;
          showMessage(responseText);
          break;
        }
        case "function_call": {
          const function_name = response.choices[0].message.function_call.name;
          const function_arguments =
            response.choices[0].message.function_call.arguments;
          const function_arguments_json = JSON.parse(function_arguments);

          switch (function_name) {
            case "getAssignedTasks": {
              const functionResult: any = await callFunction(
                function_name,
                function_arguments_json
              );
              showDevOpsTasksMessage(functionResult);
              break;
            }
            case "getAssignedBugs": {
              const functionResult: any = await callFunction(
                function_name,
                function_arguments_json
              );
              showDevOpsBugsMessage(functionResult);
              break;
            }
            case "getRecentCommitsAsync": {
              const functionResult: any = await callFunction(
                function_name,
                function_arguments_json
              );
              showRecentCommitsMessage(
                functionResult,
                function_arguments_json.repositoryName
              );
              break;
            }
            case "showFunnyMessage": {
              const funnyMessage = function_arguments_json.funnyMessage;
              showMessage(funnyMessage);
              break;
            }
            default:
              showMessage(TRY_LATER_MESSAGE);
              break;
          }
          break;
        }
        default:
          showMessage(TRY_LATER_MESSAGE);
      }
    } catch (error) {
      console.log(error);
      showMessage(TRY_LATER_MESSAGE);
    }
  };

  // function to send a message to OpenAI and get a response
  const onSendClick = async () => {
    setLoading(true);

    // add the user message to the chatMessages array
    const newChatMessage: IChatMessage = {
      position: "right",
      type: "text",
      title: "You",
      text: query,
      date: new Date(),
      status: "read",
    };

    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      newChatMessage,
    ]);
    const userMessage = getUserMessage(query);
    setOpenaiMessages((prevMessages) => [...prevMessages, userMessage]);

    // clear the text field
    setQuery("");
  };

  // function to handle the text change in the text field
  const onTextChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setQuery(newValue || "");
  };

  // function to handle the key press in the text field
  const onKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      // if query is empty, then return
      if (query === "") {
        return;
      }
      await onSendClick();
    }
  };

  // function to scroll to the bottom of the chat window
  const scrollToBottom = () => {
    const chatWindow = document.getElementsByClassName("rce-mlist")[0];
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  const _onConfigure = () => {
    // Context of the web part
    context.propertyPane.open();
  };

  // useEffect scroll to the bottom of the chat window when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // useEffect to call OpenAI when openaiMessages change
  React.useEffect(() => {
    // if openaiMessages is empty or has only one message, then return
    if (openaiMessages.length === 0 || openaiMessages.length === 1) {
      return;
    }

    const handleOpenAIResponse = async () => {
      setLoading(true);
      const response = await callOpenAI(openaiMessages, FUNCTIONS);
      await processResponse(response);
      setLoading(false);
    };

    handleOpenAIResponse().catch((error) => {
      console.log(error);
      setLoading(false);
      showMessage(TRY_LATER_MESSAGE);
    });
  }, [openaiMessages]);

  if (!organizationName || !openAPIKey) {
    return (
      <Placeholder
        iconName="Edit"
        iconText={strings.PlaceholderIconText}
        description={strings.PlaceholderDescription}
        buttonLabel={strings.PlaceholderButtonLabel}
        onConfigure={_onConfigure}
      />
    );
  } else {
    // Set the constant value dynamically
    AppConstants.setDevOpsOrganization(organizationName);
    AppConstants.setOpenAIKey(openAPIKey);
  }

  return (
    <Grid container style={{ padding: "3em 0em" }}>
      <Grid.Row>
        <Grid.Column>
          <Message style={{ background: "white" }}>
            <Header as="h1">Azure DevOps Bot</Header>
            <p>
              The SPFx web part is a SharePoint Framework web part that allows
              users to view recent tasks, bugs, and commits assigned to them
              from a specific project in Azure DevOps. The web part uses the
              Open AI function calling feature to determine the user's request
              and intention, and then processes the relevant function using the
              Azure DevOps API.
            </p>
            <List.Item>
              <Label color="red" horizontal>
                DevOps organization
              </Label>
              {organizationName}
            </List.Item>
            <Grid.Row>
              <Grid.Column>
                <Divider />
                <Grid columns={1}>
                  <Grid.Column>
                    <Header attached="top" as="h4" block>
                      Assistant
                    </Header>
                    <Segment attached="bottom">
                      <div className={chatStyles.chatWindowContainer}>
                        <div>
                          <div
                            className={`${chatStyles.chatWindow}`}
                            id="chatWindow"
                          >
                            <MessageList
                              className={chatStyles.chatWindowMessageList}
                              lockable={false}
                              toBottomHeight={"100%"}
                              dataSource={chatMessages}
                            />
                          </div>
                          {/* Insert a textbox woth icon */}
                          <div className={chatStyles.chatWindowFooter}>
                            <TextField
                              placeholder={
                                loading ? "" : "Type your query here"
                              }
                              onChange={onTextChange}
                              onKeyDown={onKeyDown}
                              disabled={loading}
                              value={query}
                              autoComplete="off"
                              borderless={true}
                              multiline
                              rows={2}
                              resizable={false}
                              styles={sendChatTextFiledStyles}
                            />
                            <div className={chatStyles.chatWindowFooterButtons}>
                              {loading ? (
                                <Spinner
                                  size={SpinnerSize.small}
                                  styles={loadingSpinnerStyles}
                                />
                              ) : (
                                <IconButton
                                  iconProps={{ iconName: "Send" }}
                                  onClick={() => onSendClick()}
                                  className={chatStyles.sendChatButton}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Segment>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
