using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365C.SK.KernelMemory.FuncApp.Models
{
    public class AzureFunctionSettings
    {
        public string EmbeddingModel { get; set; } = "";
        public string ChatCompletionModel { get; set; } = "";
        public string AzureOpenAIEndpoint { get; set; } = "";
        public string AzureOpenAIKey { get; set; } = "";
        public string OpenAIEndpoint { get; set; } = "";
        public string OpenAIKey { get; set; } = "";
        public string AzureAISearchEndpoint { get; set; } = "";
        public string AzureAISearchKey { get; set; } = "";
        public string AzureBlobConnectionString { get; set; } = "";
        public string AzureBlobContainerName { get; set; } = "";
    }
}
