var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// This component base-class has a parent element it is inserted under.
// TODO: Pretty much all of it.
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(app, parentElement) {
        _super.call(this, app);
    }
    Page.prototype.show = function () {
        this.element = document.body.appendChild(this.element);
        this.animator.animate("in");
    };
    return Page;
})(Component);
//# sourceMappingURL=Page.js.map
