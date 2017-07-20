"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var TrendingInTheSitesIFollow_module_scss_1 = require("../TrendingInTheSitesIFollow.module.scss");
var sp_http_1 = require("@microsoft/sp-http");
var SearchUtils_1 = require("../../SearchUtils");
var Utils_1 = require("../../Utils");
var TrendingInTheSitesIFollow = (function (_super) {
    __extends(TrendingInTheSitesIFollow, _super);
    function TrendingInTheSitesIFollow(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            trendingDocuments: [],
            loading: true,
            error: null
        };
        return _this;
    }
    TrendingInTheSitesIFollow.prototype.componentDidMount = function () {
        this.loadDocuments(this.props.siteUrl, this.props.numberOfDocuments);
    };
    TrendingInTheSitesIFollow.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        if (this.props.numberOfDocuments !== prevProps.numberOfDocuments ||
            this.props.siteUrl !== prevProps.siteUrl && (this.props.numberOfDocuments && this.props.siteUrl)) {
            this.loadDocuments(this.props.siteUrl, this.props.numberOfDocuments);
        }
    };
    TrendingInTheSitesIFollow.prototype.render = function () {
        var loading = this.state.loading ? React.createElement("div", { style: { margin: '0 auto' } },
            React.createElement(office_ui_fabric_react_1.Spinner, { label: 'Loading...' })) : React.createElement("div", null);
        var error = this.state.error ? React.createElement("div", null,
            React.createElement("strong", null, "Error: "),
            " ",
            this.state.error) : React.createElement("div", null);
        var documents = this.state.trendingDocuments.map(function (doc, i) {
            var iconUrl = "https://spoprod-a.akamaihd.net/files/odsp-next-prod_ship-2016-08-15_20160815.002/odsp-media/images/filetypes/32/" + doc.extension + ".png";
            return (React.createElement(office_ui_fabric_react_1.DocumentCard, { onClickHref: doc.url, key: doc.id },
                React.createElement(office_ui_fabric_react_1.DocumentCardPreview, { previewImages: [
                        {
                            previewImageSrc: doc.previewImageUrl,
                            iconSrc: iconUrl,
                            width: 318,
                            height: 196,
                            accentColor: '#ce4b1f'
                        }
                    ] }),
                React.createElement(office_ui_fabric_react_1.DocumentCardTitle, { title: doc.title }),
                React.createElement(office_ui_fabric_react_1.DocumentCardLocation, { location: doc.webTitle, locationHref: doc.webUrl }),
                React.createElement(office_ui_fabric_react_1.DocumentCardActivity, { activity: doc.activity.name + " " + doc.activity.date, people: [
                        { name: doc.activity.actorName, profileImageSrc: doc.activity.actorPhotoUrl }
                    ] })));
        });
        return (React.createElement("div", { className: TrendingInTheSitesIFollow_module_scss_1.default.trendingInTheSitesIFollow },
            React.createElement("div", { className: office_ui_fabric_react_1.css('ms-font-xl', TrendingInTheSitesIFollow_module_scss_1.default.webPartTitle) }, this.props.title),
            loading,
            error,
            documents,
            React.createElement("div", { style: { clear: 'both' } })));
    };
    TrendingInTheSitesIFollow.prototype.loadDocuments = function (siteUrl, numberOfDocuments) {
        var _this = this;
        this.setState({
            loading: true,
            error: undefined,
            trendingDocuments: []
        });
        var trendingDocuments = [];
        this.getSitesIFollow(siteUrl)
            .then(function (sitesIFollow) {
            return _this.getTrendingDocuments(sitesIFollow, siteUrl, numberOfDocuments);
        })
            .then(function (trendingDocuments) {
            _this.setState({
                loading: false,
                error: undefined,
                trendingDocuments: trendingDocuments
            });
        }, function (error) {
            _this.setState({
                loading: false,
                error: error,
                trendingDocuments: []
            });
        });
        return;
    };
    TrendingInTheSitesIFollow.prototype.getSitesIFollow = function (siteUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.props.httpClient.get(siteUrl + "/_api/social.following/my/followed(types=4)", sp_http_1.SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            })
                .then(function (response) {
                return response.json();
            })
                .then(function (sitesIFollowInfo) {
                var sitesIFollow = [];
                for (var i = 0; i < sitesIFollowInfo.value.length; i++) {
                    sitesIFollow.push(sitesIFollowInfo.value[i].Uri);
                }
                resolve(sitesIFollow);
            }, function (error) {
                reject(error);
            });
        });
    };
    TrendingInTheSitesIFollow.prototype.getTrendingDocuments = function (sitesIFollow, siteUrl, numberOfDocuments) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (sitesIFollow.length === 0) {
                return resolve([]);
            }
            var query = '(';
            for (var i = 0; i < sitesIFollow.length; i++) {
                if (query.length > 1) {
                    query += ' OR ';
                }
                query += "Path:\"" + sitesIFollow[i] + "\"";
            }
            query += ') AND (IsDocument:1)';
            var postData = JSON.stringify({
                'request': {
                    '__metadata': {
                        'type': 'Microsoft.Office.Server.Search.REST.SearchRequest'
                    },
                    'Querytext': query,
                    'SelectProperties': {
                        'results': ['Author', 'AuthorOwsUser', 'DocId', 'DocumentPreviewMetadata', 'Edges', 'EditorOwsUser', 'FileExtension', 'FileType', 'HitHighlightedProperties', 'HitHighlightedSummary', 'LastModifiedTime', 'LikeCountLifetime', 'ListID', 'ListItemID', 'OriginalPath', 'Path', 'Rank', 'SPWebUrl', 'SecondaryFileExtension', 'ServerRedirectedURL', 'SiteTitle', 'Title', 'ViewCountLifetime', 'siteID', 'uniqueID', 'webID']
                    },
                    'ClientType': 'TrendingInTheSitesIFollow',
                    'BypassResultTypes': 'true',
                    'RowLimit': numberOfDocuments,
                    'StartRow': '0',
                    'RankingModelId': '0c77ded8-c3ef-466d-929d-905670ea1d72',
                    'Properties': {
                        'results': [{
                                'Name': 'IncludeExternalContent',
                                'Value': {
                                    'BoolVal': 'True',
                                    'QueryPropertyValueTypeIndex': 3
                                }
                            }, {
                                'Name': 'GraphQuery',
                                'Value': {
                                    'StrVal': 'actor(ME,action:1021)',
                                    'QueryPropertyValueTypeIndex': 1
                                }
                            }]
                    }
                }
            });
            _this.props.httpClient.post(siteUrl + "/_api/search/postquery", sp_http_1.SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'odata-version': ''
                },
                body: postData
            })
                .then(function (response) {
                return response.json();
            })
                .then(function (response) {
                if (!response ||
                    !response.PrimaryQueryResult ||
                    !response.PrimaryQueryResult.RelevantResults ||
                    response.PrimaryQueryResult.RelevantResults.RowCount === 0) {
                    resolve([]);
                    return;
                }
                var trendingDocuments = [];
                for (var i = 0; i < response.PrimaryQueryResult.RelevantResults.Table.Rows.length; i++) {
                    var row = response.PrimaryQueryResult.RelevantResults.Table.Rows[i];
                    var cells = row.Cells;
                    var editorInfo = SearchUtils_1.SearchUtils.getValueFromResults('EditorOwsUser', cells).split('|');
                    var modifiedDate = new Date(SearchUtils_1.SearchUtils.getValueFromResults('LastModifiedTime', cells).replace('.0000000', ''));
                    var dateString = (modifiedDate.getMonth() + 1) + '/' + modifiedDate.getDate() + '/' + modifiedDate.getFullYear();
                    trendingDocuments.push({
                        id: SearchUtils_1.SearchUtils.getValueFromResults('DocId', cells),
                        url: SearchUtils_1.SearchUtils.getValueFromResults('ServerRedirectedURL', cells),
                        webUrl: SearchUtils_1.SearchUtils.getValueFromResults('SPWebUrl', cells),
                        webTitle: SearchUtils_1.SearchUtils.getValueFromResults('SiteTitle', cells),
                        title: SearchUtils_1.SearchUtils.getValueFromResults('Title', cells),
                        previewImageUrl: SearchUtils_1.SearchUtils.getPreviewImageUrl(cells, siteUrl),
                        extension: SearchUtils_1.SearchUtils.getValueFromResults('FileType', cells),
                        activity: {
                            actorId: -1,
                            actorName: Utils_1.Utils.trim(editorInfo[1]),
                            actorPhotoUrl: Utils_1.Utils.getUserPhotoUrl(Utils_1.Utils.trim(editorInfo[0]), siteUrl),
                            date: dateString,
                            name: 'Modified'
                        }
                    });
                }
                resolve(trendingDocuments);
            }, function (error) {
                reject(error);
            });
        });
    };
    return TrendingInTheSitesIFollow;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrendingInTheSitesIFollow;

//# sourceMappingURL=TrendingInTheSitesIFollow.js.map
