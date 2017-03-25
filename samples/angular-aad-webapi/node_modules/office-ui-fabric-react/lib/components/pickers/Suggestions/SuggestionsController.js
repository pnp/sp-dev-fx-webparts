"use strict";
var SuggestionsController = (function () {
    function SuggestionsController() {
        this.suggestions = [];
        this.currentIndex = -1;
    }
    SuggestionsController.prototype.updateSuggestions = function (newSuggestions) {
        if (newSuggestions && newSuggestions.length > 0) {
            this.suggestions = this._convertSuggestionsToSuggestionItems(newSuggestions);
            this.currentIndex = 0;
            this.suggestions[0].selected = true;
            this.currentSuggestion = this.suggestions[0];
        }
        else {
            this.suggestions = [];
            this.currentIndex = -1;
            this.currentSuggestion = undefined;
        }
    };
    /**
     * Increments the suggestion index and gets the next suggestion in the list.
     */
    SuggestionsController.prototype.nextSuggestion = function () {
        if (this.suggestions && this.suggestions.length) {
            if (this.currentIndex < (this.suggestions.length - 1)) {
                this._setSelectedSuggestion(this.currentIndex + 1);
                return true;
            }
            else if (this.currentIndex === (this.suggestions.length - 1)) {
                this._setSelectedSuggestion(0);
                return true;
            }
        }
        return false;
    };
    /**
     * Decrements the suggestion index and gets the previous suggestion in the list.
     */
    SuggestionsController.prototype.previousSuggestion = function () {
        if (this.suggestions && this.suggestions.length) {
            if (this.currentIndex > 0) {
                this._setSelectedSuggestion(this.currentIndex - 1);
                return true;
            }
            else if (this.currentIndex === 0) {
                this._setSelectedSuggestion(this.suggestions.length - 1);
                return true;
            }
        }
        return false;
    };
    SuggestionsController.prototype.getSuggestions = function () {
        return this.suggestions;
    };
    SuggestionsController.prototype.getCurrentItem = function () {
        return this.currentSuggestion;
    };
    SuggestionsController.prototype.getSuggestionAtIndex = function (index) {
        return this.suggestions[index];
    };
    SuggestionsController.prototype.hasSelectedSuggestion = function () {
        return this.currentSuggestion ? true : false;
    };
    SuggestionsController.prototype._convertSuggestionsToSuggestionItems = function (suggestions) {
        var converted = [];
        suggestions.forEach(function (suggestion) { return converted.push({ item: suggestion, selected: false }); });
        return converted;
    };
    SuggestionsController.prototype._setSelectedSuggestion = function (index) {
        if (index > this.suggestions.length - 1 || index < 0) {
            this.currentIndex = 0;
            this.currentSuggestion.selected = false;
            this.currentSuggestion = this.suggestions[0];
            this.currentSuggestion.selected = true;
        }
        else {
            if (this.currentIndex > -1) {
                this.suggestions[this.currentIndex].selected = false;
            }
            this.suggestions[index].selected = true;
            this.currentIndex = index;
            this.currentSuggestion = this.suggestions[index];
        }
    };
    return SuggestionsController;
}());
exports.SuggestionsController = SuggestionsController;

//# sourceMappingURL=SuggestionsController.js.map
