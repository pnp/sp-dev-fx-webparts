using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace O365Clinic.Function.Webhooks.Model
{
    public class ResponseModel<T>
    {
        [JsonProperty(PropertyName = "value")]
        public List<T> Value { get; set; }
    }
}
