import { INPC } from '../types/INPC';

export type EasterEggDefinition = Omit<INPC,
  'x' | 'y' | 'vx' | 'vy' | 'walkTimer' | 'pauseTimer' |
  'facing' | 'animFrame' | 'animTimer' | 'speedMultiplier'
>;

export const EASTER_EGG_DEFINITIONS: EasterEggDefinition[] = [
  {
    id: 'pnp_rabbit',
    name: 'PnPjs',
    kind: 'easteregg',
    spriteKey: 'pnp_rabbit',
    title: 'PnPjs — The SharePoint & Graph JS Library 🐇',
    bio: 'pnp.github.io/pnpjs',
    bios: [
      // Tip 1 – What it is & SPFx setup
      '🐇 "Hello, I am PnPjs!"\n\n' +
      'PnPjs is a collection of fluent, open-source TypeScript libraries that make ' +
      'Microsoft 365 REST API and Microsoft Graph calls a joy.\n\n' +
      'In SPFx you get zero-config auth — just pass the web part context:\n\n' +
      '  import { spfi, SPFx } from "@pnp/sp";\n' +
      '  const sp = spfi().using(SPFx(this.context));\n\n' +
      'No tokens. No fetch wiring. It just works.\n\n' +
      '📖 Getting started → pnp.github.io/pnpjs',

      // Tip 2 – Fluent query API & performance
      '🐇 "Did you know? PnPjs has a fluent query API!"\n\n' +
      'Read SharePoint data with readable, chainable calls:\n\n' +
      '  const items = await sp.web\n' +
      '    .lists.getByTitle("Documents")\n' +
      '    .items\n' +
      '    .select("Title", "Id", "Modified")\n' +
      '    .orderBy("Modified", false)\n' +
      '    .top(50)();\n\n' +
      'PnPjs also supports request batching and in-memory caching ' +
      'via Behaviors — dramatically reducing round-trips to SharePoint.\n\n' +
      '⚡ Performance tips → pnp.github.io/pnpjs/concepts/batching',

      // Tip 3 – Microsoft Graph & ecosystem
      '🐇 "PnPjs goes beyond SharePoint!"\n\n' +
      '"@pnp/graph" gives you the same fluent API for Microsoft Graph:\n\n' +
      '  import { graphfi, SPFx } from "@pnp/graph";\n' +
      '  import "@pnp/graph/users";\n' +
      '  const me = await graph.me();\n\n' +
      '✅ Works in SPFx, Node.js, Azure Functions & browser apps\n' +
      '✅ Tree-shakable — only bundle what you use\n' +
      '✅ TypeScript-first with full typings\n' +
      '✅ 100% open-source (MIT)\n\n' +
      '🌐 Full docs → pnp.github.io/pnpjs',
    ],
  },
  {
    id: 'vesa_npc',
    name: 'Vesa',
    kind: 'easteregg',
    spriteKey: 'vesa_npc',
    title: 'Vesa — Principal PM, Microsoft',
    bio:
      '"This is SharePoint unless I am completely mistaken."'
  },
  {
    id: 'warrior_horse_1',
    name: 'Shadowmane',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'aka.ms/m365pnp',
    bios: [
      // What the PnP community is
      '🐴 "I am Shadowmane, guardian of the community!" \n\n' +
      'The Microsoft 365 & Power Platform Community (PnP) is a worldwide,\n' +
      'open-source effort coordinated by volunteers\n' +
      'which are MVPs & Microsoft employees & community members.\n\n' +
      '"PnP" = Patterns and Practices — real-world reusable solutions,\n' +
      'not just documentation.\n\n' +
      '📦 What the community ships:\n' +
      '  · SPFx web part & extension samples\n' +
      '  · Script samples (PowerShell, CLI, Graph)\n' +
      '  · Adaptive Card samples\n' +
      '  · Power Platform solutions\n' +
      '  · List & column formatting samples\n\n' +
      '🌐 Home base → aka.ms/m365pnp\n',

      // PnP community calls
      '🐴 "Did you know PnP runs FREE weekly calls?" \n\n' +
      'Every week the community runs open, recorded video calls:\n\n' +
      '  📅 Microsoft 365 & Power Platform call Presented by Microsoft — weekly Tuesdays\n' +
      '  📅 Microsoft 365 & Power Platform call Presented by Community — weekly Thursdays\n' +
      '  📅 Power Platform call — monthly\n\n' +
      'Each call features live demos, open Q&A and community news.\n' +
      'All recordings are free on YouTube — no registration needed.\n\n' +
      '🌐 Community hub → pnp.github.io',

      // How to get involved
      '🐴 "The herd welcomes new riders!" Contributing to PnP is easier than you think:\n\n' +
      '  1️⃣ Browse existing samples for inspiration\n' +
      '  2️⃣ Fork the repo on GitHub\n' +
      '  3️⃣ Add your sample / fix a bug\n' +
      '  4️⃣ Submit a Pull Request\n' +
      '  5️⃣ Get recognized in the weekly call and get a badge! 🎉\n\n' +
      'No contribution is too small — docs, bug fixes and translations count.\n\n' +
      '🤝 Start here → pnp.github.io\n' +
      '💻 All repos → github.com/pnp',
    ],
  },
  {
    id: 'warrior_horse_2',
    name: 'Ironhoof',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'pnp.github.io/List-Formatting',
    bios: [
      // What List Formatting is
      '🐴 "Ironhoof guards the beauty of your lists!" \n\n' +
      'List Formatting lets you transform the look of SharePoint list\n' +
      'columns, rows and views using pure JSON — no code, no SPFx needed.\n\n' +
      'There are two types:\n' +
      '  🔹 Column Formatting — style individual cells\n' +
      '  🔹 View Formatting — style entire rows or the whole view\n\n' +
      'You write JSON in the column/view settings and SharePoint renders\n' +
      'icons, colors, progress bars, buttons, pills — anything you imagine.\n\n' +
      '📖 Official docs → learn.microsoft.com/sharepoint/dev/declarative-customization/column-formatting\n' +
      '🎨 Community samples → pnp.github.io/List-Formatting',

      // Column formatting basics
      '🐴 "A quick column formatting tip from Ironhoof!" \n\n' +
      ' The simplest column format adds a color based on a value:\n\n' +
      '  {\n' +
      '    "$schema": ".../column-formatting.schema.json",\n' +
      '    "elmType": "div",\n' +
      '    "style": {\n' +
      '      "color": "=if([$Status]=\'Done\',\'green\',\'red\')"\n' +
      '    },\n' +
      '    "txtContent": "[$Status]"\n' +
      '  }\n\n' +
      'Key expressions: if(), @currentField, [$FieldName], @me, @now\n' +
      'Use operators: ==, !=, >, <, &&, ||\n\n' +
      '🎨 Sample library → pnp.github.io/List-Formatting',

      // Useful sample: data bars
      '🐴 "Ever seen a progress bar inside a SharePoint list cell?" \n\n' +
      ' The Data Bar column format renders a visual fill based on a number:\n\n' +
      '  · Great for % complete, scores, budgets\n' +
      '  · Completely JSON-driven — no custom code\n' +
      '  · Color shifts green→amber→red automatically\n\n' +
      'Find it in the PnP List Formatting sample gallery under\n' +
      '"data-bar" or search for "number" samples.\n\n' +
      'You can apply any sample in < 30 seconds:\n' +
      '  Column settings → Format this column → Paste JSON → Save\n\n' +
      '📊 Browse number samples → pnp.github.io/List-Formatting',
    ],
  },
  {
    id: 'warrior_horse_3',
    name: 'Cloudmist',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'pnp.github.io/List-Formatting',
    bios: [
      // Conditional icon formatting
      '🐴 "Cloudmist loves a colourful status column!" \n\n' +
      ' Replace dull text values with coloured icons using column formatting:\n\n' +
      '  "iconName": "=if([$Priority]==\'High\',\'ErrorBadge\',\n' +
      '              if([$Priority]==\'Medium\',\'Warning\',\'CheckMark\'))"\n\n' +
      'Fluent UI icon names work directly in iconName.\n' +
      'Add "color" to make them red / amber / green.\n\n' +
      '💡 Pro tip: open the Fluent UI icon browser at\n' +
      '   developer.microsoft.com/fluentui to find icon names.\n\n' +
      '🎨 Status/icon samples → pnp.github.io/List-Formatting',

      // Person column formatting
      '🐴 "Did you know you can format Person columns too?"\n\n' +
      ' Person column formatting lets you show profile photos, presence,\n' +
      'hyperlinked names and even department — all from JSON.\n\n' +
      'Key properties available on a Person field:\n' +
      '  [$AssignedTo.title]     — display name\n' +
      '  [$AssignedTo.email]     — email address\n' +
      '  [$AssignedTo.picture]   — profile photo URL\n' +
      '  [$AssignedTo.department]— department\n\n' +
      'Combine with an <img> elmType to show the photo inline.\n\n' +
      '👤 Person field samples → pnp.github.io/List-Formatting',

      // Hover card / action buttons
      '🐴 "Add action buttons right inside your list rows!"\n\n' +
      ' Column formatting supports customRowAction to add clickable buttons\n' +
      'that trigger Power Automate flows, open URLs, or send emails — \n' +
      'without leaving the list view.\n\n' +
      'Example use-cases:\n' +
      '  ✅ "Approve" button → triggers an approval flow\n' +
      '  📧 "Notify" button → opens an email draft\n' +
      '  🔗 "Open" button → navigates to related item\n\n' +
      'All driven by JSON — no SPFx, no deployment.\n\n' +
      '⚡ Action button samples → pnp.github.io/List-Formatting',
    ],
  },
  {
    id: 'warrior_horse_4',
    name: 'Ferndale',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'pnp.github.io/List-Formatting',
    bios: [
      // View formatting intro
      '🐴 "Ferndale patrols the view formatting frontier!"\n\n' +
      ' View Formatting styles entire rows — not just individual cells.\n\n' +
      'Use it to:\n' +
      '  🟥 Highlight overdue rows red\n' +
      '  🟩 Stripe alternate rows for readability\n' +
      '  🏷️ Add a callout badge to high-priority items\n' +
      '  🃏 Render items as cards in a custom layout\n\n' +
      'View Formatting JSON goes in:\n' +
      '  View → Format current view → Advanced mode\n\n' +
      '📐 View formatting samples → pnp.github.io/List-Formatting',

      // Group header formatting
      '🐴 "Group headers can look amazing too!"\n\n' +
      ' When you group a SharePoint view, you can format the group header\n' +
      'row separately with groupProps in your view format JSON.\n\n' +
      'Ideas:\n' +
      '  · Show item count as a coloured pill\n' +
      '  · Add a progress bar showing % complete within the group\n' +
      '  · Display an icon that changes based on group value\n\n' +
      'This makes grouped project trackers, kanban tables and\n' +
      'dashboards look truly professional — still zero code.\n\n' +
      '🗂️ Group header samples → pnp.github.io/List-Formatting',

      // Row formatting conditional highlight
      '🐴 "Highlight what matters — colour your whole row!"\n\n' +
      ' Conditional row formatting makes critical items impossible to miss:\n\n' +
      '  {\n' +
      '    "$schema": ".../view-formatting.schema.json",\n' +
      '    "additionalRowClass":\n' +
      '      "=if([$DueDate] < @now, \'sp-field-severity--severeWarning\', \'\')"\n' +
      '  }\n\n' +
      'Built-in severity classes: --good, --low, --warning,\n' +
      '--severeWarning, --blocked\n\n' +
      '🎨 Row highlight samples → pnp.github.io/List-Formatting',
    ],
  },
  {
    id: 'warrior_horse_5',
    name: 'Copperbell',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'aka.ms/m365pnp',
    bios: [
      // PnP PowerShell
      '🐴 "Copperbell rings for PnP PowerShell!" \n\n' +
      ' PnP PowerShell is a cross-platform PowerShell module with 500+\n' +
      'cmdlets covering SharePoint, Teams, Planner, Power Platform and more.\n\n' +
      'Quick examples:\n' +
      '  Connect-PnPOnline -Url https://tenant.sharepoint.com -Interactive\n' +
      '  Get-PnPList\n' +
      '  Add-PnPField -List "Tasks" -DisplayName "Risk" -Type Choice\n' +
      'Install: Install-Module PnP.PowerShell\n\n' +
      '📘 Full docs → pnp.github.io/powershell\n' +
      '🌐 Community → aka.ms/m365pnp',

      // CLI for Microsoft 365
      '🐴 "CLI for Microsoft 365 — manage M365 from any shell!" \n\n' +
      ' The CLI for Microsoft 365 is a cross-platform command-line tool\n' +
      'that lets you manage Microsoft 365 from bash, zsh, PowerShell\n' +
      'or even Azure DevOps pipelines.\n\n' +
      'Quick examples:\n' +
      '  m365 login\n' +
      '  m365 spo site list\n' +
      '  m365 spo list add --title "Projects" --baseTemplate GenericList\n' +
      'Great for automation, CI/CD and scripted provisioning.\n\n' +
      '⚙️ Docs & install → pnp.github.io/cli-microsoft365\n' +
      '🌐 Community → aka.ms/m365pnp',

      // Sample Solution Gallery
      '🐴 "The PnP Sample Solution Gallery — your cheat code!"\n\n' +
      ' Before writing any code, check the PnP Sample Solution Gallery.\n' +
      'It contains thousands of ready-to-use samples:\n\n' +
      '  🔷 SPFx web parts & extensions\n' +
      '  🔷 List & column formatting JSON\n' +
      '  🔷 Power Automate flow templates\n' +
      '  🔷 PowerShell & Graph scripts\n' +
      '  🔷 Adaptive Card designs\n\n' +
      'Filter by product, author, technology — find something in seconds.\n\n' +
      '🗂️ Sample gallery → adoption.microsoft.com/sample-solution-gallery\n' +
      '🌐 Community → aka.ms/m365pnp',
    ],
  },
  {
    id: 'cli_m365',
    name: 'CLI M365',
    kind: 'easteregg',
    spriteKey: 'm365_chilli',
    title: '> CLI for Microsoft 365 — Manage M365 from any shell',
    bio: 'pnp.github.io/cli-microsoft365',
    bios: [
      // Tip 1 — What it is & how to install
      '> CLI for Microsoft 365\n\n' +
      'A free, open-source, cross-platform CLI built on Node.js that lets you ' +
      'manage your whole Microsoft 365 tenant from any terminal — ' +
      'bash, zsh, fish, PowerShell or CMD.\n\n' +
      'Install once, use everywhere:\n' +
      '  npm i -g @pnp/cli-microsoft365\n\n' +
      'Sign in (interactive browser pop-up):\n' +
      '  m365 login\n\n' +
      'Or certificate / secret auth for automation:\n' +
      '  m365 login --authType certificate --certificateFile cert.pem\n\n' +
      'Works on Windows, macOS & Linux. Zero extra tooling required.\n\n' +
      '\u2139\ufe0f  Install guide  \u2192 pnp.github.io/cli-microsoft365/user-guide/installing-cli\n' +
      '\ud83c\udf10 Full docs      \u2192 pnp.github.io/cli-microsoft365',

      // Tip 2 — Key commands across workloads
      '> m365 --help  (a few favorites)\n\n' +
      'SharePoint Online:\n' +
      '  m365 spo site list\n' +
      '  m365 spo site add --alias dev --title "Dev Portal"\n' +
      '  m365 spo list add --title "Projects" --baseTemplate GenericList \\\n' +
      '        --webUrl https://tenant.sharepoint.com/sites/dev\n' +
      '  m365 spo file get --webUrl <url> --url /Shared%20Documents/spec.pdf\n\n' +
      'Microsoft Teams:\n' +
      '  m365 teams team list\n' +
      '  m365 teams channel add --teamId <id> --name "Dev Chat"\n\n' +
      'Entra ID (Azure AD):\n' +
      '  m365 entra app list\n' +
      '  m365 entra app set --appId <id> --uris https://myapp.com\n\n' +
      'Pipe JSON to jq for scripting:\n' +
      '  m365 spo site list --output json | jq \'.[].Url\'\n\n' +
      '\u2699\ufe0f  Command reference \u2192 pnp.github.io/cli-microsoft365/cmd/spo/site/site-list',

      // Tip 3 — MCP server
      '> CLI for Microsoft 365 MCP Server\n\n' +
      'The CLI for Microsoft 365 MCP Server is a standalone Model Context\n' +
      'Protocol server that exposes the full power of the CLI to AI assistants\n' +
      'like GitHub Copilot, Claude and Cursor.\n\n' +
      'Configure it in VS Code (.vscode/mcp.json or settings.json):\n' +
      '  {\n' +
      '    "servers": {\n' +
      '      "cli-m365": {\n' +
      '        "type": "stdio",\n' +
      '        "command": "npx",\n' +
      '        "args": ["-y", "@pnp/cli-microsoft365-mcp"]\n' +
      '      }\n' +
      '    }\n' +
      '  }\n\n' +
      'Once connected, your AI can list SPO sites, create Teams channels,\n' +
      'manage Entra apps and much more \u2014 all through natural language prompts.\n\n' +
      '\ud83e\udd16 Full guide \u2192 pnp.github.io/cli-microsoft365/user-guide/using-cli-mcp-server',
    ],
  },
  {
    id: 'campfire_dev',
    name: 'Community Campfire',
    kind: 'easteregg',
    spriteKey: 'campfire',
    title: '🔥 Microsoft 365 & Power Platform Community (PnP)',
    bio:
      'Welcome to the campfire — heart of the PnP community!\n\n' +
      'The Microsoft 365 & Power Platform Community (PnP) is a global open-source ' +
      'initiative coordinated by Microsoft engineers and volunteer MVPs & community members. ' +
      '"PnP" stands for Patterns and Practices — sharing real-world, reusable solutions.\n\n' +
      '🛠 Open-source tools: PnPjs · CLI for Microsoft 365 · PnP PowerShell · ' +
      'PnP Core SDK · PnP Modern Search · PnP Provisioning Engine\n\n' +
      'SPFx web parts, script samples, Adaptive Cards, Power Platform solutions\n\n' +
      '📞 Free community calls every week ' +
      'Microsoft 365 Platform and more. All recordings free on YouTube.\n\n' +
      '🌐 pnp.github.io\n' +
      '⭐ aka.ms/m365pnp\n' +
      '💻 github.com/pnp',
  },
  {
    id: 'spfx_toolkit',
    name: 'SPFx Toolkit',
    kind: 'easteregg',
    spriteKey: 'spfx_toolkit',
    title: 'SPFx Toolkit — VS Code extension for SharePoint Framework',
    bio: 'pnp.github.io/vscode-viva',
    bios: [
      // Tip 1 — What it is & install
      '"Hello, I am the SPFx Toolkit!"\n\n' +
      'SPFx Toolkit is a free, open-source VS Code extension built by the PnP ' +
      'community that turbocharges SharePoint Framework development.\n\n' +
      'Install from the VS Code Marketplace\n' +
      'What you get out of the box:\n' +
      '  \u2705 Project scaffolding wizard (web parts, extensions, ACEs)\n' +
      '  \u2705 One-click build, start, deploy actions\n' +
      '  \u2705 Sign in to your Microsoft 365 tenant\n' +
      '  \u2705 Browse & use PnP samples directly in VS Code\n\n' +
      '\ud83d\udce6 Install \u2192 marketplace.visualstudio.com (search SPFx Toolkit)\n' +
      '\ud83c\udf10 Docs    \u2192 aka.ms/spfx/toolkit',

      // Tip 2 — CI/CD pipelines & upgrade
      '"From project to production pipeline in minutes!"\n\n' +
      'SPFx Toolkit goes beyond scaffolding:\n\n' +
      '  \ud83d\udd04 Upgrade SPFx projects \u2014 analyses your solution and\n' +
      '     generates step-by-step upgrade instructions to the\n' +
      '     latest SPFx version using CLI for Microsoft 365\n\n' +
      '  \ud83d\ude80 CI/CD pipeline generator \u2014 creates ready-to-use\n' +
      '     GitHub Actions or Azure DevOps YAML pipelines\n' +
      '     for build, package and deploy\n\n' +
      '  \ud83d\udccb Validate solutions \u2014 checks your project for\n' +
      '     common issues before deployment\n\n' +
      '  \ud83d\uddc2  Sample gallery \u2014 browse 500+ PnP samples and\n' +
      '     open them directly into your workspace\n\n' +
      '\u2699\ufe0f Pipeline guide \u2192 pnp.github.io/vscode-viva/guides/ci-cd-pipeline\n' +
      '\ud83c\udf10 Full docs       \u2192 pnp.github.io/vscode-viva',

      // Tip 3 — Actions panel
      '"Every SPFx task — one click away!"\n\n' +
      'The SPFx Toolkit Actions panel puts the full development\n' +
      'lifecycle right inside VS Code. No terminal needed:\n\n' +
      '  \ud83d\udee0\ufe0f  Build solution         \u2014 compile & type-check\n' +
      '  \u2601\ufe0f   Deploy to App Catalog   \u2014 tenant or site-scoped\n' +
      '  \ud83d\udccb  Grant API permissions   \u2014 approve pending scope requests\n' +
      '  \ud83d\udd04  Upgrade project         \u2014 guided upgrade to latest SPFx\n' +
      '  \u2705   Validate                \u2014 pre-flight checks before deploy\n' +
      '  \u270f\ufe0f   Rename project          \u2014 update solution name & IDs\n\n' +
      'All actions use CLI for Microsoft 365 under the hood and\n' +
      'respect your active tenant sign-in.\n\n' +
      '\ud83d\udcd6 Actions docs \u2192 pnp.github.io/vscode-viva/features/actions',

      // Tip 4 — Copilot agent mode: Language Model Tools for SPO management
      '"Let GitHub Copilot agent manage SharePoint for you!"\n\n' +
      'SPFx Toolkit registers Language Model Tools for GitHub Copilot\n' +
      'agent mode. Just describe what you want — Copilot picks the\n' +
      'right tool automatically. Or # hashtag a tool to be explicit.\n\n' +
      'You need to be signed in to your tenant in SPFx Toolkit first.\n\n' +
      'SharePoint Online management tools available:\n\n' +
      '  \ud83d\udce6 Apps\n' +
      '     SharePointAppList          \u2014 list tenant app catalog\n' +
      '     SharePointAppInstall       \u2014 install app into a site\n' +
      '     SharePointAppUninstall     \u2014 remove app from a site\n' +
      '     SharePointAppUpgrade       \u2014 upgrade app to latest version\n' +
      '     SharePointAppInstanceList  \u2014 list apps installed in a site\n\n' +
      '  \ud83d\udcca Lists\n' +
      '     SharePointListAdd          \u2014 create a list in a site\n' +
      '     SharePointListGet          \u2014 get list details\n' +
      '     SharePointListRemove       \u2014 delete a list\n\n' +
      '  \ud83d\udcc4 Pages\n' +
      '     SharePointPageAdd          \u2014 create a page\n' +
      '     SharePointPageGet          \u2014 get page details\n' +
      '     SharePointPageList         \u2014 list all pages in a site\n' +
      '     SharePointPageCopy         \u2014 copy page across sites\n' +
      '     SharePointPageRemove       \u2014 delete a page\n\n' +
      '  \ud83c\udf10 Sites\n' +
      '     SharePointSiteAdd          \u2014 create a new SPO site\n' +
      '     SharePointSiteGet          \u2014 get site details\n' +
      '     SharePointSiteRemove       \u2014 delete a site\n\n' +
      '  \ud83d\udd04 Projects\n' +
      '     SharePointFrameworkProjectUpgrade \u2014 upgrade your SPFx solution\n\n' +
      '\ud83e\udd16 LM tools guide \u2192 pnp.github.io/vscode-viva/features/github-copilot-capabilities/#agent-mode---language-model-tools',
    ],
  },
  {
    id: 'pnp_powershell',
    name: 'PnP PowerShell',
    kind: 'easteregg',
    spriteKey: 'pnp_powershell',
    title: 'PnP PowerShell — Manage Microsoft 365 from any shell',
    bio: 'pnp.github.io/powershell',
    bios: [
      // Tip 1 — What it is & install
      'PS> # PnP PowerShell\n\n' +
      'PnP PowerShell is a cross-platform PowerShell module with 500+\n' +
      'cmdlets for managing SharePoint Online, Teams, Planner,\n' +
      'Power Platform, Entra ID and much more.\n\n' +
      'Install from the PowerShell Gallery:\n' +
      '  Install-Module PnP.PowerShell\n\n' +
      'Sign in (interactive, browser pop-up):\n' +
      '  Connect-PnPOnline -Url https://tenant.sharepoint.com \\\n' +
      '    -Interactive\n\n' +
      'ℹ️  Install guide  → pnp.github.io/powershell/getting-started\n' +
      '🌐 Full docs      → pnp.github.io/powershell',

      // Tip 2 — Key cmdlets
      'PS> Get-Command -Module PnP.PowerShell | Measure-Object\n\n' +
      'Common daily-driver cmdlets:\n\n' +
      'SharePoint Online:\n' +
      '  Get-PnPList                 — list all lists in a site\n' +
      '  Get-PnPListItem -List Tasks  — get items from a list\n' +
      '  Add-PnPListItem -List Tasks  — add a new item\n' +
      '  Set-PnPListItem              — update an item\n' +
      '  Add-PnPField                 — add a column to a list\n\n' +
      'Sites & Pages:\n' +
      '  New-PnPSite                  — create a new SPO site\n' +
      '  Get-PnPContext               — inspect current connection\n' +
      '  Add-PnPPage                  — create a modern page\n\n' +
      'Microsoft Teams:\n' +
      '  Get-PnPTeamsTeam             — list all Teams\n' +
      '  New-PnPTeamsTeam             — create a Team\n\n' +
      '📖 Cmdlet reference → pnp.github.io/powershell/cmdlets',

      // Tip 3 — Authentication methods
      'PS> Connect-PnPOnline # pick your auth method\n\n' +
      'First: register your own Entra ID app and grant it the right\n' +
      'permissions. All auth methods require -ClientId.\n\n' +
      '\ud83d\udc64 Interactive \u2014 browser pop-up, supports MFA:\n' +
      '  Connect-PnPOnline <url> -Interactive -ClientId <id>\n\n' +
      '\ud83d\udcbb Device Login \u2014 authenticate on a different device:\n' +
      '  Connect-PnPOnline <url> -DeviceLogin -ClientId <id>\n' +
      '  (visit microsoft.com/devicelogin and enter the shown code)\n\n' +
      '\ud83e\udd9a WAM / OS Login \u2014 Windows Hello, FIDO, SSO (Windows only):\n' +
      '  Connect-PnPOnline <url> -OSLogin -ClientId <id>\n\n' +
      '\ud83e\udd16 Certificate \u2014 unattended / CI\u2013CD, no user needed:\n' +
      '  Connect-PnPOnline <url> -ClientId <id> \\\n' +
      '    -Tenant <tenant>.onmicrosoft.com \\\n' +
      '    -CertificatePath path\\to\\cert.pfx\n\n' +
      '\u2699\ufe0f  Full auth guide \u2192 pnp.github.io/powershell/articles/authentication',
    ],
  },
  {
    id: 'julie',
    name: 'Julie',
    kind: 'easteregg',
    spriteKey: 'julie',
    title: '🌟 Julie — Microsoft MVP & PnP Core Team',
    bio: 'https://julieturner.net/me',
    bios: [
      // Introduction
      '🎙️ "Hello! I am Julie!"\n\n' +
      'Microsoft MVP & Microsoft 365 Architect with over 25 years ' +
      'of experience building solutions and helping the community.\n\n' +
      'I\'m a member of the M365 PnP team and passionate about ' +
      'open-source, sharing knowledge, and helping developers ' +
      'build better solutions.\n\n' +
      'You can find me speaking at conferences, on podcasts, ' +
      'and contributing to the PnP community.\n\n' +
      '🌐 Learn more → https://julieturner.net/me',

      // PnPjs
      '🎙️ "Let me tell you about PnPjs!"\n\n' +
      'PnPjs is one of the most powerful open-source libraries ' +
      'for working with SharePoint and Microsoft Graph.\n\n' +
      '✨ Why PnPjs is amazing:\n' +
      '  ✅ Fluent, chainable API that\'s easy to read\n' +
      '  ✅ Works seamlessly in SPFx with zero config\n' +
      '  ✅ Built-in batching and caching for performance\n' +
      '  ✅ Full TypeScript support with IntelliSense\n' +
      '  ✅ Active community and regular updates\n' +
      '  ✅ Supports SharePoint REST API & Microsoft Graph\n\n' +
      'Whether you\'re building SPFx web parts, extensions, ' +
      'or Node.js apps — PnPjs makes your life easier.\n\n' +
      '📖 Documentation → https://pnp.github.io/pnpjs/',

      // Code Deploy Go Podcast
      '🎙️ "Have you listened to Code Deploy Go Live?"\n\n' +
      'Code, Deploy, Go Live is a podcast hosted by Microsoft MVPs ' +
      'Andrew Connell & Julie Turner, covering the latest news\n' +
      'in Microsoft 365, Microsoft Azure, and web development.\n\n' +
      '🎧 What you\'ll hear:\n' +
      '  ✅ Latest news and updates from Microsoft\n' +
      '  ✅ Deep dives on Microsoft 365 and Azure topics\n' +
      '  ✅ Interviews and discussions with Andrew\n' +
      '  ✅ Insights from experienced MVPs\n' +
      '  ✅ Web development best practices\n\n' +
      'Regular episodes featuring in-depth conversations ' +
      'between Andrew and Julie on the latest technologies.\n\n' +
      '🎙️ Listen now → https://codedeploygo.live/',

      // Community Contribution
      '🎙️ "The community is stronger when we all contribute!"\n\n' +
      'The PnP community thrives because people like YOU ' +
      'share their knowledge, code, and experiences.\n\n' +
      '🌟 Ways to contribute:\n' +
      '  ✅ Submit a sample to the PnP repositories\n' +
      '  ✅ Answer questions in discussions\n' +
      '  ✅ Report bugs or suggest improvements\n' +
      '  ✅ Share your solutions on the blog\n' +
      '  ✅ Demo your work on community calls\n' +
      '  ✅ Help others learn and grow\n\n' +
      'Every contribution matters — from a simple bug fix ' +
      'to a full solution. The community welcomes all!\n\n' +
      '🤝 Get involved → aka.ms/m365pnp',
    ],
  },
  {
    id: 'luise',
    name: 'Luise',
    kind: 'easteregg',
    spriteKey: 'luise',
    title: '👑 Luise — M365 Princess',
    bio: 'aka.ms/community/blog',
    bios: [
      // Introduction
      '👑 "Hello! I am Luise, the M365 Princess!"\n\n' +
      'Microsoft MVP in M365 Development and Business Applications, ' +
      'and a member of the M365 PnP team, based in Germany.\n\n' +
      'Open-So(u)rceress | Punk at 🤍 | Princess 👑\n\n' +
      'I\'m into open-source, Lego, and running.\n\n' +
      'My mission is to help the community learn, build, ' +
      'and share amazing solutions.\n\n' +
      '🌐 Learn more → https://www.m365princess.com/',

      // Community Blog
      '👑 "Did you know about the M365 Community Blog?"\n\n' +
      'The Microsoft 365 & Power Platform Community blog is THE place ' +
      'to discover tips, tricks, and best practices from MVPs, ' +
      'Microsoft employees, and passionate community members.\n\n' +
      '📝 What you will find:\n' +
      '  ✅ Deep-dive technical articles\n' +
      '  ✅ Real-world solution patterns\n' +
      '  ✅ Power Platform tips and tricks\n' +
      '  ✅ SharePoint & Teams guidance\n' +
      '  ✅ Azure integration stories\n\n' +
      'New posts published regularly by community experts.\n' +
      'All content is free and open to everyone!\n\n' +
      '📖 Read the blog → aka.ms/community/blog',

      // Community Calls Demo Request
      '👑 "Want to show YOUR work to the community?"\n\n' +
      'The PnP Community Calls welcome demos from everyone!\n' +
      'If you have built something cool with Microsoft 365, ' +
      'Power Platform, or Azure — share it with thousands ' +
      'of community members in a live call.\n\n' +
      '🎤 Why demo on a call?\n' +
      '  ✅ Reach a global audience\n' +
      '  ✅ Get recognized with a contributor badge\n' +
      '  ✅ Connect with other builders\n' +
      '  ✅ Inspire others with your work\n' +
      '  ✅ Recording stays on YouTube forever\n\n' +
      'No need to be an MVP or expert — we welcome ALL demos!\n\n' +
      '🎯 Submit your demo → aka.ms/community/request/demo',

      // Thoughtful Automation
      '👑 "Just because you CAN automate it..."\n\n' +
      'Before you spend a week building a flow to avoid ' +
      'five minutes of manual work, take a step back.\n\n' +
      '⚠️ Ask yourself:\n' +
      '  ✅ Does this process actually repeat often enough?\n' +
      '  ✅ Is the data quality reliable and consistent?\n' +
      '  ✅ Do we have a proper system of record?\n' +
      '  ✅ What happens when the automation fails?\n' +
      '  ✅ Is the maintenance cost worth the time saved?\n\n' +
      'Context matters. Data quality matters. ' +
      'And no, "just ping Sandra" is NOT a system of record.\n\n' +
      'Sometimes the smartest automation is knowing ' +
      'when NOT to automate. 🤔',
    ],
  },
  {
    id: 'pnp_core',
    name: 'PnP Core SDK',
    kind: 'easteregg',
    spriteKey: 'pnp_core',
    title: 'PnP Core SDK — Fluent C# / .NET library for Microsoft 365',
    bio: 'pnp.github.io/pnpcore',
    bios: [
      // Tip 1 — What it is & getting started
      '🔷 "Hello! I am the PnP Core SDK!"\n\n' +
      'PnP Core SDK is a modern, open-source .NET library for working with\n' +
      'Microsoft 365 — SharePoint, Teams, Viva Engage, and Graph.\n' +
      'Built for server-side .NET / .NET Standard 2.0 scenarios\n' +
      '  · Azure Functions\n' +
      '  · ASP.NET Core web apps\n' +
      '  · Console / background services\n' +
      '  · Blazor Server apps\n' +
      'Zero-config authentication via dependency injection:\n' +
      '  services.AddPnPCore(options => {\n' +
      '    options.Sites.Add("mySite", new PnPCoreSiteOptions {\n' +
      '      SiteUrl = "https://tenant.sharepoint.com/sites/dev"\n' +
      '    });\n' +
      '  });\n' +
      'Install:\n' +
      '  dotnet add package PnP.Core\n' +
      '  dotnet add package PnP.Core.Auth\n' +
      '📖 Getting started → pnp.github.io/pnpcore/using-the-sdk/readme\n',

      // Tip 2 — SharePoint operations & batching
      '🔷 "SharePoint queries — fluent, readable, batch-ready!"\n\n' +
      'PnP Core SDK models SharePoint as a navigable object graph.\n' +
      'Load only the properties you need, in any combination:\n' +
      '  using var context = await pnpContextFactory\n' +
      '    .CreateAsync("mySite");\n' +
      '  var list = await context.Web.Lists\n' +
      '    .GetByTitleAsync("Projects",\n' +
      '      l => l.Title, l => l.ItemCount);\n' +
      '  var items = await list.Items\n' +
      '    .Where(i => i.Title != null)\n' +
      '    .Top(50)\n' +
      '    .GetAsync();\n' +
      'Batch multiple requests into a single round-trip:\n' +
      '  var batch = context.NewBatch();\n' +
      '  var w1 = context.Web.GetBatchAsync(batch, w => w.Title);\n' +
      '  var l1 = context.Web.Lists.GetBatchAsync(batch);\n' +
      '  await context.ExecuteAsync(batch);\n' +
      '⚡ Batching guide → pnp.github.io/pnpcore/using-the-sdk/basics-batching',
    ],
  },
  {
    id: 'pnp_spfx_samples',
    name: 'PnP SPFx Samples',
    kind: 'easteregg',
    spriteKey: 'pnp_spfx_samples',
    title: '📚 PnP SPFx Samples — Real-world SharePoint Framework examples',
    bio: 'pnp.github.io/sp-dev-fx-webparts',
    bios: [

      // Tip 1 — What it is
      '📚 "Welcome to the PnP SPFx Samples collection!"\n\n' +
      'The PnP SPFx Samples repository is a community-driven library of ' +
      'real-world SharePoint Framework solutions created by developers ' +
      'from around the world.\n\n' +
      'It contains hundreds of examples demonstrating:\n' +
      '  ✅ Modern web parts\n' +
      '  ✅ SharePoint extensions\n' +
      '  ✅ Adaptive Card Extensions (ACEs)\n' +
      '  ✅ Microsoft Graph integrations\n' +
      '  ✅ Teams + SharePoint solutions\n\n' +
      'These samples are production-quality references showing recommended ' +
      'SPFx patterns and best practices.\n\n' +
      '🌐 Browse the full gallery → aka.ms/m365/samples',


      // Tip 2 — How to use samples
      '📚 "Learn SPFx faster by exploring real solutions!"\n\n' +
      'Each sample in the PnP repository includes everything you need ' +
      'to understand and run the project:\n' +
      '  📄 Detailed README documentation\n' +
      '  ⚙️ Setup and configuration steps\n' +
      '  🧩 Architecture explanations\n' +
      '  🧪 Tested build and deployment instructions\n\n' +
      'Most samples can be started quickly:\n' +
      '  1️⃣ Clone the repository\n' +
      '  2️⃣ Run `npm install`\n' +
      '  3️⃣ Run `gulp serve`\n\n' +
      'This lets you explore working SPFx solutions directly ' +
      'in the local SharePoint Workbench.\n\n' +
      '💻 GitHub repos:\n' +
      '   · Web parts → github.com/pnp/sp-dev-fx-webparts\n' +
      '   · Extensions → github.com/pnp/sp-dev-fx-extensions\n' +
      '   · ACEs → github.com/pnp/sp-dev-fx-aces',


      // Tip 3 — Community & contribution
      '📚 "PnP samples are built by the community, for the community!"\n\n' +
      'Microsoft 365 developers across the world contribute new samples ' +
      'and improvements to the PnP repository.\n\n' +
      'You can:\n' +
      '  ⭐ Discover new development techniques\n' +
      '  🔍 Study real integrations with Microsoft Graph\n' +
      '  🧠 Learn modern React + SPFx patterns\n' +
      '  🤝 Contribute your own sample back to the community\n\n' +
      'The repository currently contains hundreds of solutions ' +
      'covering many SharePoint development scenarios.\n\n' +
      '🤝 Contribute to:\n' +
      '   · Web parts → github.com/pnp/sp-dev-fx-webparts\n' +
      '   · Extensions → github.com/pnp/sp-dev-fx-extensions\n' +
      '   · ACEs → github.com/pnp/sp-dev-fx-aces',
    ],
  },
  {
    id: 'hugo',
    name: 'Hugo',
    kind: 'easteregg',
    spriteKey: 'hugo',
    title: '☕ Hugo — World\'s Laziest Developer',
    bio: 'World\'s Laziest Developer, powered by coffee | AI Architect | Microsoft MVP',
    bios: [
      // Introduction
      '☕ "Hello! I am Hugo!"\n\n' +
      'World\'s Laziest Developer, powered by coffee | AI Architect | Microsoft MVP.\n\n' +
      'I autoblock anyone who contacts me to sell me anything. 🚫\n\n' +
      'But if you want to learn and grow in the community, ' +
      'I\'m always happy to help!\n\n' +
      'My tip: check out the Sharing Is Caring program — ' +
      'the best way to start contributing to the PnP community.\n\n' +
      '🤝 Start here → https://pnp.github.io/sharing-is-caring/',

      // Sharing Is Caring
      '☕ "Want to contribute but don\'t know where to start?"\n\n' +
      'The Sharing Is Caring program is a community initiative ' +
      'that helps you take your first steps into open-source ' +
      'contribution within the Microsoft 365 ecosystem.\n\n' +
      '🎓 What you get:\n' +
      '  ✅ Hands-on guidance for your first Pull Request\n' +
      '  ✅ Learn to submit samples, docs, and code fixes\n' +
      '  ✅ Buddy system — an experienced contributor helps you\n' +
      '  ✅ Sessions on GitHub setup, forking, and PR workflow\n' +
      '  ✅ It\'s FREE and open to everyone!\n\n' +
      'No contribution is too small — every PR counts.\n\n' +
      '🤝 Join the program → https://pnp.github.io/sharing-is-caring/',

      // PnP SPFx web parts gallery
      '☕ "Before writing any SPFx web part from scratch..."\n\n' +
      'Check the PnP SPFx Web Parts gallery first! It has hundreds ' +
      'of community-built, production-quality SharePoint Framework ' +
      'web parts ready to use and learn from.\n\n' +
      '📦 What you will find:\n' +
      '  ✅ Real-world web parts for every scenario\n' +
      '  ✅ Microsoft Graph integrations\n' +
      '  ✅ React + SPFx best practices\n' +
      '  ✅ Fully documented with setup instructions\n' +
      '  ✅ Open-source — fork, learn, contribute back!\n\n' +
      'Why reinvent the wheel? Stand on the shoulders of the community.\n\n' +
      '🌐 Gallery → aka.ms/spfx-webparts\n' +
      '💻 GitHub → https://github.com/pnp/sp-dev-fx-webparts',

      // Lazy developer tip
      '☕ "A truly lazy developer automates everything..."\n\n' +
      'And the laziest developer of all? Uses what the community ' +
      'has already built. That\'s not lazy — that\'s smart.\n\n' +
      '💡 Hugo\'s workflow:\n' +
      '  1️⃣ Check PnP samples before coding anything\n' +
      '  2️⃣ Use SPFx Toolkit in VS Code for scaffolding\n' +
      '  3️⃣ Leverage PnPjs for SharePoint & Graph calls\n' +
      '  4️⃣ Contribute back to Sharing Is Caring\n' +
      '  5️⃣ Refill coffee. Repeat. ☕\n\n' +
      'The best code is the code someone else already wrote and tested.\n\n' +
      '🤝 Sharing Is Caring → https://pnp.github.io/sharing-is-caring/\n' +
      '🌐 SPFx Web Parts → aka.ms/spfx-webparts',
    ],
  },
];
