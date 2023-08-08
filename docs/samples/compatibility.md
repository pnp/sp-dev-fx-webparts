---
title: Samples by compatibility
template: filter.html
filteroptions:
    - name: all
      title: 	All versions
      displayname: All
      filter: '*'
      active: true    
    - name: SPSubscription
      title: v1.5 or lower
      filter: '[data-subscription=''true'']'
      displayname: Subscription Edition
    - name: 2019
      title: v1.4.1 or lower
      filter: '[data-sp2019=''true'']'
      displayname: SharePoint Server 2019
    - name: 2016
      title: v1.1, web parts only
      filter: '[data-sp2016=''true'']'
      displayname: SharePoint 2016 Feature Pack 2
    - name: teams
      title: Teams
      filter: '[data-teams=''true'']'
    - name: outlook
      title: Outlook
      filter: '[data-outlook=''true'']'
---

All samples are compatible with SharePoint Online. If you wish to find samples that were specifically designed for SharePoint Server Subscription Edition,SharePoint Server 2019, SharePoint 2016 Feature Pack 2, Microsoft Teams, or Microsoft Outlook, use the filters below.

To learn more about SPFx compatibility, visit the [SharePoint Framework development tools and libraries compatibility](https://learn.microsoft.com/sharepoint/dev/spfx/compatibility) on Microsoft Documentation.

To learn more about how to use these samples, please refer to our [getting started](../gettingstarted/index.md) section.
