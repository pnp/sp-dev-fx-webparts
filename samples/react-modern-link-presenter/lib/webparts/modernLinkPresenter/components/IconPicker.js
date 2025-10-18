import * as React from 'react';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
var ICON_OPTIONS = [
    { key: '', text: 'None' },
    { key: 'Link', text: 'Link' },
    { key: 'Globe', text: 'Globe' },
    { key: 'Mail', text: 'Mail' },
    { key: 'Document', text: 'Document' },
    { key: 'Share', text: 'Share' },
    { key: 'FavoriteStar', text: 'FavoriteStar' },
    { key: 'Home', text: 'Home' },
    { key: 'NavigateExternalInline', text: 'NavigateExternalInline' },
    { key: 'OpenInNewTab', text: 'OpenInNewTab' },
    { key: 'World', text: 'World' },
    { key: 'ReadingMode', text: 'ReadingMode' },
    { key: 'Page', text: 'Page' },
    { key: 'People', text: 'People' },
    { key: 'Contact', text: 'Contact' },
    { key: 'Phone', text: 'Phone' },
    { key: 'Chat', text: 'Chat' },
    { key: 'TeamsLogo', text: 'TeamsLogo' },
    { key: 'SkypeLogo', text: 'SkypeLogo' },
    { key: 'Settings', text: 'Settings' },
    { key: 'Info', text: 'Info' },
    { key: 'Help', text: 'Help' },
    { key: 'Warning', text: 'Warning' },
    { key: 'Error', text: 'Error' },
    { key: 'CheckMark', text: 'CheckMark' },
    { key: 'ChevronRight', text: 'ChevronRight' },
    { key: 'ChevronDown', text: 'ChevronDown' },
    { key: 'ChevronUp', text: 'ChevronUp' },
    { key: 'ChevronLeft', text: 'ChevronLeft' },
];
export var IconPicker = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement(Dropdown, { options: ICON_OPTIONS, selectedKey: value || '', onChange: function (_, option) { return onChange(option === null || option === void 0 ? void 0 : option.key); }, style: { minWidth: 120 } }),
        value && React.createElement(Icon, { iconName: value, style: { fontSize: 20 } })));
};
//# sourceMappingURL=IconPicker.js.map