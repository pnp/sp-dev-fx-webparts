using Microsoft.KernelMemory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365C.SK.KernelMemory.FuncApp.Models
{
    public class ChatResponse
    {
        public string Question { get; set; }
        public string Answer { get; set; }
        public List<Citation> Relevance { get; internal set; }
    }

}
