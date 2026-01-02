"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to parse the RSS feed
const parseRss = (rss) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rss, 'text/xml');
    const items = Array.from(xmlDoc.querySelectorAll('item'));
    return items.map(item => {
        var _a, _b, _c, _d, _e, _f, _g;
        const pubDate = ((_a = item.querySelector('pubDate')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        const date = new Date(pubDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
        const day = ('0' + date.getDate()).slice(-2);
        const shortDate = `${year}-${month}-${day}`;
        const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${year}`;
        const isoDate = date.toISOString();
        let category = ((_b = item.querySelector('category')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        category = category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return {
            title: ((_c = item.querySelector('title')) === null || _c === void 0 ? void 0 : _c.textContent) || '',
            description: ((_d = item.querySelector('description')) === null || _d === void 0 ? void 0 : _d.textContent) || '',
            link: ((_e = item.querySelector('link')) === null || _e === void 0 ? void 0 : _e.textContent) || '',
            category: category,
            pubDate: formattedDate,
            shortDate: shortDate,
            isoDate: isoDate,
            mediaContentUrl: ((_f = item.querySelector('content')) === null || _f === void 0 ? void 0 : _f.getAttribute('url')) || '',
            author: ((_g = item.querySelector('creator')) === null || _g === void 0 ? void 0 : _g.textContent) || 'PnP Community'
        };
    });
};
// Function to create a div for an RSS item
const createRSSPost = (item, template) => {
    const li = document.createElement('li');
    for (const key in item) {
        const regex = new RegExp(`{{${key}\\s*(\\|\\s*safeHTML)?}}`, 'g');
        const value = item[key] || '';
        const safeValue = safeHTML(value);
        template = template.replace(regex, (_match, p1) => p1 ? safeValue : value);
    }
    li.innerHTML = template;
    return li;
};
const safeHTML = (str) => {
    return encodeURIComponent(str);
};
// Function to fetch and display the RSS feed
const displayRss = () => __awaiter(void 0, void 0, void 0, function* () {
    const rssFeedUrl = window.rssFeedUrl;
    const response = yield fetch(rssFeedUrl);
    const rss = yield response.text();
    const items = parseRss(rss).slice(0, 4);
    const section = document.querySelector('#rss-section');
    const templateResponse = yield fetch('templates/blog-item.html');
    const template = yield templateResponse.text();
    items.forEach(item => {
        const div = createRSSPost(item, template);
        if (section) {
            section.appendChild(div);
        }
    });
});
// Call the function when the page loads
window.addEventListener('DOMContentLoaded', displayRss);
