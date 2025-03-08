# Group Members Web Part – Microsoft 365 Group User Management

## Summary

This SharePoint Framework web part provides a comprehensive solution for displaying group members from Microsoft 365 groups. The web part leverages Microsoft Graph to retrieve and display user information with advanced features like:

- Dynamic role-based user filtering (Administrators, Members, Visitors)
- Intelligent profile photo handling
- Searchable user list
- Pagination and load more functionality
- Quick action buttons for chat and email

![Group Members UI](./assets/GroupMembersUI.png)

## Features

- **Microsoft Graph Integration**: Fetches user details from Microsoft 365 groups
- **Custom Profile Image Handling**: 
  - Graceful fallback for profile photos
  - Lazy loading of images
  - Initials-based avatar generation
- **Flexible Configuration**: 
  - Configurable roles
  - Customizable labels
  - Pagination settings
- **Enhanced User Experience**:
  - Search functionality
  - Quick action buttons
  - Responsive design

## Web Part Properties

| Property | Type | Description | Default | Required |
|----------|------|-------------|---------|----------|
| `roles` | Array of Strings | Roles to display (admin, member, visitor) | None | Yes |
| `itemsPerPage` | Number | Number of users per page | 10 | No |
| `sortField` | String | Sort users by 'name' or 'jobTitle' | 'name' | No |
| `showSearchBox` | Boolean | Enable/disable search functionality | true | No |
| `showPresenceIndicator` | Boolean | Show Microsoft Teams presence status | true | No |
| `adminLabel` | String | Custom label for administrators | 'Administrators' | No |
| `memberLabel` | String | Custom label for members | 'Members' | No |
| `visitorLabel` | String | Custom label for visitors | 'Visitors' | No |

## Compatibility

![SPFx 1.20.2](https://img.shields.io/badge/SPFx-1.20.2-green.svg)  
![Node.js v18](https://img.shields.io/badge/Node.js-v18-green.svg)  
![SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)  
![Hosted Workbench](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Prerequisites

- SharePoint Online tenant
- Microsoft 365 account with access to Microsoft Graph
- Node.js v18
- SharePoint Framework 1.20.2

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Run `npm install`
4. Run `gulp serve` for local testing
5. Use `gulp bundle --ship` and `gulp package-solution --ship` for production deployment

## Usage Example

```typescript
// Web part configuration example
{
  roles: ['admin', 'member'],
  itemsPerPage: 15,
  sortField: 'jobTitle',
  showSearchBox: true,
  adminLabel: 'Leadership Team'
}
```

## Security and Permissions

### Required Microsoft Graph API Permissions

The following Microsoft Graph API permissions are required for full functionality:

| Permission Scope | Purpose | Type |
|-----------------|---------|------|
| `User.Read.All` | Read comprehensive user profiles | Application |
| `User.ReadBasic.All` | Read basic user profile information | Application |
| `Group.Read.All` | Read Microsoft 365 group details | Application |
| `GroupMember.Read.All` | Read group membership information | Application |
| `Presence.Read.All` | Read user presence status in Microsoft Teams | Application |

### Permission Request Process

1. Deploy the web part solution
2. Navigate to the SharePoint Admin Center
3. Go to "Advanced" > "API Access"
4. Approve the requested Microsoft Graph API permissions

### Security Considerations

- Users will only see group members they have permission to view
- Respects existing SharePoint and Microsoft 365 group access controls
- Permissions are scoped to read-only access

## Known Limitations

- Performance may vary with large group memberships
- Requires active internet connection for Microsoft Graph queries
- Profile photo retrieval depends on user's Microsoft 365 profile

## Troubleshooting

- Ensure proper Microsoft Graph API permissions
- Verify network connectivity
- Check browser console for specific error messages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Disclaimer

THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED.

## Help and Support

- [Microsoft 365 Developer Community](https://aka.ms/m365dev)
- [SharePoint Framework Documentation](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Microsoft Graph Documentation](https://docs.microsoft.com/graph/overview)

## Version History

| Version | Date | Comments |
|---------|------|----------|
| 1.0.0 | February 2025 | Initial release |