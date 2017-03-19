Active Directory Authentication Library (ADAL) for JavaScript
====================================
[![Build Status](https://travis-ci.org/AzureAD/azure-activedirectory-library-for-js.svg?branch=master)](https://travis-ci.org/AzureAD/azure-activedirectory-library-for-js)

Active Directory Authentication Library for JavaScript (ADAL JS) helps you to use Azure AD for handling authentication in your single page applications.
This library is optimized for working together with AngularJS.

## Versions
Current version - 1.0.14  
Minimum recommended version - 1.0.11  
You can find the changes for each version in the [change log](https://github.com/AzureAD/azure-activedirectory-library-for-js/blob/master/changelog.txt).

## Samples and Documentation

[We provide a full suite of sample applications and documentation on GitHub](https://github.com/azure-samples?query=active-directory) to help you get started with learning the Azure Identity system. This includes tutorials for native clients such as Windows, Windows Phone, iOS, OSX, Android, and Linux. We also provide full walkthroughs for authentication flows such as OAuth2, OpenID Connect, Graph API, and other awesome features. 

## Community Help and Support

We leverage [Stack Overflow](http://stackoverflow.com/) to work with the community on supporting Azure Active Directory and its SDKs, including this one! We highly recommend you ask your questions on Stack Overflow (we're all on there!) Also browser existing issues to see if someone has had your question before. 

We recommend you use the "adal" tag so we can see it! Here is the latest Q&A on Stack Overflow for ADAL: [http://stackoverflow.com/questions/tagged/adal](http://stackoverflow.com/questions/tagged/adal)

## Security Reporting

If you find a security issue with our libraries or services please report it to [secure@microsoft.com](mailto:secure@microsoft.com) with as much detail as possible. Your submission may be eligible for a bounty through the [Microsoft Bounty](http://aka.ms/bugbounty) program. Please do not post security issues to GitHub Issues or any other public site. We will contact you shortly upon receiving the information. We encourage you to get notifications of when security incidents occur by visiting [this page](https://technet.microsoft.com/en-us/security/dd252948) and subscribing to Security Advisory Alerts.

## The Library

This is a GA released version. The current version is **1.0.14**.

You have multiple ways of getting ADAL JS:

Via NPM:

    npm install adal-angular

Via CDN:

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://secure.aadcdn.microsoftonline-p.com/lib/1.0.14/js/adal.min.js"></script>
    <script src="https://secure.aadcdn.microsoftonline-p.com/lib/1.0.14/js/adal-angular.min.js"></script>

CDN will be updated to latest version 1.0.14.

Via Bower:

    $ bower install adal-angular

The adal.js source is [here](https://github.com/AzureAD/azure-activedirectory-library-for-js/tree/master/lib/adal.js).
The adal-angular.js source is [here](https://github.com/AzureAD/azure-activedirectory-library-for-js/tree/master/lib/adal-angular.js).
## Samples, tests and documentation

For a sample demonstrating basic usage of ADAL JS please refer to [this repo](https://github.com/AzureADSamples/SinglePageApp-DotNet).

CORS API [sample ](https://github.com/AzureADSamples/SinglePageApp-WebAPI-AngularJS-DotNet).

**To run tests**

    npm install
    bower install
    npm test
    // angular tests
    karma start

Karma as test runner:
You need to install the karma command line.

    npm install -g karma
    npm install -g karma-cli

**Logging**

Log levels are mapped as:

    0: Error
    1: Warning
    2: Info
    3: Verbose

You can add the code below to app.js to turn on logging. Implement the `log` method depending on how you want to redirect logs.

    Logging = {
        level: 3,
        log: function (message) {
            console.log(message);
        }
    };
    
**documentation generation**
Install grunt; call

    grunt doc



**Quick usage guide**

Below you can find a quick reference for the most common operations you need to perform to use adal js.

1- Include references to angular.js libraries, adal.js, adal-angular.js in your main app page.

2- include a reference to adal module
```js
var app = angular.module('demoApp', ['ngRoute', 'AdalAngular']);
```
3- ***When HTML5 mode is configured***, ensure the $locationProvider hashPrefix is set
```js
	// using '!' as the hashPrefix but can be a character of your choosing
	app.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
	}]);
```

Without the hashPrefix set, the AAD login will loop indefinitely as the callback URL from AAD (in the form of, {yourBaseUrl}/#{AADTokenAndState}) will be rewritten to remove the '#' causing the token parsing to fail and login sequence to occur again.

4- Initialize adal with the AAD app coordinates at app config time
```js
// endpoint to resource mapping(optional)
    var endpoints = {
        "https://yourhost/api": "b6a68585-5287-45b2-ba82-383ba1f60932",
    };
adalAuthenticationServiceProvider.init(
        {
            // Config to specify endpoints and similar for your app
            tenant: "52d4b072-9470-49fb-8721-bc3a1c9912a1", // Optional by default, it sends common
            clientId: "e9a5a8b6-8af7-4719-9821-0deef255f68e", // Required
            //localLoginUrl: "/login",  // optional
            //redirectUri : "your site", optional
            endpoints: endpoints  // If you need to send CORS api requests.
        },
        $httpProvider   // pass http provider to inject request interceptor to attach tokens
        );
```
5- Define which routes you want to secure via adal - by adding `requireADLogin: true` to their definition
```js
$routeProvider.
    when("/todoList", {
        controller: "todoListController",
        templateUrl: "/App/Views/todoList.html",
        requireADLogin: true
    });

```
6- Any service invocation code you might have will remain unchanged. Adal's interceptor will automatically add tokens for every outgoing call.

***Optional***
7- If you so choose, in addition (or substitution) to route level protection you can add explicit login/logout UX elements. Furthermore, you can access properties of the currently signed in user directly form JavaScript (via userInfo and userInfo.profile):
```html
<!DOCTYPE html>
<html>
<head>
    <title>Angular Adal Sample</title>
</head>
<body ng-app="adalDemo" ng-controller="homeController" ng-init="hmCtl.init()">
    <a href="#">Home</a>
    <a href="#/todoList">ToDo List</a>


    <!--These links are added to manage login/logout-->
    <div data-ng-model="userInfo">
        <span data-ng-hide="!userInfo.isAuthenticated">Welcome {{userInfo.userName}} </span>
        <button data-ng-hide="!userInfo.isAuthenticated" data-ng-click="logout()">Logout</button>
        <button data-ng-hide="userInfo.isAuthenticated" data-ng-click="login()">Login</button>

        <div>
            {{userInfo.loginError}}
        </div>
        <div>
            {{testMessage}}
        </div>
    </div>
    <div ng-view>
        Your view will appear here.
    </div>

    <script src="/Scripts/angular.min.js"></script>
    <script src="/Scripts/angular-route.min.js"></script>
    <script src="/Scripts/adal.js"></script>
    <script src="/Scripts/adal-angular.js"></script>
    <script src="App/Scripts/app.js"></script>
    <script src="App/Scripts/homeController.js"></script>
    <script src="App/Scripts/todoDetailController.js"></script>
    <script src="App/Scripts/todoListController.js"></script>
    <script src="App/Scripts/todoService.js"></script>
</body>
</html>
```
7- You have full control on how to trigger sign in, sign out and how to deal with errors:

```js
'use strict';
app.controller('homeController', ['$scope', '$location', 'adalAuthenticationService', function ($scope, $location, adalAuthenticationService) {
    // this is referencing adal module to do login

    //userInfo is defined at the $rootscope with adalAngular module
    $scope.testMessage = "";
    $scope.init = function () {
        $scope.testMessage = "";
    };

    $scope.logout = function () {
        adalAuthenticationService.logOut();
    };

    $scope.login = function () {
        adalAuthenticationService.login();
    };

    // optional
    $scope.$on("adal:loginSuccess", function () {
        $scope.testMessage = "loginSuccess";
    });

    // optional
    $scope.$on("adal:loginFailure", function () {
        $scope.testMessage = "loginFailure";
        $location.path("/login");
    });

    // optional
    $scope.$on("adal:notAuthorized", function (event, rejection, forResource) {
        $scope.testMessage = "It is not Authorized for resource:" + forResource;
    });

}]);


```

### Multi-Tenant

By default, you have multi-tenant support. Adal will set tenant to 'common', if it is not specified in the config.

### Cache Location
Default storage location is sessionStorage. You can specify localStorage in the config as well.

```js
adalAuthenticationServiceProvider.init(
        {
            // Config to specify endpoints and similar for your app
            clientId: 'cb68f72f...',
            cacheLocation: 'localStorage' // optional cache location default is sessionStorage
        },
        $httpProvider   // pass http provider to inject request interceptor to attach tokens
        );
```

### Security
Tokens are accessible from javascript since Adal.JS is using HTML5 storage. Default storage option is sessionStorage, which keeps the tokens per session. You should ask user to login again for important operations on your app.
You should protect your site for XSS. Please check the article here: https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet


### CORS API usage and IE
Adal will get access token for given CORS API endpoints in the config. Access token is requested using Iframe. Iframe needs to access the cookies for the same domain that you did the initial sign in. IE does not allow to access cookies in IFrame for localhost. Your url needs to be fully qualified domain i.e http://yoursite.azurewebsites.com. Chrome does not have this restriction.

To make CORS API call, you need to specify endpoints in the config for your CORS API. Your service will be similar to this to make the call from JS. In your api project, you need to enable CORS api requests to receive flight requests. You can check the sample for that  CORS API [sample ](https://github.com/AzureADSamples/SinglePageApp-WebAPI-AngularJS-DotNet).

```js
'use strict';
app.factory('contactService', ['$http', function ($http) {
    var serviceFactory = {};

    var _getItems = function () {
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];
        return $http.get('http://adaljscors.azurewebsites.net/api/contacts');
    };

    serviceFactory.getItems = _getItems;

    return serviceFactory;
}]);
```

You can read extended blogs for CORS API related to learn about Office365 usage.
Andrew's related to Cors and office365 usage
http://www.andrewconnell.com/blog/adal-js-cors-with-o365-apis-files-sharepoint
Vittorio's blog
http://www.cloudidentity.com/blog/2015/02/19/introducing-adal-js-v1/
http://www.cloudidentity.com/blog/2014/10/28/adal-javascript-and-angularjs-deep-dive/

### Trusted Site settings in IE
If you put your site in the trusted site list, cookies are not accessible for iFrame requests. You need to remove protected mode for Internet zone or add the authority url for the login to the trusted sites as well.

## We Value and Adhere to the Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
