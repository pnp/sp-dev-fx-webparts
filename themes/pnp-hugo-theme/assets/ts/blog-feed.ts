// Function to parse the RSS feed
const parseRss = (rss: string): RssItem[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rss, 'text/xml');
    const items = Array.from(xmlDoc.querySelectorAll('item'));
    return items.map(item => {
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const date = new Date(pubDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
        const day = ('0' + date.getDate()).slice(-2);
        const shortDate = `${year}-${month}-${day}`;
        const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${year}`;
        const isoDate = date.toISOString();

        let category = item.querySelector('category')?.textContent || '';
        category = category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        return {
            title: item.querySelector('title')?.textContent || '',
            description: item.querySelector('description')?.textContent || '',
            link: item.querySelector('link')?.textContent || '',
            category: category,
            pubDate: formattedDate,
            shortDate: shortDate,
            isoDate: isoDate,
            mediaContentUrl: item.querySelector('content')?.getAttribute('url') || '',
            author: item.querySelector('creator')?.textContent || 'PnP Community'
        };
    });
};

// Function to create a div for an RSS item
const createRSSPost = (item: RssItem, template: string): HTMLLIElement => {
    const li = document.createElement('li');

    for (const key in item) {
        const regex = new RegExp(`{{${key}\\s*(\\|\\s*safeHTML)?}}`, 'g');
        const value = item[key as keyof RssItem] || '';
        const safeValue = safeHTML(value);
        template = template.replace(regex, (_match, p1) => p1 ? safeValue : value);
    }

    li.innerHTML = template;
    return li;

};

const safeHTML = (str: string): string => {
    return encodeURIComponent(str);
};

// Function to fetch and display the RSS feed
const displayRss = async (): Promise<void> => {
    const rssFeedUrl = (window as any).rssFeedUrl;

    const response = await fetch(rssFeedUrl);
    const rss = await response.text();
    const items = parseRss(rss).slice(0, 4);
    const section = document.querySelector('#rss-section');

    const templateResponse = await fetch('templates/blog-item.html');
    const template = await templateResponse.text();

    items.forEach(item => {
        const div = createRSSPost(item, template);
        if (section) {
            section.appendChild(div);
        }
    });
};

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', displayRss);