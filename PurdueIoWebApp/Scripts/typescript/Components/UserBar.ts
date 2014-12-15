class UserBar extends Component {
	constructor(app: App) {
		this.componentId = "UserBar";
		super(app);
	}

	public show() {
		if (typeof this.getApp().dataSource.username === 'undefined') {
			var loginLink = document.createElement("a");
			loginLink.innerHTML = "Log In";
			loginLink.addEventListener("click", () => {
				(new LogInDialog(this.getApp())).show();
			});
			(<HTMLElement>this.element.querySelector("h1.username")).innerHTML = "";
			(<HTMLElement>this.element.querySelector("h1.username")).appendChild(loginLink);
		} else {
			(<HTMLElement>this.element.querySelector("h1.username")).innerHTML = this.getApp().dataSource.username;
		}
		super.show();
	}
} 