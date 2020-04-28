## react-adaptivecards-hooks

### Code structure

| File                         | Type                                             |  Description   |
|------------------------------|--------------------------------------------------|----------------|
| AdaptiveCardViewerWebPart.ts | React Class component (derives from BaseWebPart) | Used to define web part properties and bootstrap the component tree|
| RootComponent.tsx            | React Function component                         | Interrogates webpart properties and establishes AppContext and initial state.<br/>Monitors CardService state and dispatches updates to viewer state. |
| AppContext.ts                | React context provider                           | Exposes the SPFx webpart context, the webpart instance and the state dispatch to all components via `React.useContext()`  |
| CardService.ts               | React Hook                                       | Abstracts the SP HttpClient        |
| CardServiceReducer.ts        | React Reducer                                    | Reducer/state for CardService hook |
| AdaptiveCardViewer.tsx       | React Function component                         | Top-level UI component. |
| AdaptiveCardHost.tsx         | React Function component                         | Renders placeholder if template/data are missing. Handles card actions. |
| AdaptiveCard.tsx             | React Class component                            | Responsible for rendering adaptive card and expanding card with data |
