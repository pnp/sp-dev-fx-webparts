//rssParser inspired by rss-parser node package
import { Parser } from 'xml2js';
import { Utils } from './utils';
import { Fields } from './fields';


export class RssXmlParserService {

  private static DEFAULT_HEADERS = {
    'User-Agent': 'rss-parser',
    'Accept': 'application/rss+xml',
  };
  private static DEFAULT_MAX_REDIRECTS = 5;
  private static DEFAULT_TIMEOUT = 60000;

  private static options: any;

  public static async init(options: any = {}) {
    options.headers = options.headers || {};
    options.customFields = options.customFields || {};
    options.customFields.item = options.customFields.item || [];
    options.customFields.feed = options.customFields.feed || [];

    if (!options.maxRedirects) options.maxRedirects = this.DEFAULT_MAX_REDIRECTS;
    if (!options.timeout) options.timeout = this.DEFAULT_TIMEOUT;

    this.options = options;
    //this.xmlParser = new xml2js.Parser(this.options.xml2js);
  }

  public static async parse(xmlFeed: string, options?: any): Promise<any> {
    var p = new Promise<string>(async (resolve, reject) => {
      //ensure that we have some options
      options = options ? options : {};

      //we want the string items to not have to be an array
      var xmlParser = new Parser({explicitArray: false});

      //parse the xml
      xmlParser.parseString(xmlFeed, (err, result) => {
        //console.log("parser called");
        //console.log(result);

        if (err) return reject(err);
        if (!result) {
          return reject(new Error('Unable to parse XML.'));
        }

        let feed = null;
        if (result.feed) {
          feed = this.buildAtomFeed(result);
        }
        else if (result.rss && result.rss.$ && result.rss.$.version && result.rss.$.version.match(/^2/)) {
          feed = this.buildRSS2(result);
        }
        else if (result['rdf:RDF']) {
          feed = this.buildRSS1(result);
        }
        else if (result.rss && result.rss.$ && result.rss.$.version && result.rss.$.version.match(/0\.9/)) {
          feed = this.buildRSS0_9(result);
        }
        else if (result.rss && options.defaultRSS) {
          switch(options.defaultRSS) {
            case 0.9:
              feed = this.buildRSS0_9(result);
              break;
            case 1:
              feed = this.buildRSS1(result);
              break;
            case 2:
              feed = this.buildRSS2(result);
              break;
            default:
              return reject(new Error("default RSS version not recognized."));
          }
        }
        else {
          return reject(new Error("Feed not recognized as RSS 1 or 2."));
        }

        resolve(feed);
      });
    });
    return p;
  }

  private static buildAtomFeed(xmlObj) {
    let feed: any = {items: []};

    Utils.copyFromXML(xmlObj.feed, feed, this.options.customFields.feed);
    if (xmlObj.feed.link) {
      feed.link = Utils.getLink(xmlObj.feed.link, 'alternate', 0);
      feed.feedUrl = Utils.getLink(xmlObj.feed.link, 'self', 1);
    }

    if (xmlObj.feed.title) {
      let title = xmlObj.feed.title[0] || '';
      if (title._) title = title._;
      if (title) feed.title = title;
    }

    if (xmlObj.feed.updated) {
      feed.lastBuildDate = xmlObj.feed.updated[0];
    }

    (xmlObj.feed.entry || []).forEach(entry => {
      let item:any = {};
      Utils.copyFromXML(entry, item, this.options.customFields.item);

      if (entry.title) {
        let title = entry.title[0] || '';
        if (title._) {
          title = title._;
        }
        if (title) {
          item.title = title;
        }
      }
      if (entry.link && entry.link.length) {
        item.link = Utils.getLink(entry.link, 'alternate', 0);
      }

      if (entry.published && entry.published.length && entry.published[0].length) {
        item.pubDate = new Date(entry.published[0]).toISOString();
      }
      if (!item.pubDate && entry.updated && entry.updated.length && entry.updated[0].length) {
        item.pubDate = new Date(entry.updated[0]).toISOString();
      }
      if (entry.author && entry.author.length) {
        item.author = entry.author[0].name[0];
      }
      if (entry.content && entry.content.length) {
        item.content = Utils.getContent(entry.content[0]);
        item.contentSnippet = Utils.getSnippet(item.content);
      }

      if (entry.id) {
        item.id = entry.id[0];
      }

      this.setISODate(item);

      feed.items.push(item);
    });

    return feed;
  }

