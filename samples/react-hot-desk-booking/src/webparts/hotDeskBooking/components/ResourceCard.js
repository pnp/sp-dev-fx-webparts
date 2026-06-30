import * as React from "react";
import { Card, Stack, Text, PrimaryButton, Badge } from "@fluentui/react";
import BookingForm from "./BookingForm";
import styles from "./HotDeskBooking.module.scss";
var ResourceCard = function (_a) {
    var resource = _a.resource, onBookingCreated = _a.onBookingCreated, bookingService = _a.bookingService;
    var _b = React.useState(false), showForm = _b[0], setShowForm = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { className: styles.resourceCard },
            React.createElement(Stack, { tokens: { childrenGap: 12 } },
                React.createElement(Stack, { horizontal: true, horizontalAlign: "space-between" },
                    React.createElement(Text, { variant: "large", className: styles.resourceTitle }, resource.title),
                    React.createElement(Badge, { appearance: "primary", size: "large" }, resource.resourceType)),
                resource.location && (React.createElement(Text, { variant: "small" },
                    React.createElement("strong", null, "Location:"),
                    " ",
                    resource.location)),
                resource.description && (React.createElement(Text, { variant: "small" }, resource.description)),
                React.createElement(Stack, { horizontal: true, tokens: { childrenGap: 8 } },
                    React.createElement(PrimaryButton, { text: "Book", onClick: function () { return setShowForm(true); }, className: styles.bookButton })))),
        showForm && (React.createElement(BookingForm, { isOpen: showForm, resource: resource, onDismiss: function () { return setShowForm(false); }, onSubmitted: onBookingCreated, bookingService: bookingService }))));
};
export default ResourceCard;
//# sourceMappingURL=ResourceCard.js.map