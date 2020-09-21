(window["webpackJsonp_1cea229f_b208_4202_8014_22503d92a019_0_1_0"] = window["webpackJsonp_1cea229f_b208_4202_8014_22503d92a019_0_1_0"] || []).push([["sp-queryablemanagedproperties"],{

/***/ "n9CK":
/*!********************************************************************************!*\
  !*** ./lib/dataProviders/search/managedProperty/QueryableManagedProperties.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file QueryableManagedProperties.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
// To be kept in sync with OOTBSchemaOSS.cs.
var QueryableManagedProperties = /** @class */ (function () {
    function QueryableManagedProperties() {
    }
    QueryableManagedProperties.getProperties = function () {
        if (!QueryableManagedProperties._properties) {
            QueryableManagedProperties._properties = {
                'AADObjectId': 1 /* Text */,
                'AboutMe': 1 /* Text */,
                'Account': 1 /* Text */,
                'AccountName': 1 /* Text */,
                'AnalyticsPath': 1 /* Text */,
                'AnchorTextComplete': 1 /* Text */,
                'AssignedTo': 1 /* Text */,
                'AttachmentType': 1 /* Text */,
                'Author': 1 /* Text */,
                'AuthorOWSUser': 1 /* Text */,
                'BaseOfficeLocation': 1 /* Text */,
                'CategoryNavigationUrl': 1 /* Text */,
                'Charset': 1 /* Text */,
                'ClassificationConfidence': 2 /* Integer */,
                'ClassificationCount': 2 /* Integer */,
                'ClassificationLastScan': 4 /* DateTime */,
                'ClassificationType': 1 /* Text */,
                'ClientUrl': 1 /* Text */,
                'Colleagues': 1 /* Text */,
                'CombinedUserProfileNames': 1 /* Text */,
                'Companies': 1 /* Text */,
                'ComplianceTag': 1 /* Text */,
                'ComplianceTagWrittenTime': 4 /* DateTime */,
                'ContentClass': 1 /* Text */,
                'ContentDatabaseId': 1 /* Text */,
                'ContentModifiedTime': 4 /* DateTime */,
                'ContentsHidden': 1 /* Text */,
                'ContentSource': 1 /* Text */,
                'ContentType': 1 /* Text */,
                'ContentTypeId': 1 /* Text */,
                'Created': 4 /* DateTime */,
                'CreatedBy': 1 /* Text */,
                'CreatedById': 1 /* Text */,
                'CreatedOWSDate': 1 /* Text */,
                'DeepLinks': 1 /* Text */,
                'DefAggre': 1 /* Text */,
                'Department': 1 /* Text */,
                'Description': 1 /* Text */,
                'DetectedLanguage': 1 /* Text */,
                'DiscoveredTime': 4 /* DateTime */,
                'DisplayAuthor': 1 /* Text */,
                'DisplayDate': 4 /* DateTime */,
                'DlcDocId': 1 /* Text */,
                'DMSDocAccessRight': 1 /* Text */,
                'DMSDocAuthor': 1 /* Text */,
                'DMSDocTitle': 1 /* Text */,
                'DocACL': 1 /* Text */,
                'DocComments': 1 /* Text */,
                'DocId': 1 /* Text */,
                'DocKeywords': 1 /* Text */,
                'DocSignature': 1 /* Text */,
                'DocSubject': 1 /* Text */,
                'DocumentSignature': 2 /* Integer */,
                'Domain': 1 /* Text */,
                'DuplicateHash': 1 /* Text */,
                'EditorOWSUser': 1 /* Text */,
                'EduAssignmentCategory': 1 /* Text */,
                'EduAssignmentFormat': 1 /* Text */,
                'EduMaximumScore': 1 /* Text */,
                'EndDate': 4 /* DateTime */,
                'EntityName': 1 /* Text */,
                'EntityNamespace': 1 /* Text */,
                'ExpirationTime': 4 /* DateTime */,
                'ExpiresOWSDate': 1 /* Text */,
                'ExtractedAuthor': 1 /* Text */,
                'ExtractedDate': 4 /* DateTime */,
                'FileExtension': 1 /* Text */,
                'Filename': 1 /* Text */,
                'FileType': 1 /* Text */,
                'FirstLevelColleagues': 1 /* Text */,
                'FirstLevelMutualFollowings': 1 /* Text */,
                'FirstName': 1 /* Text */,
                'FollowAllAnchor': 1 /* Text */,
                'FollowRecommendedFor': 1 /* Text */,
                'GeneratedTitle': 1 /* Text */,
                'Genre': 1 /* Text */,
                'HashTags': 1 /* Text */,
                'HideFromDelve': 5 /* YesNo */,
                'HierarchyUrl': 1 /* Text */,
                'HitHighlightedProperties': 1 /* Text */,
                'HitHighlightedSummary': 1 /* Text */,
                'HostingPartition': 1 /* Text */,
                'HtmlFileType': 1 /* Text */,
                'HWBoost': 2 /* Integer */,
                'ImageDateCreated': 4 /* DateTime */,
                'Importance': 2 /* Integer */,
                'IndexDocId': 2 /* Integer */,
                'Interests': 1 /* Text */,
                'IRMProtected': 5 /* YesNo */,
                'IRMTemplateName': 1 /* Text */,
                'IsClassificationProcessingLimitExceeded': 5 /* YesNo */,
                'IsContainer': 5 /* YesNo */,
                'IsData': 5 /* YesNo */,
                'IsDocument': 5 /* YesNo */,
                'IsExternalContent': 5 /* YesNo */,
                'IsInRecycleBin': 5 /* YesNo */,
                'IsMyDocuments': 5 /* YesNo */,
                'IsOneNotePage': 5 /* YesNo */,
                'IsPartiallyProcessed': 5 /* YesNo */,
                'IsPublishingCatalog': 5 /* YesNo */,
                'IsReport': 5 /* YesNo */,
                'ItemCategory': 1 /* Text */,
                'JobTitle': 1 /* Text */,
                'Keywords': 1 /* Text */,
                'language': 1 /* Text */,
                'Languages': 1 /* Text */,
                'LastModifiedTime': 4 /* DateTime */,
                'LastName': 1 /* Text */,
                'LastSharedByUser': 1 /* Text */,
                'LinkingUrl': 1 /* Text */,
                'ListID': 1 /* Text */,
                'ListItemId': 1 /* Text */,
                'ListUrl': 1 /* Text */,
                'Location': 1 /* Text */,
                'MediaDuration': 2 /* Integer */,
                'Memberships': 1 /* Text */,
                'MetadataAuthor': 1 /* Text */,
                'MicroBlogType': 2 /* Integer */,
                'MobilePhone': 1 /* Text */,
                'ModifiedBy': 1 /* Text */,
                'ModifiedById': 1 /* Text */,
                'ModifiedOWSDate': 1 /* Text */,
                'NLCodePage': 2 /* Integer */,
                'Notes': 1 /* Text */,
                'OfficeGraphEnabled': 5 /* YesNo */,
                'OfficeNumber': 1 /* Text */,
                'OrgNames': 1 /* Text */,
                'OrgParentNames': 1 /* Text */,
                'OrgParentURLs': 1 /* Text */,
                'OrgURLs': 1 /* Text */,
                'OWS_URL': 1 /* Text */,
                'OWSMetadataFacetInfo': 1 /* Text */,
                'OWSTaxIdMetadataAllTagsInfo': 1 /* Text */,
                'OWSTaxIdProductCatalogItemCategory': 1 /* Text */,
                'OWSTaxIdVideoPortalItemCategory': 1 /* Text */,
                'PageAppId': 1 /* Text */,
                'PageId': 1 /* Text */,
                'PageTags': 1 /* Text */,
                'ParentId': 1 /* Text */,
                'ParentLink': 1 /* Text */,
                'PartitionKey': 1 /* Text */,
                'PastProjects': 1 /* Text */,
                'Path': 1 /* Text */,
                'People': 1 /* Text */,
                'PeopleInMedia': 1 /* Text */,
                'PeopleKeywords': 1 /* Text */,
                'PhoneNumber': 1 /* Text */,
                'PictureHeight': 2 /* Integer */,
                'PictureThumbnailURL': 1 /* Text */,
                'PictureURL': 1 /* Text */,
                'PictureWidth': 2 /* Integer */,
                'PolicyACL': 1 /* Text */,
                'PolicyTags': 2 /* Integer */,
                'PostAuthor': 1 /* Text */,
                'PreferredName': 1 /* Text */,
                'Priority': 1 /* Text */,
                'PrivacyIndicator': 1 /* Text */,
                'PrivateColleagues': 1 /* Text */,
                'ProcessingTime': 4 /* DateTime */,
                'ProductCatalogGroupNumberOWSText': 1 /* Text */,
                'ProfileExpertise': 1 /* Text */,
                'ProfileName': 1 /* Text */,
                'ProgID': 1 /* Text */,
                'Pronunciations': 1 /* Text */,
                'PublishingContactOWSUser': 1 /* Text */,
                'PublishingIsFurlPageOWSBool': 1 /* Text */,
                'PublishingPageLayoutOWSURLH': 1 /* Text */,
                'Purpose': 1 /* Text */,
                'RankDetail': 1 /* Text */,
                'RankingWeightHigh': 1 /* Text */,
                'RankingWeightLow': 1 /* Text */,
                'RankingWeightName': 1 /* Text */,
                'RecommendedFor': 1 /* Text */,
                'Responsibilities': 1 /* Text */,
                'Restricted': 5 /* YesNo */,
                'RobotsNoIndex': 5 /* YesNo */,
                'RobotsNoIndexOWSBool': 1 /* Text */,
                'RootPostId': 1 /* Text */,
                'RootPostOwnerId': 1 /* Text */,
                'RootPostUniqueId': 1 /* Text */,
                'Schools': 1 /* Text */,
                'SecondaryFileExtension': 1 /* Text */,
                'SecondLevelColleagues': 1 /* Text */,
                'ServerRedirectedURL': 1 /* Text */,
                'ServiceApplicationId': 1 /* Text */,
                'SharedWithInternal': 1 /* Text */,
                'SharedWithUsersOWSUser': 1 /* Text */,
                'SipAddress': 1 /* Text */,
                'Site': 1 /* Text */,
                'SiteClosed': 5 /* YesNo */,
                'SiteGroup': 1 /* Text */,
                'SiteId': 1 /* Text */,
                'SitemapChangeFrequencyOWSCHCS': 1 /* Text */,
                'SitePath': 1 /* Text */,
                'SiteTemplate': 1 /* Text */,
                'SiteTemplateId': 2 /* Integer */,
                'SiteTitle': 1 /* Text */,
                'Size': 2 /* Integer */,
                'Skills': 1 /* Text */,
                'SocialTag': 1 /* Text */,
                'SocialTagId': 1 /* Text */,
                'SocialTagTextUrl': 1 /* Text */,
                'SPContentType': 1 /* Text */,
                'SPS-HideFromAddressLists': 2 /* Integer */,
                'SPSiteURL': 1 /* Text */,
                'SPS-RecipientTypeDetails': 2 /* Integer */,
                'SPS-UserType': 2 /* Integer */,
                'StartDate': 4 /* DateTime */,
                'Status': 1 /* Text */,
                'Tags': 1 /* Text */,
                'Title': 1 /* Text */,
                'Tld': 1 /* Text */,
                'UIVersionStringOWSText': 1 /* Text */,
                'UniqueId': 1 /* Text */,
                'URLDepth': 2 /* Integer */,
                'URLkeywords': 1 /* Text */,
                'URLs': 1 /* Text */,
                'UsageAnalyticsId': 1 /* Text */,
                'UsageEventItemId': 1 /* Text */,
                'UserName': 1 /* Text */,
                'UserProfile_Guid': 1 /* Text */,
                'VideoProcessingStatus': 1 /* Text */,
                'ViewableByAnonymousUsers': 5 /* YesNo */,
                'ViewableByExternalUsers': 5 /* YesNo */,
                'WebApplicationId': 1 /* Text */,
                'WebId': 1 /* Text */,
                'WebTemplate': 1 /* Text */,
                'WebUrl': 1 /* Text */,
                'WikiCategory': 1 /* Text */,
                'WordCustomRefiner1': 1 /* Text */,
                'WordCustomRefiner2': 1 /* Text */,
                'WordCustomRefiner3': 1 /* Text */,
                'WordCustomRefiner4': 1 /* Text */,
                'WordCustomRefiner5': 1 /* Text */,
                'WordExactCustomRefiner': 1 /* Text */,
                'WordPartCustomRefiner1': 1 /* Text */,
                'WordPartCustomRefiner2': 1 /* Text */,
                'WordPartCustomRefiner3': 1 /* Text */,
                'WordPartCustomRefiner4': 1 /* Text */,
                'WordPartCustomRefiner5': 1 /* Text */,
                'WordPartExactCustomRefiner': 1 /* Text */,
                'WorkEmail': 1 /* Text */,
                'WorkPhone': 1 /* Text */,
                'XLDataConnCountRngId': 2 /* Integer */,
                'XLFormulaCountRngId': 2 /* Integer */,
                'XLLinkedWkbkCountRngId': 2 /* Integer */,
                'XLLinkedWorkbooksText': 1 /* Text */,
                'XLUniqueFormulaSetCountRngId': 2 /* Integer */,
                'XLWorksheetCountRngId': 2 /* Integer */
            };
            // Date00-09
            for (var i = 0; i < 10; i++) {
                QueryableManagedProperties._properties["Date0" + i.toString()] = 4 /* DateTime */;
            }
            // Decimal00-09
            for (var i = 0; i < 10; i++) {
                QueryableManagedProperties._properties["Decimal0" + i.toString()] = 3 /* Decimal */;
            }
            // Double00-09
            for (var i = 0; i < 10; i++) {
                QueryableManagedProperties._properties["Double0" + i.toString()] = 7 /* Double */;
            }
            // Int00-49
            for (var i = 0; i < 50; i++) {
                QueryableManagedProperties._properties["Int" + (i < 10 ? '0' : '') + i] = 2 /* Integer */;
            }
            // RefinableDate00-19
            for (var i = 0; i < 20; i++) {
                QueryableManagedProperties._properties["RefinableDate" + (i < 10 ? '0' : '') + i] = 4 /* DateTime */;
            }
            // RefinableDecimal00-09
            for (var i = 0; i < 10; i++) {
                QueryableManagedProperties._properties["RefinableDecimal0" + i] = 3 /* Decimal */;
            }
            // RefinableDouble00-09
            for (var i = 0; i < 10; i++) {
                QueryableManagedProperties._properties["RefinableDouble0" + i] = 7 /* Double */;
            }
            // RefinableInt00-49
            for (var i = 0; i < 50; i++) {
                QueryableManagedProperties._properties["RefinableInt" + (i < 10 ? '0' : '') + i] = 2 /* Integer */;
            }
            // RefinableString00-199
            for (var i = 0; i < 200; i++) {
                // this is correct, the first 10 have a left padded zero but others do not even though this range goes to 200.
                QueryableManagedProperties._properties["RefinableString" + (i < 10 ? '0' : '') + i] = 1 /* Text */;
            }
        }
        return QueryableManagedProperties._properties;
    };
    return QueryableManagedProperties;
}());
/* harmony default export */ __webpack_exports__["default"] = (QueryableManagedProperties);


/***/ })

}]);
//# sourceMappingURL=chunk.sp-queryablemanagedproperties_661a700ddfc131c0f713.js.map