class App {
	public static instance: App;
	constructor() {
		App.instance = this;
	}
}