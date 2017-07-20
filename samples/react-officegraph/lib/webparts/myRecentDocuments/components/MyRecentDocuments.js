"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var MyRecentDocuments_module_scss_1 = require("../MyRecentDocuments.module.scss");
var sp_http_1 = require("@microsoft/sp-http");
var SearchUtils_1 = require("../../SearchUtils");
var Utils_1 = require("../../Utils");
var MyRecentDocuments = (function (_super) {
    __extends(MyRecentDocuments, _super);
    function MyRecentDocuments(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            myDocuments: [],
            loading: true,
            error: null
        };
        return _this;
    }
    MyRecentDocuments.prototype.componentDidMount = function () {
        this.loadMyDocuments(this.props.siteUrl, this.props.numberOfDocuments);
    };
    MyRecentDocuments.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        if (this.props.numberOfDocuments !== prevProps.numberOfDocuments ||
            this.props.siteUrl !== prevProps.siteUrl && (this.props.numberOfDocuments && this.props.siteUrl)) {
            this.loadMyDocuments(this.props.siteUrl, this.props.numberOfDocuments);
        }
    };
    MyRecentDocuments.prototype.render = function () {
        var loading = this.state.loading ? React.createElement("div", { style: { margin: '0 auto' } },
            React.createElement(office_ui_fabric_react_1.Spinner, { label: 'Loading...' })) : React.createElement("div", null);
        var error = this.state.error ? React.createElement("div", null,
            React.createElement("strong", null, "Error: "),
            " ",
            this.state.error) : React.createElement("div", null);
        var documents = this.state.myDocuments.map(function (doc, i) {
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
                React.createElement(office_ui_fabric_react_1.DocumentCardActivity, { activity: doc.activity.name + " " + doc.activity.date, people: [
                        { name: doc.activity.actorName, profileImageSrc: doc.activity.actorPhotoUrl }
                    ] })));
        });
        return (React.createElement("div", { className: MyRecentDocuments_module_scss_1.default.myRecentDocuments },
            React.createElement("div", { className: office_ui_fabric_react_1.css('ms-font-xl', MyRecentDocuments_module_scss_1.default.webPartTitle) }, this.props.title),
            loading,
            error,
            documents,
            React.createElement("div", { style: { clear: 'both' } })));
    };
    MyRecentDocuments.prototype.loadMyDocuments = function (siteUrl, numberOfDocuments) {
        var _this = this;
        var myDocuments = [];
        this.props.httpClient.get(siteUrl + "/_api/search/query?querytext='*'&properties='GraphQuery:actor(me\\,or(action\\:1001\\,action\\:1003)),GraphRankingModel:{\"features\"\\:[{\"function\"\\:\"EdgeTime\"}]}'&selectproperties='Author,AuthorOwsUser,DocId,DocumentPreviewMetadata,Edges,EditorOwsUser,FileExtension,FileType,HitHighlightedProperties,HitHighlightedSummary,LastModifiedTime,LikeCountLifetime,ListID,ListItemID,OriginalPath,Path,Rank,SPWebUrl,SecondaryFileExtension,ServerRedirectedURL,SiteTitle,Title,ViewCountLifetime,siteID,uniqueID,webID'&rowlimit=" + numberOfDocuments + "&ClientType='MyRecentDocuments'&RankingModelId='0c77ded8-c3ef-466d-929d-905670ea1d72'", sp_http_1.SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (!response ||
                !response.PrimaryQueryResult ||
                !response.PrimaryQueryResult.RelevantResults ||
                response.PrimaryQueryResult.RelevantResults.RowCount === 0) {
                return Promise.resolve();
            }
            var actorId = undefined;
            for (var i = 0; i < response.PrimaryQueryResult.RelevantResults.Table.Rows.length; i++) {
                var row = response.PrimaryQueryResult.RelevantResults.Table.Rows[i];
                var edges = JSON.parse(SearchUtils_1.SearchUtils.getValueFromResults('Edges', row.Cells));
                if (edges.length < 1) {
                    continue;
                }
                // we can get multiple edges back so let's show the information from the latest one
                var latestEdge = edges[0];
                if (edges.length > 1) {
                    var latestEdgeDate = new Date(latestEdge.Properties.Time);
                    for (var i_1 = 1; i_1 < edges.length; i_1++) {
                        var edgeDate = new Date(edges[i_1].Properties.Time);
                        if (edgeDate > latestEdgeDate) {
                            latestEdge = edges[i_1];
                            latestEdgeDate = edgeDate;
                        }
                    }
                }
                if (!actorId) {
                    // since all edges that we're retrieving are personal (I viewed, I modified)
                    // we only need to get the actor ID once because it's the same on all edges (me)
                    actorId = latestEdge.ActorId;
                }
                var cells = row.Cells;
                var date = new Date(latestEdge.Properties.Time);
                var dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
                myDocuments.push({
                    id: SearchUtils_1.SearchUtils.getValueFromResults('DocId', cells),
                    url: SearchUtils_1.SearchUtils.getValueFromResults('ServerRedirectedURL', cells),
                    title: SearchUtils_1.SearchUtils.getValueFromResults('Title', cells),
                    previewImageUrl: SearchUtils_1.SearchUtils.getPreviewImageUrl(cells, siteUrl),
                    extension: SearchUtils_1.SearchUtils.getValueFromResults('FileType', cells),
                    activity: {
                        actorId: latestEdge.ActorId,
                        date: dateString,
                        name: SearchUtils_1.SearchUtils.getActionName(latestEdge.Properties.Action)
                    }
                });
            }
            return _this.getActorsInfo(actorId, siteUrl);
        }).
            then(function (actorInformation) {
            if (actorInformation) {
                for (var i = 0; i < myDocuments.length; i++) {
                    if (myDocuments[i].activity.actorId !== actorInformation.id) {
                        continue;
                    }
                    myDocuments[i].activity.actorName = actorInformation.name;
                    myDocuments[i].activity.actorPhotoUrl = actorInformation.photoUrl;
                }
            }
            _this.setState({
                loading: false,
                error: null,
                myDocuments: myDocuments
            });
        }, function (error) {
            _this.setState({
                loading: false,
                error: error,
                myDocuments: []
            });
        });
    };
    MyRecentDocuments.prototype.getActorsInfo = function (actorId, siteUrl) {
        var _this = this;
        if (!actorId) {
            return Promise.resolve();
        }
        return new Promise(function (resolve, reject) {
            _this.props.httpClient.get(siteUrl + "/_api/search/query?querytext='WorkId:" + actorId + "'&selectproperties='DocId,Title,WorkEmail'&ClientType='MyRecentDocuments'&SourceId='b09a7990-05ea-4af9-81ef-edfab16c4e31'", sp_http_1.SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            })
                .then(function (response) {
                return response.json();
            })
                .then(function (response) {
                if (!response ||
                    !response.PrimaryQueryResult ||
                    !response.PrimaryQueryResult.RelevantResults ||
                    response.PrimaryQueryResult.RelevantResults.RowCount === 0) {
                    return Promise.resolve();
                }
                var cells = response.PrimaryQueryResult.RelevantResults.Table.Rows[0].Cells;
                resolve({
                    email: SearchUtils_1.SearchUtils.getValueFromResults('WorkEmail', cells),
                    id: parseInt(SearchUtils_1.SearchUtils.getValueFromResults('DocId', cells)),
                    name: SearchUtils_1.SearchUtils.getValueFromResults('Title', cells),
                    photoUrl: Utils_1.Utils.getUserPhotoUrl(SearchUtils_1.SearchUtils.getValueFromResults('WorkEmail', cells), siteUrl)
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    return MyRecentDocuments;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyRecentDocuments;

//# sourceMappingURL=MyRecentDocuments.js.map
