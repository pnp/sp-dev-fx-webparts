// JScript File


Type.registerNamespace('Microsoft.SharePoint.Client.Search.Analytics');

Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemData = function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData(context, objectPath) {
    Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemData.initializeBase(this, [ context, objectPath ]);
}
Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemData.prototype = {
    
    get_lastProcessingTime: function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData$get_lastProcessingTime() {
        this.checkUninitializedProperty('LastProcessingTime');
        return ((this.get_objectData().get_properties()['LastProcessingTime']));
    },
    
    get_totalHits: function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData$get_totalHits() {
        this.checkUninitializedProperty('TotalHits');
        return ((this.get_objectData().get_properties()['TotalHits']));
    },
    
    get_totalUniqueUsers: function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData$get_totalUniqueUsers() {
        this.checkUninitializedProperty('TotalUniqueUsers');
        return ((this.get_objectData().get_properties()['TotalUniqueUsers']));
    },
    
    initPropertiesFromJson: function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData$initPropertiesFromJson(parentNode) {
        SP.ClientObject.prototype.initPropertiesFromJson.call(this, parentNode);
        var $v_0;
        $v_0 = parentNode.LastProcessingTime;
        if (!SP.ScriptUtility.isUndefined($v_0)) {
            this.get_objectData().get_properties()['LastProcessingTime'] = ($v_0);
            delete parentNode.LastProcessingTime;
        }
        $v_0 = parentNode.TotalHits;
        if (!SP.ScriptUtility.isUndefined($v_0)) {
            this.get_objectData().get_properties()['TotalHits'] = ($v_0);
            delete parentNode.TotalHits;
        }
        $v_0 = parentNode.TotalUniqueUsers;
        if (!SP.ScriptUtility.isUndefined($v_0)) {
            this.get_objectData().get_properties()['TotalUniqueUsers'] = ($v_0);
            delete parentNode.TotalUniqueUsers;
        }
    },
    
    getHitCountForDay: function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData$getHitCountForDay(day) {
        var $v_0 = this.get_context();
        var $v_1;
        var $v_2 = new SP.ClientActionInvokeMethod(this, 'GetHitCountForDay', [ day ]);
        $v_0.addQuery($v_2);
        $v_1 = new SP.IntResult();
        $v_0.addQueryIdAndResultObject($v_2.get_id(), $v_1);
        return $v_1;
    },
    
    getUniqueUsersCountForDay: function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData$getUniqueUsersCountForDay(day) {
        var $v_0 = this.get_context();
        var $v_1;
        var $v_2 = new SP.ClientActionInvokeMethod(this, 'GetUniqueUsersCountForDay', [ day ]);
        $v_0.addQuery($v_2);
        $v_1 = new SP.IntResult();
        $v_0.addQueryIdAndResultObject($v_2.get_id(), $v_1);
        return $v_1;
    },
    
    getHitCountForMonth: function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData$getHitCountForMonth(month) {
        var $v_0 = this.get_context();
        var $v_1;
        var $v_2 = new SP.ClientActionInvokeMethod(this, 'GetHitCountForMonth', [ month ]);
        $v_0.addQuery($v_2);
        $v_1 = new SP.IntResult();
        $v_0.addQueryIdAndResultObject($v_2.get_id(), $v_1);
        return $v_1;
    },
    
    getUniqueUsersCountForMonth: function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemData$getUniqueUsersCountForMonth(month) {
        var $v_0 = this.get_context();
        var $v_1;
        var $v_2 = new SP.ClientActionInvokeMethod(this, 'GetUniqueUsersCountForMonth', [ month ]);
        $v_0.addQuery($v_2);
        $v_1 = new SP.IntResult();
        $v_0.addQueryIdAndResultObject($v_2.get_id(), $v_1);
        return $v_1;
    }
}


Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemDataPropertyNames = function Microsoft_SharePoint_Client_Search_Analytics_AnalyticsItemDataPropertyNames() {
}


Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics = function Microsoft_SharePoint_Client_Search_Analytics_UsageAnalytics(context, site) {
    Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics.initializeBase(this, [ context, SP.ClientUtility.getOrCreateObjectPathForConstructor(context, '{1b61778a-cec2-49bf-b9cc-1264b133307f}', arguments) ]);
}
Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics.newObject = function Microsoft_SharePoint_Client_Search_Analytics_UsageAnalytics$newObject(context, site) {
    return new Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics(context, new SP.ObjectPathConstructor(context, '{1b61778a-cec2-49bf-b9cc-1264b133307f}', [ site ]));
}
Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics.prototype = {
    
    getAnalyticsItemData: function Microsoft_SharePoint_Client_Search_Analytics_UsageAnalytics$getAnalyticsItemData(eventType, listItem) {
        var $v_0 = this.get_context();
        var $v_1;
        $v_1 = new Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemData($v_0, new SP.ObjectPathMethod($v_0, this.get_path(), 'GetAnalyticsItemData', [ eventType, listItem ]));
        return $v_1;
    },
    
    getAnalyticsItemDataForApplicationEventType: function Microsoft_SharePoint_Client_Search_Analytics_UsageAnalytics$getAnalyticsItemDataForApplicationEventType(appEventType, listItem) {
        var $v_0 = this.get_context();
        var $v_1;
        $v_1 = new Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemData($v_0, new SP.ObjectPathMethod($v_0, this.get_path(), 'GetAnalyticsItemDataForApplicationEventType', [ appEventType, listItem ]));
        return $v_1;
    },
    
    deleteStandardEventUsageData: function Microsoft_SharePoint_Client_Search_Analytics_UsageAnalytics$deleteStandardEventUsageData(eventType) {
        var $v_0 = this.get_context();
        var $v_1 = new SP.ClientActionInvokeMethod(this, 'DeleteStandardEventUsageData', [ eventType ]);
        $v_0.addQuery($v_1);
    },
    
    deleteCustomEventUsageData: function Microsoft_SharePoint_Client_Search_Analytics_UsageAnalytics$deleteCustomEventUsageData(appEventTypeId) {
        var $v_0 = this.get_context();
        var $v_1 = new SP.ClientActionInvokeMethod(this, 'DeleteCustomEventUsageData', [ appEventTypeId ]);
        $v_0.addQuery($v_1);
    }
}


Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemData.registerClass('Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemData', SP.ClientObject);
Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemDataPropertyNames.registerClass('Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemDataPropertyNames');
Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics.registerClass('Microsoft.SharePoint.Client.Search.Analytics.UsageAnalytics', SP.ClientObject);
Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemDataPropertyNames.lastProcessingTime = 'LastProcessingTime';
Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemDataPropertyNames.totalHits = 'TotalHits';
Microsoft.SharePoint.Client.Search.Analytics.AnalyticsItemDataPropertyNames.totalUniqueUsers = 'TotalUniqueUsers';

if( typeof(Sys) != "undefined" && Sys && Sys.Application ){
   Sys.Application.notifyScriptLoaded();
}
NotifyScriptLoadedAndExecuteWaitingJobs("sp.search.apps.js");
