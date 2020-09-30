/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
(function () {
    var placeholderClassName = "placeholder" + Math.random()
        .toString()
        .substr(2, 8);
    function isTextEmpty(text) {
        return !text || !text.trim();
    }
    function addPlaceholder(ev) {
        var root = ev.editor.editable();
        var placeholder = ev.listenerData;
        if (root && placeholder && isTextEmpty(root.getText())) {
            root.setHtml(placeholder);
            root.addClass(placeholderClassName);
        }
    }
    function removePlaceholder(ev) {
        var editor = ev.editor;
        var root = editor.editable();
        if (root && root.hasClass(placeholderClassName)) {
            root.removeClass(placeholderClassName);
            // fill it properly
            // if <p> tag is allowed to be inserted, set HTML with it. Otherwise, set it as empty string.
            // tslint:disable-next-line: no-string-literal
            if (CKEDITOR.dtd[root.getName()]['p']) {
                root.setHtml('<p><br/></p>');
                var range = new CKEDITOR.dom.range(editor.document);
                range.moveToElementEditablePosition(root, true);
                editor.getSelection().selectRanges([range]);
            }
            else {
                root.setHtml('');
            }
        }
    }
    function handleSetData(ev) {
        var root = ev.editor.editable();
        if (!isTextEmpty(root.getText())) {
            root.removeClass(placeholderClassName);
        }
        else {
            // if data is empty, set it to the placeholder
            addPlaceholder(ev);
        }
    }
    function handleGetData(ev) {
        var element = ev.editor.editable();
        if (element && element.hasClass(placeholderClassName)) {
            ev.data.dataValue = '';
        }
    }
    CKEDITOR.plugins.add('placeholdertext', {
        onLoad: function () {
            if (CKEDITOR.addCss) {
                CKEDITOR.addCss("." + placeholderClassName + "{ color: #666; }"); // neutralSecondary
            }
        },
        init: function (editor) {
            // Get the placeholder from the replaced element or from the configuration
            var placeholder = editor.element.getAttribute('placeholder') || editor.config.placeholder;
            if (placeholder) {
                // Watch for the calls to getData to remove the placeholder
                editor.on('getData', handleGetData);
                // Watch for setData to remove placeholder class
                editor.on('setData', handleSetData, undefined, placeholder);
                editor.on('blur', addPlaceholder, undefined, placeholder);
                editor.on('contentDom', addPlaceholder, undefined, placeholder);
                editor.on('focus', removePlaceholder);
                editor.on('beforeModeUnload', removePlaceholder);
            }
        }
    });
})();
//# sourceMappingURL=plugin.js.map