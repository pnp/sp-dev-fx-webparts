using Microsoft.KernelMemory;
using O365C.SK.KernelMemory.FuncApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365C.SK.KernelMemory.FuncApp.Services
{
    public interface ISemanticKernelService
    {
        Task<ChatResponse> ChatDocumentsAsync(Stream stream, string fileName, string documentId, string userQuestion);

    }
    public class SemanticKernelService : ISemanticKernelService
    {
        private readonly AzureFunctionSettings _azureFunctionSettings;
        public SemanticKernelService(AzureFunctionSettings azureFunctionSettings)
        {
            _azureFunctionSettings = azureFunctionSettings;
        }

        public async Task<ChatResponse> ChatDocumentsAsync(Stream stream, string fileName, string documentId, string userQuestion)
        {
            var result = string.Empty;

            var chatConfig = new AzureOpenAIConfig
            {
                APIKey = _azureFunctionSettings.AzureOpenAIKey,
                Deployment = _azureFunctionSettings.ChatCompletionModel,
                Endpoint = _azureFunctionSettings.AzureOpenAIEndpoint,
                APIType = AzureOpenAIConfig.APITypes.ChatCompletion,
                Auth = AzureOpenAIConfig.AuthTypes.APIKey
            };

            var embeddingConfig = new AzureOpenAIConfig
            {
                APIKey = _azureFunctionSettings.AzureOpenAIKey,
                Deployment = _azureFunctionSettings.EmbeddingModel,
                Endpoint = _azureFunctionSettings.AzureOpenAIEndpoint,
                APIType = AzureOpenAIConfig.APITypes.EmbeddingGeneration,
                Auth = AzureOpenAIConfig.AuthTypes.APIKey
            };

            var searchConfig = new AzureAISearchConfig
            {
                APIKey = _azureFunctionSettings.AzureAISearchKey,
                Endpoint = _azureFunctionSettings.AzureAISearchEndpoint,
                UseHybridSearch = true,
                Auth = AzureAISearchConfig.AuthTypes.APIKey
            };

            var azureBlobConfig = new AzureBlobsConfig
            {
                ConnectionString = _azureFunctionSettings.AzureBlobConnectionString,
                Container = _azureFunctionSettings.AzureBlobContainerName,
                Auth = AzureBlobsConfig.AuthTypes.ConnectionString
            };

            var memory = new KernelMemoryBuilder()
                .WithAzureOpenAITextEmbeddingGeneration(embeddingConfig)
                .WithAzureOpenAITextGeneration(chatConfig)
                .WithAzureAISearchMemoryDb(searchConfig)
                .WithAzureBlobsDocumentStorage(azureBlobConfig)
                .Build<MemoryServerless>();

            var document = new Document
            {
                Id = documentId
            };
            document.AddStream(fileName, stream);

            var indexName = "DocumentMemory";

            await memory.ImportDocumentAsync(document, indexName);

            // Define the system prompt to instruct the model to format results in Markdown
            var systemPrompt = @"
You are a helpful assistant that provides detailed and accurate information based on the document provided. 
Always format your response in Markdown. use tables, bullet points, numbered lists, code blocks and other markdown format as appropriate to make the response clear and well-structured.
";

            // Combine the system prompt with the user's question
            var fullPrompt = $"{systemPrompt}\n\n{userQuestion}";

            // Ask the question with the system prompt included
            var answer = await memory.AskAsync(fullPrompt, indexName);

            var chatResponse = new ChatResponse
            {
                Answer = answer.Result,
                Question = userQuestion,
                Relevance = answer.RelevantSources
            };

            return chatResponse;


        }
    }
}
