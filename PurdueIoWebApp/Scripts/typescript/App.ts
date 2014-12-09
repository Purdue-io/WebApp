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

		// Initialize back stack
		this.pageStack = new Array<Page>();
	}

	/**
	 * Handle initialization of the app
	 */
	public start() {
		// Show core components
		this.progressIndicator.show();

		// Add a term select page to our back-stack
		this.navigate(new TermSelectPage(this), true);

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
	 * Navigates back to a particular page in the back-stack
	 * @page The page (present in the back-stack) to return to
	 */
	public navigateBackTo(page: Page) {
		var stackIndex: number = this.pageStack.indexOf(page);

		// Don't do anything if this page is already showing.
		if (stackIndex == this.pageStack.length - 1) {
			return;
		}

		this.pageStack[this.pageStack.length - 1].hide(); // Hide last page on stack
		this.pageStack.splice(stackIndex + 1, this.pageStack.length - (stackIndex + 1)); // Remove pages from back stack

		// Remove pages from nav
		var backstackNavElements = this.navElement.querySelectorAll("li");
		for (var i = backstackNavElements.length - 1; i > stackIndex; i--) {
			backstackNavElements[i].parentNode.removeChild(backstackNavElements[i]);
		}

		// Show last page on stack
		this.pageStack[this.pageStack.length - 1].show();
	}

	/**
	 * Navigates to a new page, adding it to the back-stack and displaying it.
	 * @param page The page to navigate to
	 * @param hidden If true, the page will not be displayed once added to the back stack
	 */
	public navigate(page: Page, hidden?: boolean) {
		if (this.pageStack.length > 0) {
			this.pageStack[this.pageStack.length - 1].hide(); // Hide last page on stack
		}
		this.pageStack.push(page);

		// Add an element in the back-stack for this page
		var backstackElement = document.createElement("li");
		backstackElement.innerHTML = page.pageTitle;
		backstackElement.classList.add("animated");
		backstackElement.addEventListener("click", () => {
			this.navigateBackTo(page);
		});
		this.navElement.appendChild(backstackElement);
		Animator.animateElement(backstackElement, "anim-shove-in-left");
		if (typeof hidden === 'undefined' || hidden == false) {
			page.show(); // Show the new page
		}
	}
}

window.onload = () => {
	new App();
	App.instance.start();
};