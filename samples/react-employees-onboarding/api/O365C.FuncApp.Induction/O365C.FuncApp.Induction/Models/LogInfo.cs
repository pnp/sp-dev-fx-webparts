using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365C.FuncApp.Induction.Models
{
    public class LogInfo
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; }
        public bool Department { get; set; }
        public bool TeamMembership { get; set; }
        public bool Notification { get; set; }
        public DateTime ProcessedOn { get; set; }
        public DateTime CompletedOn { get; set; }
        

    }
}
