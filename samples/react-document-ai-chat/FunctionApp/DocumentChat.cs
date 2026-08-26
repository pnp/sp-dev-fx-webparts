using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using O365C.SK.KernelMemory.FuncApp.Models;
using O365C.SK.KernelMemory.FuncApp.Services;
using System;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace O365C.SK.KernelMemory.FuncApp
{
    public class DocumentChat
    {
        private readonly ILogger<DocumentChat> _logger;
        private readonly AzureFunctionSettings _appSettings;
        private readonly ISemanticKernelService _semanticKernelService;


        public DocumentChat(ILogger<DocumentChat> logger, AzureFunctionSettings appSettings, ISemanticKernelService semanticKernelService)
        {
            _logger = logger;
            _appSettings = appSettings;
            _semanticKernelService = semanticKernelService;
        }

        [Function("DocumentChat")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            _logger.LogInformation($"EmbeddingModel: {_appSettings.EmbeddingModel}");

            try
            {
                // Parse and validate the request
                var request = await ParseRequestAsync(req);
                if (request == null)
                {
                    return new BadRequestObjectResult("Please upload a file and provide a question.");
                }

                // Process the file and question
                var result = await ProcessQueryAsync(request);
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the request.");
                return new ObjectResult("An internal server error occurred.") { StatusCode = 500 };
            }
        }


        private async Task<UserRequest> ParseRequestAsync(HttpRequest req)
        {
            if (!req.HasFormContentType)
            {
                _logger.LogWarning("UserRequest does not contain form data.");
                return null;
            }

            var form = await req.ReadFormAsync();
            if (form.Files.Count == 0 || !form.ContainsKey("question"))
            {
                _logger.LogWarning("UserRequest is missing a file or question.");
                return null;
            }

            return new UserRequest
            {
                File = form.Files[0],
                Question = form["question"]
            };
        }

        // Process the file and question
        private async Task<ChatResponse> ProcessQueryAsync(UserRequest request)
        {
            try
            {
                using var fileStream = request.File.OpenReadStream();
                using var memoryStream = new MemoryStream();
                await fileStream.CopyToAsync(memoryStream);
                memoryStream.Position = 0;

                var fileName = request.File.FileName.ToLower().Replace(" ", "_");
                fileName = Regex.Replace(fileName, @"[^a-z0-9._-]", string.Empty);
                var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);

                //Generate document Id base on the document using hash of the file                
                using var sha256 = SHA256.Create();
                memoryStream.Position = 0; // Reset the stream position to the beginning
                var hash = sha256.ComputeHash(memoryStream);
                var hashString = BitConverter.ToString(hash).Replace("-", "").ToLower();
                var documentId = $"{fileNameWithoutExtension}_{hashString}";

                
                var result = await _semanticKernelService.ChatDocumentsAsync(memoryStream, fileName, documentId, request.Question);

                return result;
            }
            catch (Exception ex)
            {
                // Log the exception (you can use your preferred logging framework)
                Console.WriteLine($"An error occurred: {ex.Message}");
                // Optionally, rethrow the exception or return a specific error response
                throw;
            }
        }
    }

    // Strongly-typed request model
    public class UserRequest
    {
        [Required(ErrorMessage = "A file is required.")]
        public IFormFile File { get; set; }

        [Required(ErrorMessage = "A question is required.")]
        public string Question { get; set; }
    }
}