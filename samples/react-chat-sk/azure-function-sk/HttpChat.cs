using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Company.Function.Services;
using Company.Function.Plugins;

namespace Company.Function;

public class HttpChat
{
    private readonly ILogger<HttpChat> _logger;
    private readonly ITokenService _tokenService;
    private readonly ITokenValidationService _tokenValidationService;
    private readonly IUserContextService _userContextService;
    private readonly Kernel _kernel;

    public HttpChat(ILogger<HttpChat> logger, ITokenService tokenService, ITokenValidationService tokenValidationService, IUserContextService userContextService, Kernel kernel)
    {
        _logger = logger;
        _tokenService = tokenService;
        _tokenValidationService = tokenValidationService;
        _userContextService = userContextService;
        _kernel = kernel;
    }

    [Function("HttpChat")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "options")] HttpRequest req, CancellationToken cancellationToken)
    {
        _logger.LogInformation("C# HTTP trigger function processed a request.");

        // Handle CORS manually to echo back the origin
        var origin = req.Headers["Origin"].FirstOrDefault();
        if (!string.IsNullOrEmpty(origin) && origin.EndsWith(".sharepoint.com", StringComparison.OrdinalIgnoreCase))
        {
            req.HttpContext.Response.Headers["Access-Control-Allow-Origin"] = origin;
            req.HttpContext.Response.Headers["Access-Control-Allow-Credentials"] = "true";
            req.HttpContext.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
            req.HttpContext.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
        }

        // Handle CORS preflight request
        if (req.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
        {
            return new OkResult();
        }

        // Read incoming Authorization header
        var auth = req.Headers["Authorization"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(auth) || !auth.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            _logger.LogWarning("Missing or invalid Authorization header");
            return new UnauthorizedResult();
        }

        var incomingToken = auth.Substring("Bearer ".Length).Trim();

        // Validate the access token
        var principal = await _tokenValidationService.ValidateTokenAsync(incomingToken);
        if (principal == null)
        {
            _logger.LogWarning("Token validation failed");
            return new UnauthorizedResult();
        }

        // Log authenticated user info
        var userObjectId = principal.FindFirst("oid")?.Value ?? principal.FindFirst("sub")?.Value;
        var userName = principal.FindFirst("name")?.Value ?? principal.FindFirst("preferred_username")?.Value;
        _logger.LogInformation("Authenticated user: {UserName} (ObjectId: {ObjectId})", userName, userObjectId);

        // Set the user token in the scoped context service
        _userContextService.SetUserToken(incomingToken);

        // Acquire OBO token for downstream (optional - plugins handle their own OBO)
        /*
        string? oboToken;
        try
        {
            oboToken = await _tokenService.GetOnBehalfOfTokenAsync(incomingToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to acquire OBO token");
            return new ObjectResult(new { error = "Failed to acquire OBO token", detail = ex.Message }) { StatusCode = 500 };
        }

        if (oboToken == null)
        {
            return new ObjectResult(new { error = "No OBO token returned" }) { StatusCode = 500 };
        }
        */

        // Read user message from request body
        string userMessage;
        using (var reader = new StreamReader(req.Body))
        {
            var body = await reader.ReadToEndAsync();
            if (string.IsNullOrWhiteSpace(body))
            {
                return new BadRequestObjectResult(new { error = "Empty request body" });
            }
            
            try
            {
                var payload = JsonSerializer.Deserialize<JsonElement>(body);
                 userMessage = payload.TryGetProperty("message", out var msgProp) ? msgProp.GetString() ?? string.Empty : string.Empty;
            }
            catch
            {
                return new BadRequestObjectResult(new { error = "Invalid JSON in request body" });
            }
        }

        if (string.IsNullOrWhiteSpace(userMessage))
        {
            return new BadRequestObjectResult(new { error = "Missing 'message' in request body" });
        }

        

        // Stream Server-Sent Events (SSE) to the client
        var response = req.HttpContext.Response;
        response.Headers["Content-Type"] = "text/event-stream";
        response.Headers["Cache-Control"] = "no-cache";
        response.Headers["Connection"] = "keep-alive";
        response.StatusCode = 200;

        await using var writer = new StreamWriter(response.Body);

        try
        {
            // Create chat history and add user message
            var chatHistory = new ChatHistory();
            chatHistory.AddSystemMessage("You are a helpful assistant with access to the user's Microsoft 365 data. Use the available functions when appropriate.");
            chatHistory.AddUserMessage(userMessage);

            // Get chat completion service
            var chatService = _kernel.GetRequiredService<IChatCompletionService>();
            

            // Enable auto function calling
            var executionSettings = new OpenAIPromptExecutionSettings
            {
                ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
            };

            // Stream the response
            var streamingResponse = chatService.GetStreamingChatMessageContentsAsync(
                chatHistory,
                executionSettings,
                _kernel,
                cancellationToken);

            await foreach (var update in streamingResponse)
            {
                if (cancellationToken.IsCancellationRequested)
                {
                    break;
                }

                if (!string.IsNullOrEmpty(update.Content))
                {
                    var eventData = JsonSerializer.Serialize(new { 
                        type = "content",
                        content = update.Content,
                        role = update.Role?.ToString() ?? "assistant"
                    });
                    await writer.WriteAsync($"data: {eventData}\n\n");
                    await writer.FlushAsync();
                }
            }

            // Send completion event
            if (!cancellationToken.IsCancellationRequested)
            {
                var completeData = JsonSerializer.Serialize(new { type = "complete" });
                await writer.WriteAsync($"data: {completeData}\n\n");
                await writer.FlushAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during streaming");
            var errorData = JsonSerializer.Serialize(new { type = "error", error = ex.Message });
            await writer.WriteAsync($"data: {errorData}\n\n");
            await writer.FlushAsync();
        }

        // We've already written the response; return an empty result.
        return new EmptyResult();
    }
}