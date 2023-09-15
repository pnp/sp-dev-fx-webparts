export const DEVOPS_BOT_NAME = "DevOps Bot";
export const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
export const GPT_MODELTO_USE = "gpt-3.5-turbo-0613";
//export const GPT_MODELTO_USE = 'gpt-4-0613';
export const TRY_LATER_MESSAGE =
  "Sorry, I am unable to process your query at the moment. Please try again later.";
export const SYSTEM_MESSAGE = `
List all projects and their tasks assigned to you for a specific project. Also, help me with all tasks related to GIT such as creating a new branch, merging branches, resolving merge conflicts, pushing changes to the remote repository, and retrieving the latest commits.
Your final reply must be in HTML format surrounded in <span></span>.
Make the status bold using <b></b>.`;
export const FUNCTIONS = [
  {
    name: "getAssignedTasks",
    description: "Get the all active tasks assigned to me across all projects",
    parameters: {
      type: "object",
      required: ["projectName"],
      properties: {
        projectName: {
          type: "string",
          description: "The name or id of the Azure DevOps project.",
        },
      },
    },
  },
  {
    name: "getAssignedBugs",
    description: "Get the all active bugs assigned to me across all projects",
    parameters: {
      type: "object",
      required: ["projectName"],
      properties: {
        projectName: {
          type: "string",
          description: "The name or id of the Azure DevOps project.",
        },
      },
    },
  },
  {
    name: "getRecentCommitsAsync",
    description:
      "Get recent commits for given repository under specified project",
    parameters: {
      type: "object",
      required: ["repositoryName", "projectName"],
      properties: {
        projectName: {
          type: "string",
          description: "The name or id of the Azure DevOps project.",
        },
        repositoryName: {
          type: "string",
          description: "The name of the Azure DevOps git repositories.",
        },
      },
    },
  },
  {
    name: "showFunnyMessage",
    description:
      "If user's query is not related to TfL status then show a funny message",
    parameters: {
      type: "object",
      required: ["funnyMessage"],
      properties: {
        funnyMessage: {
          type: "string",
          description:
            "A funny message to say why user's query is not related to TfL. Max 20 words.",
        },
      },
    },
  },
];
