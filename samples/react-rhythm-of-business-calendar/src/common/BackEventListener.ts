import { Guid } from "@microsoft/sp-core-library";

export class BackEventListener {
    private readonly _historyStateInstance = { id: Guid.newGuid().toString() };

    constructor(
        private readonly _onBackPressed: () => void
    ) {
        window.addEventListener('popstate', this._popStateHandler);
    }

    public cleanup() {
        window.removeEventListener('popstate', this._popStateHandler);
    }

    private readonly _popStateHandler = (ev: PopStateEvent) => {
        this._onBackPressed();
    }

    public listenForBack() {
        if (!this._isCurrentHistoryState()) {
            window.history.pushState(this._historyStateInstance, '');
        }
    }

    public cancelListeningForBack() {
        if (this._isCurrentHistoryState())
            window.history.back();
    }

    private _isCurrentHistoryState(): boolean {
        return window.history.state?.id === this._historyStateInstance.id;
    }
}