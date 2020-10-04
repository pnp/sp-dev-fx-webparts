(window["webpackJsonp_1cea229f_b208_4202_8014_22503d92a019_0_1_0"] = window["webpackJsonp_1cea229f_b208_4202_8014_22503d92a019_0_1_0"] || []).push([["sp-retrievablemanagedproperties"],{

/***/ "3jLE":
/*!********************************************************************************!*\
  !*** ./lib/dataProviders/search/managedProperty/RefinableManagedProperties.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file RefinableManagedProperties.ts
 * @Copyright (c) Microsoft Corporation.  'All', rights reserved.
 */
// To be kept in sync with OOTBSchemaOSS.cs.
var RefinableManagedProperties = /** @class */ (function () {
    function RefinableManagedProperties() {
    }
    RefinableManagedProperties.addRefinableManagedProperties = function (properties) {
        // RefinableInt00-49
        for (var i = 0; i < 50; i++) {
            properties.push("RefinableInt" + (("0" + i).substr(-2, 2)));
        }
        // RefinableDate00-19
        for (var i = 0; i < 20; i++) {
            properties.push("RefinableDate" + (("0" + i).substr(-2, 2)));
        }
        // RefinableDateInvariant00-01
        for (var i = 0; i < 2; i++) {
            properties.push("RefinableDateInvariant0" + i);
        }
        // RefinableDateSingle00-04
        for (var i = 0; i < 5; i++) {
            properties.push("RefinableDateSingle0" + i);
        }
        // RefinableDecimal00-09
        for (var i = 0; i < 10; i++) {
            properties.push("RefinableDecimal0" + i);
        }
        // RefinableDouble00-09
        for (var i = 0; i < 10; i++) {
            properties.push("RefinableDouble0" + i);
        }
        // RefinableString00-199
        for (var i = 0; i < 200; i++) {
            // this is correct, the first 10 have a left padded zero but others do not even though this range goes to 200.
            properties.push("RefinableString" + (i < 10 ? '0' : '') + i);
        }
    };
    return RefinableManagedProperties;
}());
/* harmony default export */ __webpack_exports__["default"] = (RefinableManagedProperties);


/***/ }),

/***/ "oz+a":
/*!**********************************************************************************!*\
  !*** ./lib/dataProviders/search/managedProperty/RetrievableManagedProperties.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RefinableManagedProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RefinableManagedProperties */ "3jLE");
/**
 * @file RetrievableManagedProperties.ts
 * @Copyright (c) Microsoft Corporation.  'All', rights reserved.
 */
// To be kept in sync with OOTBSchemaOSS.cs.

