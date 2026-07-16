import * as React from "react";
import { McpClientService } from "../services/McpClientService";

interface IToolInvocation {
  invoke: (toolName: string, args: Record<string, unknown>) => Promise<unknown>;
  isInvoking: boolean;
  result: unknown;
  error?: Error;
}

export const useToolInvocation = (service: McpClientService): IToolInvocation => {
  const [isInvoking, setIsInvoking] = React.useState(false);
  const [result, setResult] = React.useState<unknown>();
  const [error, setError] = React.useState<Error>();

  const invoke = React.useCallback(async (toolName: string, args: Record<string, unknown>): Promise<unknown> => {
    setIsInvoking(true);
    setError(undefined);

    try {
      const invocationResult = await service.callTool(toolName, args);
      setResult(invocationResult);
      return invocationResult;
    } catch (invokeError) {
      const invocationError = invokeError instanceof Error ? invokeError : new Error(String(invokeError));
      setError(invocationError);
      throw invocationError;
    } finally {
      setIsInvoking(false);
    }
  }, [service]);

  return { invoke, isInvoking, result, error };
};
