/**
 * This class is responsible for initializing the app
 * And tying core data and elements together.
 */
class App {
	public static instance: App; // Singleton app static reference.
	public selectedTerm: Term;
	public dataSource: DataSource; 
	public pageContainer: HTMLElement; // This is the element where pages will be rendered.
	public navElement: HTMLElement; // DOM element to display backstack
	public pageStack: Array<Page> = new Array<Page>(); // Keeps track of pages for back stack.
	public progressIndicator: GlobalProgressIndicator; 

	constructor() {
		// Update singleton static reference
		App.instance = this;

		// Instantiate data source
		this.dataSource = new DataSource();

		// Find the element we'll use to display the backstack nav
		this.navElement = <HTMLElement>document.querySelector("header ul");

		// Find the element where we'll keep pages
		this.pageContainer = <HTMLElement>document.querySelector("div.content div.pageContainer");

		// Instantiate core components
		this.progressIndicator = new GlobalProgressIndicator(this);
	}

	/**
	 * Handle initialization of the app
	 */
	public start() {
		// Show core components
		this.progressIndicator.show();

		// Get our term list
		this.progressIndicator.pushWork();
		this.dataSource.fetchTerms().then((terms: Array<Term>) => {
			if (terms.length > 0) {
				this.selectedTerm = terms[0];
				var landing = new LandingPage(this, this.selectedTerm);
				this.navigate(landing);
			} else {
				alert("ERROR: No terms found.");
			}
			this.progressIndicator.popWork();
		}, (error) => {
			alert("Error fetching terms from server: " + error);
			this.progressIndicator.popWork();
		});
	}

	/**
	 * Navigates to a new page, adding it to the back-stack and displaying it.
	 * 
	 * @param page The page to navigate to
	 */
	public navigate(page: Page) {
		// Add an element in the back-stack for this page
		var backstackElement = document.createElement("li");
		backstackElement.innerHTML = page.pageTitle;
		this.navElement.appendChild(backstackElement);

		if (this.pageStack.length > 0) {
			this.pageStack[this.pageStack.length - 1].hide(); // Hide last page on stack
		}

		this.pageStack.push(page);
		page.show(); // Show the new page
	}
}

window.onload = () => {
	new App();
	App.instance.start();
};