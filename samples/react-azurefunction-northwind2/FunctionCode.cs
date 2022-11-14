using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace FunctionAppNW
{
    
    public class Customers
    {
        public string CustomerID { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
    }
    
    public static class ProcessCustomers
    {
        [FunctionName("GetCustomers")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", Route = "customer")] HttpRequest req, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            

            List<Customers> customersList = new List<Customers>();
            
            try
            {
                using (SqlConnection connection = new SqlConnection(Environment.GetEnvironmentVariable("SqlConnectionString")))
                {
                    connection.Open();
                    var query = @"Select * from Customers";
                    SqlCommand command = new SqlCommand(query, connection);
                    var reader = await command.ExecuteReaderAsync();

                    while (reader.Read())
                    {
                        Customers customer = new Customers()
                        {
                            CustomerID = reader["CustomerID"].ToString(),
                            CompanyName = reader["CompanyName"].ToString(),
                            ContactName = reader["ContactName"].ToString(),
                            ContactTitle = reader["ContactTitle"].ToString(),
                            Address = reader["Address"].ToString(),
                            City = reader["City"].ToString(),
                            PostalCode = reader["PostalCode"].ToString(),
                            Region = reader["Region"].ToString(),

                        };
                        customersList.Add(customer);
                    }
                }
            }
            catch (Exception e)
            {
                log.LogError(e.ToString());
            }
            if (customersList.Count > 0)
            {
                return new OkObjectResult(customersList);
            }
            else
            {
                return new NotFoundResult();
            }

        }
    }
}
