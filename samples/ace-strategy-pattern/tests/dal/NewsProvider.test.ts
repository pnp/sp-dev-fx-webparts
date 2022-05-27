///<reference types="jest" />
import { NewsProvider } from "../../src/dal/NewsProvider";
import { MockGraphClient } from "../mocks/MockGraphClient";

describe("NewsProvider", () => {
    it("should return news", async () => {
        let graphClient = new MockGraphClient();
        graphClient.responses.set("https://graph.microsoft.com/v1.0/search/query",{
            "value": [
                {
                    "searchTerms": [],
                    "hitsContainers": [
                        {
                            "hits": [
                                {
                                    "hitId": "66A0EED6-FA43-49FD-AA03-EF82B4040140",
                                    "rank": 1,
                                    "summary": " daf0b71c-6de8-4ef7-b511-faae7c388708 Another post<ddd/>Another post<ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test Post",
                                            "description": "Another post",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/images/sitepagethumbnail.png",
                                            "path": "https://test.sharepoint.com/SitePages/Test-Post.aspx",
                                            "uniqueId": "{66A0EED6-FA43-49FD-AA03-EF82B4040140}",
                                            "spWebUrl": "https://test.sharepoint.com",
                                            "listItemID": "15",
                                            "listID": "274163ca-a930-455a-9e14-40906b4edd5d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2021-06-15T12:52:29Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "B4FDA1D9-F775-48AC-AC81-31F6795223EA",
                                    "rank": 2,
                                    "summary": "",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test news (review) 15-05-2020",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/images/sitepagethumbnail.png",
                                            "path": "https://test.sharepoint.com/sites/tea-point/SitePages/news-Test-news-(review)-15-05-2020.aspx",
                                            "uniqueId": "{B4FDA1D9-F775-48AC-AC81-31F6795223EA}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point",
                                            "listItemID": "17",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-05-15T11:23:19Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "F20028EB-924F-4DAE-A263-82C75D33B7EE",
                                    "rank": 3,
                                    "summary": " How do you get started? Select 'Edit' to start working with this basic two-column template with an emphasis on text and examples of text formatting. With your page in edit mode, <ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "News from Test team",
                                            "description": "How do you get started? Select 'Edit' to start working with this basic two-column template with an emphasis on text and examples of text formatting. With your page in edit mode, select this paragraph and replace it with your own text. Then, select t…",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/images/sitepagethumbnail.png",
                                            "path": "https://test.sharepoint.com/sites/Testteam646/SitePages/News-from-Test-team.aspx",
                                            "uniqueId": "{F20028EB-924F-4DAE-A263-82C75D33B7EE}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/Testteam646",
                                            "listItemID": "2",
                                            "listID": "cfb20819-517b-4f63-96b9-6fd954f22933",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-04-23T07:32:58Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "62EF2409-F0E9-457B-810F-75165D1228B6",
                                    "rank": 4,
                                    "summary": " Some test content of my test news<ddd/>Some test content of my test news<ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Some test News",
                                            "description": "Some test content of my test news",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/getpreview.ashx?guidSite=6939921445424f93b658328a712a834f&guidWeb=f5ad2fe7d9f14b968dce884fa6cc49cd&guidFile=1b6898259ab84db389681cdffce4d117&ext=jpeg",
                                            "path": "https://test.sharepoint.com/sites/tea-point/SitePages/news-Some-test-News.aspx",
                                            "uniqueId": "{62EF2409-F0E9-457B-810F-75165D1228B6}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point",
                                            "listItemID": "100",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2021-03-25T10:05:21Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "92B0C0A1-BF46-4345-AD62-9A86ABE6BFFB",
                                    "rank": 5,
                                    "summary": " Publish something about CSGO. Today for the very first time we will be joined by my good friend Mateusz! e84a8ca2-f63c-4fb9-bc0b-d8eef5ccb22b<ddd/>Publish something about CS:GO. Today<ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test-30-10-2020-2",
                                            "description": "Publish something about CS:GO. Today for the very first time we will be joined by my good friend Mateusz!",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/getpreview.ashx?guidSite=6939921445424f93b658328a712a834f&guidWeb=f5ad2fe7d9f14b968dce884fa6cc49cd&guidFile=51b1a4ea93664b56aa174ce2a039ebea&ext=jpeg",
                                            "path": "https://test.sharepoint.com/sites/tea-point/SitePages/news-Test-30-10-2020-2.aspx",
                                            "uniqueId": "{92B0C0A1-BF46-4345-AD62-9A86ABE6BFFB}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point",
                                            "listItemID": "80",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-10-30T12:26:47Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "86FDD130-9219-4C4E-A3F5-63CB1C14A216",
                                    "rank": 6,
                                    "summary": " I'm going to play BG again. I already started last weekend and its amazing. Hope I'll get few hours this weekend as well. Just between You and me, I'm thinking about blowing<ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test-30-10-2020-1",
                                            "description": "I'm going to play BG again. I already started last weekend and its amazing. Hope I'll get few hours this weekend as well. Just between You and me, I'm thinking about blowing todays CS for BG...difficult decisions ahead.",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/getpreview.ashx?guidSite=6939921445424f93b658328a712a834f&guidWeb=f5ad2fe7d9f14b968dce884fa6cc49cd&guidFile=bc31bba470754c1aaa91d0a85d08df4a&ext=jpeg",
                                            "path": "https://test.sharepoint.com/sites/tea-point/SitePages/news-Test-30-10-2020-1.aspx",
                                            "uniqueId": "{86FDD130-9219-4C4E-A3F5-63CB1C14A216}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point",
                                            "listItemID": "79",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-10-30T08:40:30Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "B5EB893D-CD84-4029-B323-95D2B5594C53",
                                    "rank": 7,
                                    "summary": " Some test news content. Another paragraph. And one more, just for fun. And one more to check if label is passed<ddd/>Some test news content. Another paragraph. And one more, just for<ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test-12-11-2020-1",
                                            "description": "Some test news content. Another paragraph. And one more, just for fun. And one more to check if label is passed",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/getpreview.ashx?guidSite=6939921445424f93b658328a712a834f&guidWeb=f5ad2fe7d9f14b968dce884fa6cc49cd&guidFile=5800091587144706be5dc504509f80f9&ext=jpeg",
                                            "path": "https://test.sharepoint.com/sites/tea-point/SitePages/news-Test-12-11-2020-1.aspx",
                                            "uniqueId": "{B5EB893D-CD84-4029-B323-95D2B5594C53}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point",
                                            "listItemID": "83",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-11-12T06:53:16Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "4F5CC501-FD89-46AE-A48B-158FAC9B96B6",
                                    "rank": 8,
                                    "summary": " Hm...that might be a time to play sc again. <ddd/>Hm...that might be a time to play sc again.<ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test-17-11-2020-1",
                                            "description": "Hm...that might be a time to play sc again.",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/getpreview.ashx?guidSite=9d181eecec514fc0b897d638bb843e3a&guidWeb=f5ad2fe7d9f14b968dce884fa6cc49cd&guidFile=1e6009a7d2d34e758bd439a8c33282ca&ext=jpeg",
                                            "path": "https://test.sharepoint.com/sites/tea-point-about-us/SitePages/news-Test-17-11-2020-1.aspx",
                                            "uniqueId": "{4F5CC501-FD89-46AE-A48B-158FAC9B96B6}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point-about-us",
                                            "listItemID": "27",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-11-17T10:40:44Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "591442E1-B64D-46C9-81CF-4672C63A5D8C",
                                    "rank": 9,
                                    "summary": " 6409567c-ede1-4834-af41-55ca074c4048 0767823f-7fc4-48f8-9e92-3678d353f033<ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test-22-4-2020-NotHighlighted",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/images/sitepagethumbnail.png",
                                            "path": "https://test.sharepoint.com/sites/tea-point/SitePages/news-Test-22-4-2020-NotHighlighted.aspx",
                                            "uniqueId": "{591442E1-B64D-46C9-81CF-4672C63A5D8C}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point",
                                            "listItemID": "13",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-04-22T07:23:27Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "EB99702E-59C0-45E1-919E-F87E407A888C",
                                    "rank": 10,
                                    "summary": "Hello! This is a Text web part in one of two columns in this section . You can click inside this text block when in Edit mode to make changes. Next to this paragraph is a column<ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test Post in teams",
                                            "description": "Hello! This is a Text web part in one of two columns in this section . You can click inside this text block when in Edit mode to make changes. Next to this paragraph is a column that contains an image web part. Click the image, and you can use the t…",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/images/sitepagethumbnail.png",
                                            "path": "https://test.sharepoint.com/sites/test/SitePages/Test-Post.aspx",
                                            "uniqueId": "{EB99702E-59C0-45E1-919E-F87E407A888C}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/test",
                                            "listItemID": "2",
                                            "listID": "57d636f3-6d70-4ba3-8b47-f7775e401972",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-03-30T13:43:21Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "AD6384BD-C232-4FCD-AE4E-BC0F61F91B77",
                                    "rank": 11,
                                    "summary": "",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test-News-22-04-2020",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/getpreview.ashx?guidSite=6939921445424f93b658328a712a834f&guidWeb=f5ad2fe7d9f14b968dce884fa6cc49cd&guidFile=cd7e4c54b5c54fc3b285a5e5135e5017&ext=png&ow=1110&oh=200",
                                            "path": "https://test.sharepoint.com/sites/tea-point/SitePages/news-Test-News-22-04-2020.aspx",
                                            "uniqueId": "{AD6384BD-C232-4FCD-AE4E-BC0F61F91B77}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point",
                                            "listItemID": "12",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-04-22T07:22:08Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "FB9CDB0F-7422-46C8-9499-BFE6DFE3BF93",
                                    "rank": 12,
                                    "summary": "",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test-Highlighted2",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/getpreview.ashx?guidSite=6939921445424f93b658328a712a834f&guidWeb=f5ad2fe7d9f14b968dce884fa6cc49cd&guidFile=ac954ab7f92849d8900e00cd5c0e8385&ext=jpeg&ow=2560&oh=1884",
                                            "path": "https://test.sharepoint.com/sites/tea-point/SitePages/news-Test-Highlighted2.aspx",
                                            "uniqueId": "{FB9CDB0F-7422-46C8-9499-BFE6DFE3BF93}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/tea-point",
                                            "listItemID": "15",
                                            "listID": "59930aeb-e78b-4bb4-a78c-5b7485d1445d",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2020-04-22T07:32:16Z"
                                        }
                                    }
                                },
                                {
                                    "hitId": "C4F91266-AC1C-46F9-AE04-22E41E1584C8",
                                    "rank": 13,
                                    "summary": "How do you get started? Select 'Edit' to start working with this basic two-column template with an emphasis on text and examples of text formatting. With your page in edit mode, <ddd/>",
                                    "resource": {
                                        "@odata.type": "#microsoft.graph.listItem",
                                        "fields": {
                                            "title": "Test news in Test Team!",
                                            "description": "How do you get started? Select 'Edit' to start working with this basic two-column template with an emphasis on text and examples of text formatting. With your page in edit mode, select this paragraph and replace it with your own text. Then, select t…",
                                            "pictureThumbnailURL": "https://test.sharepoint.com/_layouts/15/images/sitepagethumbnail.png",
                                            "path": "https://test.sharepoint.com/sites/Testteam646/SitePages/Test-news-in-Test-Team!.aspx",
                                            "uniqueId": "{C4F91266-AC1C-46F9-AE04-22E41E1584C8}",
                                            "spWebUrl": "https://test.sharepoint.com/sites/Testteam646",
                                            "listItemID": "3",
                                            "listID": "cfb20819-517b-4f63-96b9-6fd954f22933",
                                            "author": "Test User",
                                            "firstPublishedDateOWSDATE": "2021-04-01T06:31:49Z"
                                        }
                                    }
                                }
                            ],
                            "total": 26,
                            "moreResultsAvailable": false
                        }
                    ]
                }
            ],
            "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.searchResponse)"
        })
        const newsProvider = new NewsProvider(graphClient);
    
        const news = await newsProvider.getData();
        expect(news.length).toBeGreaterThan(0);
        expect(news[0].title).toBe("Test Post");
    });
});