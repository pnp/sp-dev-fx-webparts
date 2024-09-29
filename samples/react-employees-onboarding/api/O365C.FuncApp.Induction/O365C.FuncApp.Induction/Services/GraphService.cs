
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using Microsoft.Graph.Users.Item.SendMail;
using O365C.FuncApp.Induction.Helpers;
using O365C.FuncApp.OnBoarding.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using O365C.FuncApp.Induction.Models;
using O365C.FuncApp.Induction.Services;
using O365C.FuncApp.Induction;


namespace O365C.FuncApp.Induction.Services
{

    public interface IGraphService
    {
        Task<UserDetail> GetUserInfo(string email);
        Task<List<LogInfo>> UserOnboarding(List<RequestDetail> requestDetails);
    }
    public class GraphService : IGraphService
    {
        private readonly ISharePointService _sharePointService;
        private readonly AzureFunctionSettings _azureFunctionSettings;
        private readonly ILogger<GraphService> _logger;

        public GraphService(ILogger<GraphService> logger, AzureFunctionSettings azureFunctionSettings, ISharePointService sharePointService)
        {
            _azureFunctionSettings = azureFunctionSettings;
            _logger = logger;
            _sharePointService = sharePointService;
        }

        public async Task<UserDetail> GetUserInfo(string email)
        {
            try
            {
                var graphClient = GraphAuthenticationManager.GetAuthenticatedGraphClient(_azureFunctionSettings);

                // Get the user by email
                var user = await graphClient.Users[email]
                .GetAsync(requestConfiguration =>
                {
                    requestConfiguration.QueryParameters.Select = new[] { "id", "displayName", "givenName", "surname", "userPrincipalName", "jobTitle", "department", "mobilePhone", "officeLocation", "mail" };
                });

                // Create a new user detail object
                var result = new UserDetail
                {
                    Id = user.Id,
                    DisplayName = user.DisplayName,
                    GivenName = user.GivenName,
                    Surname = user.Surname,
                    UserPrincipalName = user.UserPrincipalName,
                    JobTitle = user.JobTitle,
                    Department = user.Department,
                    MobilePhone = user.MobilePhone,
                    OfficeLocation = user.OfficeLocation,
                    Mail = user.Mail
                };
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user information");
                return null;
            }
        }

