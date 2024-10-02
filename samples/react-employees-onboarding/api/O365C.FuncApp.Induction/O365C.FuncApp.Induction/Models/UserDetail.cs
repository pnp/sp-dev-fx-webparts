using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365C.FuncApp.OnBoarding.Models
{
    public class UserDetail
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
        public string UserPrincipalName { get; set; }
        public string JobTitle { get; set; }
        public string Department { get; set; }
        public string MobilePhone { get; set; }
        public string OfficeLocation { get; set; }
        public string Mail { get; set; }       

    }
}
