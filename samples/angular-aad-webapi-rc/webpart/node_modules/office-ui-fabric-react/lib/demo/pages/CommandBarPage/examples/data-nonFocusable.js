"use strict";
exports.itemsNonFocusable = [
    {
        key: 'newItem',
        name: 'New',
        icon: 'Add',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: function () { return; },
        items: [
            {
                key: 'emailMessage',
                name: 'Email message',
                icon: 'Mail'
            },
            {
                key: 'calendarEvent',
                name: 'Calendar event',
                icon: 'Calendar'
            }
        ]
    },
    (_a = {
            key: 'upload',
            name: 'Upload',
            icon: 'Upload',
            onClick: function () { return; }
        },
        _a['data-automation-id'] = 'uploadNonFocusButton',
        _a
    )
];
exports.farItemsNonFocusable = [
    (_b = {
            key: 'saveStatus',
            name: 'Your page has been saved',
            icon: 'CheckMark'
        },
        _b['data-automation-id'] = 'saveStatusCheckMark',
        _b
    ),
    {
        key: 'publish',
        name: 'Publish',
        icon: 'ReadingMode',
        onClick: function () { return; }
    }
];
var _a, _b;

//# sourceMappingURL=data-nonFocusable.js.map
