import { INPC } from '../types/INPC';

export type M365EasterEggDefinition = Omit<INPC,
  'x' | 'y' | 'vx' | 'vy' | 'walkTimer' | 'pauseTimer' |
  'facing' | 'animFrame' | 'animTimer' | 'speedMultiplier'
>;

export const M365_EASTER_EGG_DEFINITIONS: M365EasterEggDefinition[] = [
  {
    id: 'power_automate',
    name: 'Power Automate',
    kind: 'm365egg',
    spriteKey: 'power_automate',
    title: 'Power Automate — Automate your workflows',
    bio: 'make.powerautomate.com',
    bios: [
      // Tip 1 — What it is
      '\u26a1 "Hello, I am Power Automate!"\n\n' +
      'Power Automate (formerly Microsoft Flow) is a cloud-based service\n' +
      'that lets you create automated workflows between your favorite\n' +
      'apps and services — no code required.\n\n' +
      'Key flow types:\n' +
      '  \u2601\ufe0f  Cloud flows   \u2014 trigger on events (email, form, schedule)\n' +
      '  \ud83d\udda5\ufe0f  Desktop flows \u2014 automate legacy/desktop apps with RPA\n' +
      '  \ud83d\udcca Business process flows \u2014 guide users through a process\n\n' +
      'Use cases:\n' +
      '  \u2705 Approval workflows (SharePoint, Teams)\n' +
      '  \u2705 Automated email notifications & reminders\n' +
      '  \u2705 Sync data between SharePoint, Excel, Dataverse\n' +
      '  \u2705 Post to Teams when a list item changes\n\n' +
      '\ud83c\udf10 Get started \u2192 make.powerautomate.com\n' +
      '\ud83d\udcd6 Docs \u2192 learn.microsoft.com/power-automate',

      // Tip 2 — SharePoint integration
      '\u26a1 "Power Automate \u2661 SharePoint!"\n\n' +
      'Power Automate has deep, native integration with SharePoint:\n\n' +
      '\ud83d\udce5 Triggers (start a flow when...):\n' +
      '  \u2022 A new item is created in a list\n' +
      '  \u2022 An existing item is modified\n' +
      '  \u2022 A file is created/modified in a library\n' +
      '  \u2022 An item is deleted\n\n' +
      '\u2699\ufe0f  Actions (do things with SharePoint):\n' +
      '  \u2022 Create / update / delete list items\n' +
      '  \u2022 Get items with filter, sort, top queries (OData)\n' +
      '  \u2022 Send files, move files, copy files\n' +
      '  \u2022 Start an approval, send email, post to Teams\n\n' +
      '\ud83d\udca1 Pro tip: Use "Send an HTTP request to SharePoint" action\n' +
      'to call REST APIs not covered by built-in actions.\n\n' +
      '\ud83d\udcd6 SharePoint connector \u2192 learn.microsoft.com/connectors/sharepointonline',

      // Tip 3 — Approvals & Teams
      '\u26a1 "Approvals made easy with Power Automate + Teams!"\n\n' +
      'The Approvals connector lets you build formal review processes:\n\n' +
      '  1\ufe0f\u20e3 Trigger: item submitted in SharePoint list\n' +
      '  2\ufe0f\u20e3 Action: Start and wait for an approval\n' +
      '     \u2022 Assign to specific users or a group\n' +
      '     \u2022 Set due date, add details & attachments\n' +
      '  3\ufe0f\u20e3 Condition: if approved \u2192 update status, notify\n' +
      '           if rejected \u2192 send feedback, revert\n\n' +
      'Approvals appear directly in Microsoft Teams as\n' +
      'adaptive cards \u2014 no context switching needed.\n\n' +
      'Available approval types:\n' +
      '  \u2022 Approve / Reject (first to respond)\n' +
      '  \u2022 Approve / Reject (everyone must respond)\n' +
      '  \u2022 Custom responses\n\n' +
      '\ud83d\udcd6 Approvals guide \u2192 learn.microsoft.com/power-automate/approvals-teams',
    ],
  },
  {
    id: 'power_apps',
    name: 'Power Apps',
    kind: 'm365egg',
    spriteKey: 'power_apps',
    title: '\u26a1 Power Apps \u2014 Build apps without code',
    bio: 'make.powerapps.com',
    bios: [
      // Tip 1 \u2013 Build apps fast
      '\u26a1 "Build apps fast with Power Apps!"\n\n' +
      'Power Apps is a suite of apps, services, and connectors that lets you ' +
      'build custom business apps without writing code. Create mobile and web ' +
      'apps that connect to data stored in Microsoft Dataverse or various ' +
      'data sources like SharePoint, Excel, SQL, and 900+ connectors.\n\n' +
      'App types:\n' +
      '  \ud83d\udcf1 Canvas apps \u2014 drag-and-drop designer, pixel-perfect UI\n' +
      '  \ud83d\udcca Model-driven apps \u2014 data-driven, responsive layouts\n' +
      '  \ud83e\udde9 Copilot Studio \u2014 build AI-powered conversational apps\n\n' +
      'Use cases:\n' +
      '  \u2705 Inspection & survey forms\n' +
      '  \u2705 Asset tracking & inventory management\n' +
      '  \u2705 Custom dashboards & reports\n' +
      '  \u2705 Approval workflows with mobile access\n\n' +
      '\ud83c\udf10 https://make.powerapps.com\n' +
      '\ud83d\udcd6 Docs \u2192 https://learn.microsoft.com/power-apps',

      // Tip 2 \u2013 Connect to SharePoint
      '\u26a1 "Power Apps \u2665 SharePoint!"\n\n' +
      'Build custom forms and apps on top of SharePoint lists:\n\n' +
      '\ud83d\udce5 Customize list forms:\n' +
      '  \u2022 Replace default SharePoint forms with Power Apps\n' +
      '  \u2022 Add conditional logic, validation, calculations\n' +
      '  \u2022 Hide/show fields based on user or data\n' +
      '  \u2022 Integrate with other data sources (SQL, Excel, APIs)\n\n' +
      '\ud83d\udcf1 Build standalone apps:\n' +
      '  \u2022 Create mobile-friendly canvas apps from SharePoint data\n' +
      '  \u2022 Add multiple lists, galleries, charts, maps\n' +
      '  \u2022 Offline support for field workers\n' +
      '  \u2022 Embed Power Apps in SharePoint pages or Teams\n\n' +
      '\ud83d\udca1 Pro tip: Use Gallery controls to display list data,\n' +
      'and Form controls to create/edit items with custom layouts.\n\n' +
      '\ud83d\udcd6 SharePoint integration \u2192 https://learn.microsoft.com/power-apps/maker/canvas-apps/connections/connection-sharepoint-online',

      // Tip 3 \u2013 Integrate with Power Platform
      '\u26a1 "Power Apps + Power Platform = \ud83d\ude80"\n\n' +
      'Combine Power Apps with other Power Platform services:\n\n' +
      '\ud83d\udd0c Power Automate:\n' +
      '  \u2022 Trigger flows from buttons in your app\n' +
      '  \u2022 Run background processes (email, approvals, data sync)\n' +
      '  \u2022 Update app data with scheduled or event-driven flows\n\n' +
      '\ud83d\udcca Power BI:\n' +
      '  \u2022 Embed interactive reports and dashboards\n' +
      '  \u2022 Navigate to Power Apps from report visuals\n' +
      '  \u2022 Real-time analytics with live data connections\n\n' +
      '\ud83e\udd16 AI Builder:\n' +
      '  \u2022 Add AI models for object detection, text recognition\n' +
      '  \u2022 Business card reader, invoice processing\n' +
      '  \u2022 Sentiment analysis, language detection\n\n' +
      '\ud83d\udcd8 Microsoft Dataverse:\n' +
      '  \u2022 Secure, cloud-based data platform\n' +
      '  \u2022 Built-in business logic, security, relationships\n' +
      '  \u2022 Integrated with Dynamics 365 and M365\n\n' +
      '\ud83d\udcd6 Power Platform \u2192 https://learn.microsoft.com/power-platform',
      ],
  },
  {
    id: 'power_bi',
    name: 'Power BI',
    kind: 'm365egg',
    spriteKey: 'power_bi',
    title: 'Power BI Developer Hub 📊',
    bio: 'powerbi.microsoft.com/developer',
    bios: [
      // Tip 1 – API and SDK overview
      '📊 "Power BI empowers developers!"\n\n' +
      'Use the Power BI REST APIs to embed reports, manage datasets, and automate ' +
      'workspace operations.\n\n' +
      'SDKs are available for JavaScript, .NET, and Python. ' +
      'Start with the JavaScript Client: `powerbi-client` on npm.',

      // Tip 2 – Custom visuals & dev tools
      '📊 "Visualize with custom visuals!"\n\n' +
      'Build powerful custom visuals using the Power BI visuals SDK (TypeScript/React). ' +
      'Use `pbiviz` CLI to package and deploy your visual.\n\n' +
      'Debug in Power BI Desktop by enabling developer mode. ' +
      'See docs at aka.ms/pbi-custom-visuals.',

      // Tip 3 – Embedding & authentication
      '📊 "Embed reports anywhere."\n\n' +
      'There are two common patterns: user owns data (OAuth) and app owns data (service principal). ' +
      'Use `powerbicli` or REST for automation.\n\n' +
      'Embed securely in SPFx with the `@microsoft/powerbi-client-react` package. '
    ],
  },
  {
    id: 'power_pages',
    name: 'Power Pages',
    kind: 'm365egg',
    spriteKey: 'power_pages',
    title: 'Power Pages — Build low/no-code business websites',
    bio: 'https://powerpages.microsoft.com',
    bios: [
      '🧱 "Hello there! I am Power Pages — your no-code web builder."\n\n' +
      'Create secure, responsive business websites using just a browser. ' +
      'Choose from templates, drag‑and‑drop components, and connect to Dataverse.\n\n' +
      '🌐 Start building: https://powerpages.microsoft.com',

      '🛠 "Need a form or list?"\n\n' +
      'Add Dataverse forms, lists, and custom code with ease. ' +
      'Configure authentication, roles, and web APIs directly in the designer.\n\n' +
      '📘 Learn more: https://learn.microsoft.com/power-pages',

      '🔒 "Security and compliance are built in!"\n\n' +
      'Leverage Dataverse security, HTTPS, and Microsoft identity. ' +
      'Apply business rules, validation, and custom logic with Power FX.\n\n' +
      '📄 See docs: https://aka.ms/PowerPagesDocs',
    ],
  },
  {
    id: 'ms_lists',
    name: 'Microsoft Lists',
    kind: 'm365egg',
    spriteKey: 'ms_lists',
    title: '\u2713 Microsoft Lists \u2014 One app to track it all',
    bio: 'https://www.microsoft.com/en-us/microsoft-365/microsoft-lists',
    bios: [
      // Tip 1 – One app to track it all
      '✓ "One app to track it all!"\n\n' +
      'Create, share, and track lists with anyone. Start quickly with ' +
      'ready-made templates for issues, assets, events, and more.\n\n' +
      '  ✅ Track and manage lists wherever you\'re working\n' +
      '  ✅ See recent and favorite lists\n' +
      '  ✅ Easily share lists with others\n\n' +
      'Microsoft Lists works seamlessly across Microsoft 365 — ' +
      'SharePoint, Teams, or on the web.\n\n' +
      '🌐 https://www.microsoft.com/en-us/microsoft-365/microsoft-lists',

      // Tip 2 – Customize and collaborate in Teams
      '✓ "Customize and collaborate in Teams!"\n\n' +
      'Work together in real time with conversation and lists side by side. ' +
      'Add Lists as tabs to any Teams channel.\n\n' +
      '  📅 Calendar — Track deadlines and schedules\n' +
      '  📋 Grid — Classic spreadsheet-style view\n' +
      '  🎨 Gallery — Visual card layout with images\n\n' +
      'Highlight important details with conditional formatting and rules. ' +
      'Color-code rows, send notifications, and apply automated formatting.\n\n' +
      'All without writing code — point, click, and customize!\n\n' +
      '👥 https://support.microsoft.com/en-us/microsoft-lists',

      // Tip 3 – Automate with Power Platform
      '✓ "Automate with Power Platform!"\n\n' +
      'Build custom apps using lists as the data source.\n\n' +
      '🔹 Power Apps — Extend forms with custom mobile & web apps\n' +
      '⚡ Power Automate — Trigger workflows when items change\n\n' +
      'Common automation scenarios:\n' +
      '  ✅ Send notifications when tasks are assigned\n' +
      '  ✅ Request approvals for high-priority items\n' +
      '  ✅ Copy data to Excel, Dataverse, or other systems\n' +
      '  ✅ Schedule recurring reminders and reports\n\n' +
      '⚡ https://support.microsoft.com/en-us/office/automate-a-list-7a3ba7f0-55ea-4a38-80e1-b0a0279109b5',
    ],
  },
  {
    id: 'ms_teams',
    name: 'Microsoft Teams',
    kind: 'm365egg',
    spriteKey: 'ms_teams',
    title: '💬 Microsoft Teams — The hub for teamwork',
    bio: 'https://www.microsoft.com/en-us/microsoft-teams',
    bios: [
      // Tip 1 — What it is
      '💬 "Hello! I am Microsoft Teams!"\n\n' +
      'Microsoft Teams is the hub for teamwork in Microsoft 365 — ' +
      'bringing together chat, meetings, calling, and collaboration ' +
      'into one place.\n\n' +
      '🚀 What Teams offers:\n' +
      '  ✅ Chat — 1:1 and group conversations\n' +
      '  ✅ Channels — organized team discussions\n' +
      '  ✅ Meetings — video, audio, screen sharing\n' +
      '  ✅ Apps & tabs — extend Teams with custom apps\n' +
      '  ✅ Files — co-author documents in real time\n' +
      '  ✅ Copilot — AI-powered meeting recaps & chat assist\n\n' +
      'Teams is available on desktop, web, and mobile — ' +
      'stay connected wherever you are.\n\n' +
      '🌐 https://www.microsoft.com/en-us/microsoft-teams',

      // Tip 2 — Developing for Teams
      '💬 "Build apps that live where people work!"\n\n' +
      'Microsoft Teams is a powerful platform for developers. ' +
      'Build custom apps that integrate directly into the Teams experience.\n\n' +
      '🛠 What you can build:\n' +
      '  ✅ Tabs — embed web apps in channels or chats\n' +
      '  ✅ Bots — conversational AI assistants\n' +
      '  ✅ Message extensions — search & share from compose box\n' +
      '  ✅ Webhooks & connectors — push notifications\n' +
      '  ✅ Meeting extensions — enhance meeting experiences\n' +
      '  ✅ Copilot plugins — extend Microsoft Copilot\n\n' +
      'Use Teams Toolkit for VS Code to scaffold, debug and deploy.\n\n' +
      '📖 Dev docs → https://learn.microsoft.com/microsoftteams/platform',

      // Tip 3 — Teams + SharePoint
      '💬 "Teams and SharePoint — better together!"\n\n' +
      'Every Teams team is backed by a SharePoint site. ' +
      'Files shared in channels live in SharePoint document libraries.\n\n' +
      '🔗 Integration points:\n' +
      '  ✅ Channel files tab → SharePoint document library\n' +
      '  ✅ SharePoint pages as Teams tabs\n' +
      '  ✅ SPFx web parts in Teams tabs & personal apps\n' +
      '  ✅ Viva Connections dashboard (ACEs) in Teams\n' +
      '  ✅ Microsoft Lists as Teams tabs\n' +
      '  ✅ Power Automate flows triggered from Teams\n\n' +
      'SPFx solutions can target Teams with zero extra code — ' +
      'just set "supportedHosts" to include "TeamsTab".\n\n' +
      '📖 Teams + SPFx → https://learn.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview',
    ],
  },
  {
    id: 'ms_copilot',
    name: 'Microsoft Copilot',
    kind: 'm365egg',
    spriteKey: 'ms_copilot',
    title: '✨ Microsoft Copilot — Your everyday AI companion',
    bio: 'https://copilot.microsoft.com',
    bios: [
      // Tip 1 — What it is
      '✨ "Hello! I am Microsoft Copilot!"\n\n' +
      'Microsoft Copilot is your AI-powered assistant built into ' +
      'the Microsoft 365 apps you use every day — Word, Excel, ' +
      'PowerPoint, Outlook, Teams, and more.\n\n' +
      '🚀 What Copilot can do:\n' +
      '  ✅ Draft documents, emails, and presentations\n' +
      '  ✅ Summarize long emails and meeting transcripts\n' +
      '  ✅ Analyze data in Excel with natural language\n' +
      '  ✅ Generate meeting recaps in Teams\n' +
      '  ✅ Answer questions using your organization\'s data\n' +
      '  ✅ Create images, code, and content from prompts\n\n' +
      'Copilot combines large language models with your Microsoft 365 ' +
      'data via Microsoft Graph — grounded, secure, and compliant.\n\n' +
      '🌐 https://copilot.microsoft.com',

      // Tip 2 — Extending Copilot
      '✨ "Extend Copilot with plugins and connectors!"\n\n' +
      'Developers can build Copilot extensions that bring your ' +
      'app\'s data and actions directly into the Copilot experience.\n\n' +
      '🛠 Extension types:\n' +
      '  ✅ Message extensions — search & share from Copilot\n' +
      '  ✅ Copilot connectors — bring external data in\n' +
      '  ✅ Declarative agents — custom Copilot personas\n' +
      '  ✅ API plugins — call REST APIs from Copilot\n' +
      '  ✅ Teams AI library — build conversational AI apps\n\n' +
      'Use Teams Toolkit in VS Code to scaffold, test, and deploy ' +
      'Copilot extensions with a great local debug experience.\n\n' +
      '📖 Dev docs → https://learn.microsoft.com/microsoft-365-copilot/extensibility',

      // Tip 3 — Copilot in SharePoint & SPFx
      '✨ "Copilot meets SharePoint!"\n\n' +
      'Copilot understands your SharePoint content — sites, pages, ' +
      'documents, and lists are all part of Microsoft Graph.\n\n' +
      '🔗 SharePoint + Copilot:\n' +
      '  ✅ Ask Copilot questions about content stored in SPO\n' +
      '  ✅ Copilot for SharePoint — AI-generated page drafts\n' +
      '  ✅ Restricted SharePoint Search for scoped answers\n' +
      '  ✅ Declarative agents grounded in SPO site content\n' +
      '  ✅ SPFx Adaptive Card Extensions in Viva Connections\n\n' +
      'Good content management in SharePoint = better Copilot answers. ' +
      'Keep your sites organized, metadata rich, and permissions clean.\n\n' +
      '📖 Copilot + SPO → https://learn.microsoft.com/sharepoint/sharepoint-copilot-best-practices',
    ],
  },
];
