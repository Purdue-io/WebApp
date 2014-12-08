var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* GlobalProgressIndicator Component
* This component is responsible for rendering the indeterminate progress bar
* at the top of the page when work is happening.
*/
var GlobalProgressIndicator = (function (_super) {
    __extends(GlobalProgressIndicator, _super);
    function GlobalProgressIndicator(app) {
        this.componentId = "GlobalProgressIndicator";
        this.workItems = 0;
        _super.call(this, app);
    }
    /**
    * Push a 'work item' on to the progress bar queue.
    * This will cause the progress bar to appear if there
    * is no existing work.
    */
    GlobalProgressIndicator.prototype.pushWork = function () {
        if (this.workItems < 0) {
            // Work items should never be below zero.
            this.workItems = 0;
        }
        if (this.workItems == 0) {
            // We are adding the first work item; show the bar
            this.element.classList.remove("closed");
        }
        this.workItems++;
    };

    /**
    * Pop a 'work item' from the progress bar queue.
    * This will cause the progress bar to retract if
    * there is no remaining work.
    */
    GlobalProgressIndicator.prototype.popWork = function () {
        if (this.workItems == 1) {
            // We are popping the last work item; hide the bar
            this.element.classList.add("closed");
        }
        this.workItems--;
        if (this.workItems < 0) {
            // Work items should never be below zero.
            this.workItems = 0;
        }
    };
    return GlobalProgressIndicator;
})(Component);
//# sourceMappingURL=GlobalProgressIndicator.js.map