        public async Task<List<LogInfo>> UserOnboarding(List<RequestDetail> requestDetails)
        {
            try
            {

                List<LogInfo> result = new List<LogInfo>();

                var graphClient = GraphAuthenticationManager.GetAuthenticatedGraphClient(_azureFunctionSettings);

                // Loop through the request details
                foreach (var requestDetail in requestDetails)
                {

                    _logger.LogInformation($"Processing {requestDetail.Name} ...............");
                    _logger.LogInformation($"************************************************************************************");

                    var email = requestDetail.Email;
                    var department = requestDetail.Department;
                    var name = requestDetail.Name;

                    var logInfo = new LogInfo();
                    logInfo.Name = name;
                    logInfo.Email = email;


                    var user = await GetUserInfo(email);

                    //if user is not found, skip to the next user
                    if (user == null)
                    {
                        Console.WriteLine($"User {email} not found");
                        continue;
                    }

                    #region Update User Department
                    var userToUpdate = new User
                    {
                        Department = department
                    };
                    var updateDeptRequest = graphClient.Users[email].ToPatchRequestInformation(userToUpdate);
                    #endregion

                    #region Assign User to Department Team
                    var devTeamId = "a82e7c4b-e9f1-440f-ba87-5ba9a992ef15";
                    var membershipRequestBody = new AadUserConversationMember
                    {
                        OdataType = "#microsoft.graph.aadUserConversationMember",
                        Roles = new List<string>
                    {
                        "member",
                    },
                        AdditionalData = new Dictionary<string, object>
                    {
                        {
                            "user@odata.bind", $"https://graph.microsoft.com/v1.0/users('{user.Id}')"
                        },
                    },
                    };
                    var teamMembershipRequest = graphClient.Teams[devTeamId].Members.ToPostRequestInformation(membershipRequestBody);
                    #endregion

                    #region Send Email to User
                    var emailRequestBody = new SendMailPostRequestBody
                    {
                        Message = new Message
                        {
                            Subject = "Onboarding completion",
                            Body = new ItemBody
                            {
                                ContentType = BodyType.Html,
                                Content = $@"
                                <h1>Welcome to the {user.Department} team</h1>
                                <p>You have been successfully onboarded to the team</p>
                                <h3>Completed tasks</h3>
                                <ul style='font-family: Arial, sans-serif;'>
                                    <li>Department has been updated</li>
                                    <li>Joined the Development Team Microsoft Team  - see below link</li>
                                    <li>Notification sent to the user</li>
                                </ul>
                                <table style='border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;'>
                                    <thead style='background-color: #f2f2f2;'>
                                        <tr>
                                            <th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Name</th>
                                            <th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Department</th>
                                            <th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Joined Team</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style='border: 1px solid #ddd; padding: 8px;'>{user.DisplayName}</td>
                                            <td style='border: 1px solid #ddd; padding: 8px;'>{user.Department}</td>
                                            <td style='border: 1px solid #ddd; padding: 8px;'><a href='https://teams.microsoft.com/l/team/19%3a9J2Sn_khW6HgW6fIv1kTcvbGrGndWMKt0MHDZoqIwtw1%40thread.tacv2/conversations?groupId=a82e7c4b-e9f1-440f-ba87-5ba9a992ef15&tenantId=3f4d536c-9ebc-4eb1-8304-0f0f2f840b5d'>Dev Team</a></td> 
                                        </tr>
                                    </tbody>
                                </table>
                            ",
                            },
                            ToRecipients = new List<Recipient>
                        {
                            new Recipient
                            {
                                EmailAddress = new EmailAddress
                                {
                                    Address = user.Mail.ToString(),
                                },
                            },
                        },

                        },
                        SaveToSentItems = false,
                    };
                    var sendEmailRequest = graphClient.Users[user.Id].SendMail.ToPostRequestInformation(emailRequestBody);
                    #endregion

                    #region Building batch request

                    // Build the batch
                    var batchRequestContent = new BatchRequestContentCollection(graphClient);


                    // Using AddBatchRequestStepAsync adds each request as a step
                    // with no specified order of execution
                    var updateDeptStep = await batchRequestContent.AddBatchRequestStepAsync(updateDeptRequest);
                    var teamMembershipStep = await batchRequestContent.AddBatchRequestStepAsync(teamMembershipRequest);
                    var sendEmailStep = await batchRequestContent.AddBatchRequestStepAsync(sendEmailRequest);

                    // Execute the batch
                    var returnedResponse = await graphClient.Batch.PostAsync(batchRequestContent);

                    #endregion

                    // De-serialize response based on known return type
                    try
                    {
                        await returnedResponse.GetResponseByIdAsync(updateDeptStep);
                        Console.WriteLine($"User department updated to {department}");
                        logInfo.Department = true;
                        //Add wait time for 2 seconds
                        await Task.Delay(2000);

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Get user failed: {ex.Message}");
                        logInfo.Department = false;
                    }
                    try
                    {
                        await returnedResponse.GetResponseByIdAsync(teamMembershipStep);
                        Console.WriteLine($"User added to team");
                        logInfo.TeamMembership = true;
                        await Task.Delay(2000);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Get team membership failed: {ex.Message}");
                        logInfo.TeamMembership = false;
                        
                    }
                    try
                    {
                        await returnedResponse.GetResponseByIdAsync(sendEmailStep);
                        Console.WriteLine($"Email sent to user");
                        logInfo.Notification = true;
                        await Task.Delay(2000);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Send email failed: {ex.Message}");
                        logInfo.Notification = false;
                    }


                    //Log item to SharePoint list      
                    if(logInfo.Department && logInfo.TeamMembership && logInfo.Notification)
                    {
                        logInfo.CompletedOn = DateTime.Now;                     
                    }
                    logInfo.ProcessedOn = DateTime.Now;
                    _logger.LogInformation("AddItemsToList to SharePoint List");
                    await _sharePointService.AddListItemAsync(logInfo);
                    _logger.LogInformation("Done");                    
                    result.Add(logInfo);

                }


                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error Onboarding the user");
                return null;
            }
        }

    }
}
