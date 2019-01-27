export class Fields {
  public static feed = [
    ['author', 'creator'],
    ['dc:publisher', 'publisher'],
    ['dc:creator', 'creator'],
    ['dc:source', 'source'],
    ['dc:title', 'title'],
    ['dc:type', 'type'],
    'title',
    'description',
    'author',
    'pubDate',
    'webMaster',
    'managingEditor',
    'generator',
    'link',
    'language',
    'copyright',
    'lastBuildDate',
    'docs',
    'generator',
    'ttl',
    'rating',
    'skipHours',
    'skipDays',
  ];

  public static item = [
    ['author', 'creator'],
    ['dc:creator', 'creator'],
    ['dc:date', 'date'],
    ['dc:language', 'language'],
    ['dc:rights', 'rights'],
    ['dc:source', 'source'],
    ['dc:title', 'title'],
    'title',
    'link',
    'pubDate',
    'author',
    'content:encoded',
    'enclosure',
    'dc:creator',
    'dc:date',
    'comments',
  ];

  public static mapItunesField(f) {
    return ['itunes:' + f, f];
  }

  public static podcastFeed = ([
    'author',
    'subtitle',
    'summary',
    'explicit'
  ]).map(Fields.mapItunesField);

  public static podcastItem = ([
    'author',
    'subtitle',
    'summary',
    'explicit',
    'duration',
    'image',
    'episode',
    'image',
    'season',
    'keywords',
  ]).map(Fields.mapItunesField);
}
