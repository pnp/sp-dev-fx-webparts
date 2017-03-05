# SPFx Modern Calendar
## Summary
This is a modern webpart built on the GA version of the [SharePoint Framework](https://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview).  The ready to deploy SharePoint Add-in package is available under the sharepoint/solution folder.

[FullCalendar](https://github.com/fullcalendar/fullcalendar)
[Moment](https://github.com/moment/moment)
[jQuery](https://github.com/jquery/jquery)

### Minimal Path to Awesome

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN. Currently configured for PC Pro. SharePoint Public CDN

### Features
Renders a calendar from any list available on the selected site.  Site, List, Start, End, Event Title,Event Details and Calendar Theme are user-definable in the web part properties.


![SS1](https://cloud.githubusercontent.com/assets/13068139/23584809/14c4333e-0121-11e7-9bf1-3117651222d3.png)
![SS2](https://cloud.githubusercontent.com/assets/13068139/23584808/14c3ec26-0121-11e7-8be8-65fbcca32b62.png)
![SS3](https://cloud.githubusercontent.com/assets/13068139/23584807/14b88f34-0121-11e7-8c91-56ecff9343e1.png)
### [PC Professional, Inc.](http://pcprofessional.com)