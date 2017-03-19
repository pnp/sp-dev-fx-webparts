"use strict";
var LOREM_IPSUM = ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
    'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
    'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
    'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ' +
    'mollit anim id est laborum').split(' ');
var DATA = {
    'color': ['red', 'blue', 'green', 'yellow'],
    'shape': ['circle', 'square', 'triangle'],
    'location': ['Seattle', 'New York', 'Chicago', 'Los Angeles', 'Portland']
};
function createListItems(count, startIndex) {
    if (startIndex === void 0) { startIndex = 0; }
    return Array.apply(null, Array(count)).map(function (item, index) {
        var size = 150 + Math.round(Math.random() * 100);
        return {
            thumbnail: "//placehold.it/" + size + "x" + size,
            key: 'item-' + (index + startIndex) + ' ' + lorem(4),
            name: lorem(5),
            description: lorem(10 + Math.round(Math.random() * 50)),
            color: _randWord(DATA.color),
            shape: _randWord(DATA.shape),
            location: _randWord(DATA.location),
            width: size,
            height: size
        };
    });
}
exports.createListItems = createListItems;
function createGroups(groupCount, groupDepth, startIndex, itemsPerGroup, level, key) {
    key = key ? key + '-' : '';
    level = level ? level : 0;
    var count = Math.pow(itemsPerGroup, groupDepth);
    return Array.apply(null, Array(groupCount)).map(function (value, index) {
        return {
            count: count,
            key: 'group' + key + index,
            name: 'group ' + key + index,
            startIndex: index * count + startIndex,
            level: level,
            children: groupDepth > 1 ?
                createGroups(groupCount, groupDepth - 1, index * count + startIndex, itemsPerGroup, level + 1, key + index) :
                []
        };
    });
}
exports.createGroups = createGroups;
function lorem(wordCount) {
    return Array.apply(null, Array(wordCount))
        .map(function (item) { return _randWord(LOREM_IPSUM); })
        .join(' ');
}
exports.lorem = lorem;
function isGroupable(key) {
    return key === 'color' ||
        key === 'shape' ||
        key === 'location';
}
exports.isGroupable = isGroupable;
function _randWord(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

//# sourceMappingURL=data.js.map
