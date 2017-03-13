(function () {
  'use strict';

  var yammerApp = angular.module('yammerApp', []);
 
   yammerApp.controller('homeController', ['$rootScope', '$scope', '$http', '$location', '$window', homeController]);

  function homeController($rootScope, $scope, $http, $location, $window) { 

        $scope.yamfeedid = 'yamfeed' + generateGuid(); 

        function generateGuid() {

            var d = new Date().getTime();
            var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
            });

            return uuid;
        }; 
    
        $rootScope.$on('configurationChanged', function(event, args) {            

            $scope.network = args.network;
            $scope.feedType = args.feedType;
            $scope.defaultGroupId = args.defaultGroupId;
            $scope.showOpenGraphPreview = args.showOpenGraphPreview;
            $scope.promptText = args.promptText;
            $scope.header = args.header;
            $scope.footer = args.footer;
            $scope.environment = args.environment;
            $scope.environmentType = args.environmentType;

            var currentfeedcontainer = args.domElement.querySelector("#"+$scope.yamfeedid);
            var feedparentNode = currentfeedcontainer.parentElement;

            if(currentfeedcontainer)
            {
                currentfeedcontainer.remove(); 
                feedparentNode.innerHTML += '<div id="'+$scope.yamfeedid+'" style="height:400px;width:100%"></div>';
            }            
            
            $scope.loadFeeds();
        }); 

        $scope.loadFeeds = function () {                       

            var feedOptions = {
                container: '#'+$scope.yamfeedid,
                network: $scope.network,
                feedType: $scope.feedtype,
                config: {
                    defaultGroupId: $scope.defaultgroupid,
                    showOpenGraphPreview: $scope.showopengraphpreview,
                    promptText: $scope.prompttext,
                    header: $scope.header, 
                    footer: $scope.footer
                }
            }; 

            yam.connect.embedFeed(feedOptions);
        }         
    }    

})();

!function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="https://s0.assets-yammer.com/assets/",b(0)}([function(a,b,c){c(1),c(2),a.exports=c(3)},function(a,b){"use strict";window.yam=window.yam||{config:function a(b){return Object.keys(b||{}).forEach(function(a){yam._configData[a]=b[a]}),yam._configData},_configData:{}}},function(a,b){"use strict";var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};!function(){function a(a){window.console&&"function"==typeof console.log&&console.log("[yammer] "+a)}function b(a,b,c){a.addEventListener?a.addEventListener(b,c):a.attachEvent("on"+b,function(b){c.call(a,b)})}function d(a){function b(a,e){Object.keys(a||{}).forEach(function(f){if(Object.prototype.hasOwnProperty.call(a,f)){var g=""===e?f:e+"["+f+"]";"object"===c(a[f])?b(a[f],g):d[g]=a[f]}})}var d={};b(a,"");var e=[];return Object.keys(d||{}).forEach(function(a){Object.prototype.hasOwnProperty.call(d,a)&&e.push(encodeURIComponent(a)+"="+encodeURIComponent(d[a]))}),e.join("&")}function e(a){a=a||{};var b=a.style||j,c=document.createElement("iframe");return c.id=a.id,c.name=a.name||a.id,c.frameBorder="none",c.scrolling="no",Object.keys(b||{}).forEach(function(a){Object.prototype.hasOwnProperty.call(b,a)&&(c.style[a]=b[a])}),c.src="javascript://",c}function f(a){var b=a.objectProperties||{};b.url||(b.url=document.location.href,a.objectProperties=b)}function g(b){var c=b||document.body;return"string"==typeof c&&(c=document.querySelector(c)),c?c:void a("Could not find container to embed in")}function h(a){a=a||{};var c=Date.now().toString(),h=g(a.container);if(h){a.feedType&&"open-graph"===a.feedType&&f(a);var i=e({id:"embed-feed"});i.className="yj-embed-widget yj-embed-feed",h.appendChild(i),b(window,"message",function(a){if(a.origin===yam.config().baseURI){var b=JSON.parse(a.data),d=b.data;d&&"yam.trigger"===d.method&&d.uniqueToken===c&&yam.trigger(d.eventId,d.msg)}}),a.network&&(a.network_permalink=a.network),a.bust=c;var j=d(a),k=yam.config().baseURI+"/embed-feed?"+j;i.src=k}}function i(a){a=a||{};var c=Date.now().toString(),h=g(a.container);if(h){f(a);var i=e({id:"embed-button"+k++});i.style.width=h.clientWidth+"px",i.style.height=h.clientHeight+"px",i.className="yj-embed-widget yj-embed-button",h.appendChild(i),b(window,"message",function(a){if(a.origin===yam.config().baseURI){var b=JSON.parse(a.data),d=b.data;d&&d.uniqueToken===c&&("yam.resize"===d.method?(i.style.width=d.width+"px",i.style.height=d.height+"px"):"yam.trigger"===d.method&&yam.trigger(d.eventId,d.msg))}}),a.bust=c;var j=d(a);i.src=yam.config().baseURI+"/platform_embed/button?"+j}}var j={border:"0px",overflow:"hidden","min-height":"26px",width:"100%",height:"100%"},k=0;if("function"!=typeof yam.on){var l={},m=function a(b,c){var d=l[b];if(d)for(var e=0,f=d.length;e<f;e++){var g=d[e];g.fn.apply(g.ctx,c)}};yam.trigger=function(a){var b=[].slice.call(arguments,1);m(a,b),m("all",arguments)},yam.on=function(a,b,c){l[a]||(l[a]=[]),l[a].push({fn:b,ctx:c||null})},yam.off=function(a,b,c){var d=l[a];if(c=c||null,d){for(var e=-1,f=0,g=d.length;f<g&&e===-1;f++)d[f].fn===b&&d[f].ctx===c&&(e=f);e!==-1&&d.splice(e,1)}}}yam.connect=yam.connect||{},yam.connect.actionButton=i,yam.connect.embedFeed=h}()},function(a,b,c){var d;d=function(a){var b=c(4);yam.config(b)}.call(b,c,b,a),!(void 0!==d&&(a.exports=d))},function(a,b){a.exports={assetHost:"https://s0.assets-yammer.com",cdnAssetHost:"https://s0.assets-yammer.com",mugshotHost:"https://www.yammer.com/mugshot",cdnMugshotHost:"https://mug0.assets-yammer.com/mugshot",polarisHost:"https://polaris.yammer.com/",baseURI:"https://www.yammer.com",apiBaseURI:"https://api.yammer.com",videoStreamingUri:"rtmpt://s1fqyiixzut1oy.cloudfront.net:80/cfx/st",reportAuthorizationHeader:"Receiver MTosLDIzQTBEMTA1LTM4RUItNDcyMS05RTM2LTQxNEY5QUI1RTQ3MyA=",reportPerfRequestUri:"https://receiver.yamalytics.yammer.com/prod/web_ui",filesHost:"https://files.yammer.com/v2/files",paddieHost:"https://pad0.assets-yammer.com",msgraphUri:"https://msgraph.yammer.com",yammer_environment:"production"}}]);