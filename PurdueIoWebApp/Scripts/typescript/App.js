/**
* This class is responsible for initializing the app
* And tying core data and elements together.
*/
var App = (function () {
    function App() {
        this.pageStack = new Array();
        // Update singleton static reference
        App.instance = this;

        // Instantiate data source
        this.dataSource = new DataSource();

        // Find the element we'll use to display the backstack nav
        this.navElement = document.querySelector("header ul");

        // Find the element where we'll keep pages
        this.pageContainer = document.querySelector("div.content div.pageContainer");

        // Instantiate core components
        this.progressIndicator = new GlobalProgressIndicator(this);
    }
    /**
    * Handle initialization of the app
    */
    App.prototype.start = function () {
        var _this = this;
        // Show core components
        this.progressIndicator.show();

        // Get our term list
        this.progressIndicator.pushWork();
        this.dataSource.fetchTerms().then(function (terms) {
            if (terms.length > 0) {
                _this.selectedTerm = terms[0];
                var landing = new LandingPage(_this, _this.selectedTerm);
                _this.navigate(landing);
            } else {
                alert("ERROR: No terms found.");
            }
            _this.progressIndicator.popWork();
        }, function (error) {
            alert("Error fetching terms from server: " + error);
            _this.progressIndicator.popWork();
        });
    };

    /**
    * Navigates to a new page, adding it to the back-stack and displaying it.
    *
    * @param page The page to navigate to
    */
    App.prototype.navigate = function (page) {
        // Add an element in the back-stack for this page
        var backstackElement = document.createElement("li");
        backstackElement.innerHTML = page.pageTitle;
        this.navElement.appendChild(backstackElement);

        if (this.pageStack.length > 0) {
            this.pageStack[this.pageStack.length - 1].hide(); // Hide last page on stack
        }

        this.pageStack.push(page);
        page.show(); // Show the new page
    };
    return App;
})();

window.onload = function () {
    new App();
    App.instance.start();
};
//# sourceMappingURL=App.js.map
