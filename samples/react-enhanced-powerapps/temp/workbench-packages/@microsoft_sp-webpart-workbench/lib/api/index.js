"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPublic_1 = require("./getPublic");
const WorkbenchPage_1 = require("./WorkbenchPage");
const workbenchPage = new WorkbenchPage_1.WorkbenchPage();
// tslint:disable-next-line:export-name
exports.default = {
    '/workbench': workbenchPage.handleWorkbenchRequest,
    '*/*': getPublic_1.default
};
//# sourceMappingURL=index.js.map