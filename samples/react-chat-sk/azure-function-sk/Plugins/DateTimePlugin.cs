using System;
using System.ComponentModel;
using Microsoft.SemanticKernel;

namespace Company.Function.Plugins;

public class DateTimePlugin
{
    [KernelFunction("getDate")]
    [Description("Returns the current date and time in ISO 8601 format")]
    public string GetDate()
    {
        return DateTime.UtcNow.ToString("o");
    }
}