var RetrievableManagedProperties = /** @class */ (function () {
    function RetrievableManagedProperties() {
    }
    RetrievableManagedProperties.getProperties = function (extraProperties) {
        if (!RetrievableManagedProperties._properties) {
            RetrievableManagedProperties._properties = [];
            if (extraProperties) {
                extraProperties.forEach(function (value, index) {
                    RetrievableManagedProperties._properties.push(value);
                });
            }
            RetrievableManagedProperties._properties.push('AADObjectID', 'AboutMe', 'Account', 'AccountName', 'Acronym', 'AcronymAggre', 'AcronymExpansion', 'AcronymExpansionAggre', 'AnalyticsPath', 'AnchorLink', 'AssignedTo', 'AttachmentDescription', 'AttachmentType', 'AttachmentURI', 'Author', 'AuthorOWSUser', 'AverageRating', 'BaseHref', 'BaseOfficeLocation', 'BasicScope', 
            // 'BodyOWSMTXT', Do not return body of document
            'CCAMetadata', 'ChangeID', 'ChangeIDEnd', 'ChannelVersion', 'Charset', 'ClassificationConfidence', 'ClassificationContext', 'ClassificationCount', 'ClassificationLastScan', 'ClassificationType', 'ClientUrl', 'CollapsingStatus', 'CombinedName', 'CommentCountLifetime', 'CommunityMembersCount', 'CommunityRepliesCount', 'CommunityTopicsCount', 'Companies', 'ComplianceTag', 'ComplianceTagWrittenTime', 'ContentClass', 'ContentDatabaseId', 'ContentSource', 'ContentType', 'ContentTypeId', 'CrawlLogLevel', 'CrawlObjectID', 'CrawlUrl', 'CRC', 'Created', 'CreatedBy', 'CreatedById', 'CreatedOWSDate', 'DeepLinks', 'Def', 'DefAggre', 'DefaultEncodingURL', 'DefaultProperties', 'DefinitionContent', 'DefinitionContentAggre', 'Department', 'Description', 'DetectedLanguage', 'DetectedLanguageRanking', 'DirLink', 'DirLinkSecurityUpdate', 'DirLinkWithTime', 'DiscoveredTime', 'DiscussionBestAnswerID', 'DiscussionCategory', 'DiscussionLikesCount', 'DiscussionPost', 'DisplayAuthor', 'DisplayDate', 'DlcDocId', 'DMSDocAccessRight', 'DMSDocAuthor', 'DMSDocTitle', 'DMSLeaseTerm', 'DocACLMeta', 'DocId', 'DocRank', 'DocSubject', 'DocumentLink', 'DocumentPreviewMetadata', 'DocumentSignature', 'DocumentSummary', 'DocumentSummarySize', 'DocVector', 'Domain', 'DuplicateHash', 'Duplicates', 'EditorOWSUser', 'EduAssignmentCategory', 'EduAssignmentFormat', 'EduEntityId', 'EduMaximumScore', 'Encoding', 'EndAnchor', 'EndDate', 'EntityName', 'EntityNamespace', 'ExcludeFromSummary', 'ExpiresOWSDate', 'ExternalMediaUrl', 'ExtractedAuthor', 'ExtractedDate', 'FallbackLanguage', 'FCOCount', 'FileExtension', 'Filename', 'FileType', 'FirstLevelColleagues', 'FirstLevelMutualFollowings', 'FirstName', 'FirstPublishedDate', 'FollowAll', 'FollowNone', 'FullPostBody', 'GeneratedTitle', 'Genre', 'HierarchyUrl', 'HitHighlightedProperties', 'HitHighlightedSummary', 'HostingPartition', 'HtmlFileType', 'ImageDateCreated', 'Importance', 'IndexDocId', 'IndexRare', 'Interests', 'InternalExpiresInDays', 'InternalFileType', 'IRMProtected', 'IRMTemplateName', 'IsAllDayEvent', 'IsClassificationProcessingLimitExceeded', 'IsContainer', 'IsData', 'IsDefaultView', 'IsDocument', 'IsEmptyList', 'IsExternalContent', 'IsInRecycleBin', 'IsListItem', 'IsMyDocuments', 'IsOneNotePage', 'IsPartiallyProcessed', 'IsPublishingCatalog', 'IsReport', 'ItemCategory', 'JobTitle', 'Keywords', 'language', 'languageHint', 'languages', 'LastAnalyticsUpdateTime', 'LastModifiedTime', 'LastName', 'LastSharedByTime', 'LastSharedByUser', 'LevelsToTop', 'LikeCountLifetime', 'LikesCount', 'LinkHRef', 'LinkingUrl', 'LinkOfficeChild', 'LinkOfficeChildList', 'ListID', 'ListItemID', 'ListUrl', 'Location', 'MediaDuration', 'Memberships', 'MetadataAuthor', 'MicroBlogType', 'MobilePhone', 'ModifiedBy', 'ModifiedById', 'ModifiedOWSDate', 'NonDocument', 'NormalizedForwardURL', 'NormalizedURL', 'Notes', 'NtSdid', 'NumItemsInCollection', 'OfficeGraphEnabled', 'OfficeNumber', 'OrgNames', 'OrgParentNames', 'OrgParentUrls', 'OrgUrls', 'OriginalPath', 'OWS_ItemURL', 'OWS_MetadataFacetInfo', 'OWS_SPLocationInfo', 'OWSMetadataFacetInfo', 'OWSTaxIdMetadataAllTagsInfo', 'OWSTaxIdProductCatalogItemCategory', 'OWSTaxIdVideoPortalItemCategory', 'PageAppId', 'PageAuthorInitials', 'PageID', 'PageLastModifierInitials', 'PageLevel', 'PageTags', 'ParentId', 'ParentLink', 'PartitionKey', 'PastProjects', 'Path', 'People', 'PeopleInMedia', 'PeopleKeywords', 'PHFlags', 'PhoneNumber', 'PictureHeight', 'PictureThumbnailURL', 'PictureURL', 'PictureWidth', 'PluggableSdid', 'PluggableSecurityBlob', 'PluggableSecurityTrimmerId', 'PolicyTags', 'PopularSocialTags', 'PostAuthor', 'PreferredName', 'Priority', 'PrivacyIndicator', 'processingtime', 'ProductCatalogGroupNumberOWSText', 'ProgID', 'PromotedState', 'Pronunciations', 'PublishingCatalogSettings', 'PublishingContactOWSUser', 'PublishingImage', 'PublishingIsFurlPageOWSBool', 'PublishingPageContentOWSHTML', 'PublishingPageLayoutOWSURLH', 'QIRExternal', 'QueryTerms', 'Rank', 'RankDetail', 'RankPrecalBottom', 'RankPrecalTop', 'Rating', 'RatingCount', 'RecsClickedLifeTime', 'RecsClickedRecent', 'RedirectedURL');
            _RefinableManagedProperties__WEBPACK_IMPORTED_MODULE_0__["default"].addRefinableManagedProperties(RetrievableManagedProperties._properties);
            RetrievableManagedProperties._properties.push('ReplyCount', 'Responsibilities', 'Restricted', 'Robots', 'RobotsNoIndexOWSBool', 'RootPostID', 'RootPostOwnerID', 'RootPostUniqueID', 'SameEnumDepthProps', 'SBWPageContent1OWSHTML', 'Schools', 'Scope', 'SecondaryFileExtension', 'SecondLevelColleagues', 'SectionColor', 'SectionIndexes', 'SectionNames', 'SecurityBlob', 'SecurityId', 'SecurityProvider', 'ServerRedirectedEmbedURL', 'ServerRedirectedPreviewURL', 'ServerRedirectedURL', 'ServiceApplicationID', 'ShareCountLifetime', 'SharedWithDetails', 'SharedWithInternal', 'SharedWithUsersOWSUser', 'SipAddress', 'Site', 'SiteContainer', 'SiteDescription', 'SiteGroup', 'SiteID', 'SiteLogo', 'SitemapChangeFrequency', 'SitemapChangeFrequencyOWSCHCS', 'SitemapPriority', 'SiteMembers', 'SiteNumFollowers', 'SiteOwners', 'SitePath', 'SiteTemplate', 'SiteTemplateId', 'SiteTitle', 'Size', 'Skills', 'SocialDistance', 'SocialTag', 'SpotlightVideos', 'SPSHideFromAddressLists', 'SPSiteURL', 'SPSRecipientTypeDetails', 'SPSUserType', 'SPVersion', 'SPWebUrl', 'StartDate', 'Status', 'STSHashtagsCollection', 'Summary', 'Tags', 'TaucClickNotify', 'TaucDisplayUrl', 'TaucTitle', 'TaucUrl', 'teaser', 'TempAuthor', 'TempLastModifiedTime', 'TileColor', 'Title', 'tld', 'UIVersionStringOWSText', 'UniqueID', 'UrlAnchor', 'UrlDepth', 'Urls', 'UsageAnalyticsId');
            for (var i = 1; i < 13; i++) {
                RetrievableManagedProperties._properties.push("UsageEvent" + i + "LifeTime");
            }
            for (var i = 1; i < 13; i++) {
                RetrievableManagedProperties._properties.push("UsageEvent" + i + "Recent");
            }
            RetrievableManagedProperties._properties.push('UsageEventItemId', 'UserEncodingUrl', 'UserName', 'UserProfile_Guid', 'VideoProcessingStatus', 'VideoSetRenditionsInfo', 'ViewableByAnonymousUsers', 'ViewableByExternalUsers', 'ViewCountLifetime');
            for (var i = 1; i < 8; i++) {
                RetrievableManagedProperties._properties.push("ViewsLast" + i + "Days");
            }
            for (var i = 1; i < 8; i++) {
                RetrievableManagedProperties._properties.push("ViewsLast" + i + "DaysUniqueUsers");
            }
            for (var i = 1; i < 4; i++) {
                RetrievableManagedProperties._properties.push("ViewsLastMonths" + i);
            }
            for (var i = 1; i < 4; i++) {
                RetrievableManagedProperties._properties.push("ViewsLastMonths" + i + "Unique");
            }
            RetrievableManagedProperties._properties.push('ViewsLifeTime', 'ViewsLifeTimeUniqueUsers', 'ViewsRecent', 'ViewsRecentUniqueUsers', 'WebApplicationId', 'WebId', 'WebTemplate', 'WebUrl', 'WeightedMemberships', 'WikiCategory', 'WikiFieldOWSMTXT');
            for (var i = 1; i < 6; i++) {
                RetrievableManagedProperties._properties.push("WordCustomRefiner" + i);
            }
            RetrievableManagedProperties._properties.push('WordExactCustomRefiner');
            for (var i = 1; i < 6; i++) {
                RetrievableManagedProperties._properties.push("WordPartCustomRefiner" + i);
            }
            RetrievableManagedProperties._properties.push('WordPartExactCustomRefiner', 'WorkEmail', 'WorkPhone', 'XLDataConnCount', 'XLDataConnCountRngID', 'XLFormulaCount', 'XLFormulaCountRngID', 'XLLinkedWkbkCount', 'XLLinkedWkbkCountRngID', 'XLLinkedWorkbooksText', 'XLUniqueFormulaSetCount', 'XLUniqueFormulaSetCountRngID', 'XLWorksheetCount', 'XLWorksheetCountRngID', 'YomiDisplayName');
        }
        return RetrievableManagedProperties._properties;
    };
    return RetrievableManagedProperties;
}());
/* harmony default export */ __webpack_exports__["default"] = (RetrievableManagedProperties);


/***/ })

}]);
//# sourceMappingURL=chunk.sp-retrievablemanagedproperties_e9d1012718b8b8f122f8.js.map