  public static buildRSS0_9(xmlObj) {
    var channel = xmlObj.rss.channel[0];
    var items = channel.item;
    return this.buildRSS(channel, items);
  }

  public static buildRSS1(xmlObj) {
    xmlObj = xmlObj['rdf:RDF'];
    let channel = xmlObj.channel[0];
    let items = xmlObj.item;
    return this.buildRSS(channel, items);
  }

  public static buildRSS2(xmlObj) {
    let channel:any = Array.isArray(xmlObj.rss.channel) ? xmlObj.rss.channel[0] : xmlObj.rss.channel;
    let items = channel.item;
    let feed = this.buildRSS(channel, items);
    if (xmlObj.rss.$ && xmlObj.rss.$['xmlns:itunes']) {
      this.decorateItunes(feed, channel);
    }
    return feed;
  }

  public static buildRSS(channel, items) {
    items = items || [];
    let feed: any = {
      items: [] as Array<any>
    };

    //set up lists of fields and items keys
    let feedFields: any = Fields.feed.concat(this.options.customFields.feed);
    let itemFields: any = Fields.item.concat(this.options.customFields.item);

    if (channel['atom:link']) feed.feedUrl = channel['atom:link'][0].$.href;

    //if there is an image, then get additional properties
    if (channel.image && channel.image[0] && channel.image[0].url) {
      feed.image = {};
      let image = channel.image[0];
      if (image.link) feed.image.link = image.link[0];
      if (image.url) feed.image.url = image.url[0];
      if (image.title) feed.image.title = image.title[0];
      if (image.width) feed.image.width = image.width[0];
      if (image.height) feed.image.height = image.height[0];
    }

    Utils.copyFromXML(channel, feed, feedFields);

    items.forEach(xmlItem => {
      let item: any = {};
      Utils.copyFromXML(xmlItem, item, itemFields);
      if (xmlItem.enclosure) {
        item.enclosure = xmlItem.enclosure[0].$;
      }
      if (xmlItem.description) {
        if (Array.isArray(xmlItem.description)) {
          item.content = Utils.getContent(xmlItem.description[0]);
        }
        else {
          item.content = Utils.getContent(xmlItem.description);
        }
        item.contentSnippet = Utils.getSnippet(item.content);
      }
      if (xmlItem.guid) {
        item.guid = Array.isArray(xmlItem.guid) ? xmlItem.guid[0] : xmlItem.guid;
        if (item.guid._) item.guid = item.guid._;
      }
      if (xmlItem.category) item.categories = xmlItem.category;
      this.setISODate(item);

      feed.items.push(item);
    });

    return feed;
  }

  /**
   * Add iTunes specific fields from XML to extracted JSON
   *
   * @access public
   * @param {object} feed extracted
   * @param {object} channel parsed XML
   */
  public static decorateItunes(feed, channel) {
    let items:any = channel.item || [];
    let entry:any = {};

    feed.itunes = {};

    if (channel['itunes:owner']) {
      let owner:any = {},
          image;

      if(channel['itunes:owner'][0]['itunes:name']) {
        owner.name = channel['itunes:owner'][0]['itunes:name'][0];
      }
      if(channel['itunes:owner'][0]['itunes:email']) {
        owner.email = channel['itunes:owner'][0]['itunes:email'][0];
      }
      if(channel['itunes:image']) {
        let hasImageHref = (channel['itunes:image'][0] &&
                              channel['itunes:image'][0].$ &&
                              channel['itunes:image'][0].$.href);
        image = hasImageHref ? channel['itunes:image'][0].$.href : null;
      }

      if(image) {
        feed.itunes.image = image;
      }
      feed.itunes.owner = owner;
    }

    Utils.copyFromXML(channel, feed.itunes, Fields.podcastFeed);

    items.forEach((item, index) => {
      entry = feed.items[index];
      entry.itunes = {};
      Utils.copyFromXML(item, entry.itunes, Fields.podcastItem);
      let image = item['itunes:image'];
      if (image && image[0] && image[0].$ && image[0].$.href) {
        entry.itunes.image = image[0].$.href;
      }
    });
  }

  public static setISODate(item) {
    let date = item.pubDate || item.date;
    if (date) {
      try {
        item.isoDate = new Date(date.trim()).toISOString();
      } catch (e) {
        // Ignore bad date format
      }
    }
  }
}
