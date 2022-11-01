using Microsoft.Graph;

namespace Teamified.Api.Teams.Models;

public sealed class IdentityPrincipal
{
    public Guid Id { get; set; }
    public string UserPrincipalName { get; set; }
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public string JobTitle { get; set; }

    public IdentityPrincipal()
    {
        UserPrincipalName = "unknown";
        Email = "unknown";
        DisplayName = "unknown";
        JobTitle = "unknown";
    }

    public static IdentityPrincipal MapFromDirectoryObject(DirectoryObject directoryObject)
    {
        return new IdentityPrincipal
        {
            Id = Guid.Parse(directoryObject.Id),
            DisplayName = ((User)directoryObject).DisplayName,
            Email = ((User)directoryObject).Mail,
            JobTitle = ((User)directoryObject).JobTitle,
            UserPrincipalName = ((User)directoryObject).UserPrincipalName
        };
    }
}