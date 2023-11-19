using Microsoft.Azure.WebJobs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Helpers
{
    public class FunctionHelper
    {
        internal static string GetCurrentDirectory(ExecutionContext executionContext)
        {
            string currentDirectory = executionContext.FunctionDirectory;

            var dInfo = new DirectoryInfo(currentDirectory);

            return dInfo.Parent.FullName;
        }

        internal static string GetFilesDirectory(ExecutionContext executionContext)
        {
            string currentDirectory = GetCurrentDirectory(executionContext);

            return currentDirectory + "\\Cards";
        }
    }
}
