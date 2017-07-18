"use strict";
var CustomFileChange = (function () {
    function CustomFileChange($parse) {
        var _this = this;
        this.$parse = $parse;
        this.restrict = "A";
        this.link = function (scope, element, attrs) {
            var model = _this.$parse(attrs.customFileChange);
            var modelSetter = model.assign;
            element.bind("change", function () {
                scope.$apply(function () {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        var fileModel = {
                            fileName: element[0].files[0].name,
                            fileAsBuffer: event.target.result
                        };
                        modelSetter(scope, fileModel);
                    };
                    reader.onerror = function (event) {
                        alert(event.target.error);
                    };
                    reader.readAsArrayBuffer(element[0].files[0]);
                });
            });
        };
    }
    CustomFileChange.factory = function () {
        var directive = function ($parse) { return new CustomFileChange($parse); };
        directive.$inject = ['$parse'];
        return directive;
    };
    return CustomFileChange;
}());
exports.CustomFileChange = CustomFileChange;

//# sourceMappingURL=customFileChange.js.map
