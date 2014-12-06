class App {
	public static instance: App; // Singleton app static reference.
	public pageContainer: HTMLElement; // This is the element where pages will be rendered.
	public pageStack: Array<Page> = new Array<Page>(); // Keeps track of pages for back stack.

	constructor() {
		App.instance = this;
		// Find the element where we'll keep pages
		this.pageContainer = <HTMLElement>document.querySelector("div.content div.pageContainer");

		var page = new LandingPage(this);
		this.pageStack.push(page);
		page.show();
	}

	/**
	 * Handle initialization of the app
	 */
	public start() {

	}
}

window.onload = () => {
	new App();
};