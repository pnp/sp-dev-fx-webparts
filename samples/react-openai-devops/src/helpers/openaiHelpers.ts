export const getAssistantMessage = (functionName: string, functionArguments: any) => {
  return {
    role: 'assistant',
    content: '',
    function_call: {
      name: functionName,
      arguments: JSON.stringify(functionArguments),
    },
  };
};

export const getFunctionMessage = (functionName: string, functionResult: any) => {
  return {
    role: 'function',
    name: functionName,
    content: JSON.stringify(functionResult),
  };
};

export const getUserMessage = (userMessage: string) => {
  return {
    role: 'user',
    content: userMessage,
  };
};

export const getSystemMessage = (systemMessage: string) => {
  return {
    role: 'system',
    content: systemMessage,
  };
};

