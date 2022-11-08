# LivePersonaCard control

> This was pulled directly from the following rejected [Pull Request](https://github.com/pnp/sp-dev-fx-controls-react/pull/353/commits/16595698c49efd1e236cf5159a6c8ddc275e49de?file-filters%5B%5D=.ts&file-filters%5B%5D=.tsx#diff-7b59c134b6c83b922ade946400924f9e42d8d609c2328073917078ccee236905R4) by Hugo Bernier, with the author's expressed permission 

Adds the out-of-the-box Office 365 live persona card to any element in your page.

Profile information is automatically provided by the live persona card.

![LivePersonaCard control output](../assets/LivePersonaCard.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-controls-react` dependency. Check out the [getting started](../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { LivePersonaCard } from "@pnp/spfx-controls-react/lib/LivePersonaCard";
```

- Use the `LivePersonaCard` control in your code as follows:

```Typescript
// To show the current user's live persona card around text displaying their name
<LivePersonaCard
  user={this.props.context.pageContext.user}
  serviceScope={this.props.context.serviceScope}
>
  <!-- You can put any valid HTML inside -->
  <div>{this.props.context.pageContext.user.displayName}</div>
</LivePersonaCard>

// If you do not pass elements within the live person card, it will automatically
// attempt to render a default person card. It will retrieve the user's name, email
// and profile image from the `user` prop.
<h3>LivePersonaCard with no children -- renders default persona card</h3>
<LivePersonaCard
  user={this.props.context.pageContext.user}
  serviceScope={this.props.context.serviceScope}
/>

// You can also override the persona by passing custom properties
<h3>LivePersonaCard with custom persona props</h3>
<LivePersonaCard
  user={this.props.context.pageContext.user}
  serviceScope={this.props.context.serviceScope}
  personaProps={{
    text: 'User McUserface',
    imageUrl: 'https://robohash.org/blanditiisadlabore.png?size=50x50&set=set1',
    imageInitials: '?'
  }}
 />

// You can display a live persona card for any users, not just the current user
//  -- including external users. Just pass the user's display name and email
<h3>LivePersonaCard with external user</h3>
<LivePersonaCard
  serviceScope={this.props.context.serviceScope}
  user={{
    displayName: 'Elio Struyf',
    email: 'eliostruyf@fakeemail.com',
  }}
  personaProps={{
    imageUrl: 'https://fast-eliostruyf.azureedge.net/wp-content/uploads/2019/07/eliostruyf-jyvaskyla-250x250.jpg',
    secondaryText: 'Not his real email'
  }}
 />

```

The code above will render the following:
![LivePersonaCard code sample output](../assets/LivePersonaCardSample.png)

## Implementation

The `LivePersonaCard` component can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| className | string | no | Optional additional CSS class(es) to apply to the LivePersonaCard. |
| onCardCloseCallback | Function | no | Optional callback for when `LivePersonaCard` is closed |
| onCardOpenCallback | Function | no | Optional callback for when `LivePersonaCard` is opened |
| personaProps | IPersonaProps | no | Optional properties to render the default persona card when no children are passed. If children are passed to the LivePersonaCard, this value will be ignored. |
| serviceScope | ServiceScope | yes | The associated `ServiceScope` for this component. Simply use `this.props.context.serviceScope` from most components. |
| user | ILivePersonaCardUser | yes | The user for whom you wish to render the live persona card. You can use `this.props.context.pageContext.user` to display the current user, or pass `displayName` and `email` or `loginName` for any other user |

### `ILivePersonaCardUser` interface

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| displayName | string | yes | The display name for the current user. E.g.: `"John Doe"` |
| email | string | no | The email address for the current user. E.g.: `"example@contoso.com"`. You must specify either an `email` or a `loginName` |
| isExternalGuestUser | boolean | no | Returns if the current user is an anonymous guest. Reserved for future use |
| loginName | string | no | The login name for current user. E.g.: on-premise user: `"domain\user"`, online user: `"user@domain.com"`. You must specify either a `loginName`' or an `email`|

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-controls-react/wiki/controls/LivePersonaCard)
