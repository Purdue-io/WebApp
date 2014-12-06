var App = (function () {
    function App() {
        this.pageStack = new Array();
        App.instance = this;

        // Find the element where we'll keep pages
        this.pageContainer = document.querySelector("div.content div.pageContainer");

        var page = new LandingPage(this);
        this.pageStack.push(page);
        page.show();
    }
    /**
    * Handle initialization of the app
    */
    App.prototype.start = function () {
    };
    return App;
})();

window.onload = function () {
    new App();
};
//# sourceMappingURL=App.js.map
