class LogInDialog extends Dialog {
	private processing: boolean;

	constructor(app: App) {
		this.processing = false;
		var logInAction = new DialogAction();
		logInAction.action = () => {
			this.logIn();
		};
		logInAction.text = "Log In";
		var cancelAction = new DialogAction();
		cancelAction.action = () => {
			this.hide();
		};
		cancelAction.text = "Cancel";
		super(app, "Log In", "", [cancelAction, logInAction]);
		this.setContent('<h2>Disclaimer</h2><p>Purdue.io and its API do not store your credentials for any amount of time. '
			+ 'Your credentials are only stored in your browser for your current session, and are cleared when you close this site. '
			+ 'Credentials are only used for fetching class schedule, adding, and dropping class sections. '
			+ 'Purdue.io will not use your credentials for any other purpose. By logging in, you accept that you use this system at your own risk. '
			+ '</p><form><input type="text" placeholder="User Name" /><br /><input type="password" placeholder="Password" /><br /><input type="submit" style="opacity:0;height:0;width:0;" tabindex="-1" /></form>');
	}

	public show(): void {
		super.show();
		(<HTMLElement>this.element.querySelector("form")).addEventListener("submit", (ev) => {
			ev.preventDefault();
			this.logIn();
		});
		(<HTMLInputElement>this.element.querySelector("form input")).focus();
	}

	public logIn(): void {
		if (this.processing) {
			return;
		}
		this.processing = true;
		var username = (<HTMLInputElement>this.element.querySelector("form input[type=text]")).value;
		var password = (<HTMLInputElement>this.element.querySelector("form input[type=password]")).value;
		this.getApp().progressIndicator.pushWork();
		this.getApp().dataSource.authenticate(username, password).then((success) => {
			this.hide();
			this.getApp().userBar.loadUserData();
			this.getApp().progressIndicator.popWork();
		}, () => {
			alert("Error authenticating!");
			this.processing = false;
			this.getApp().progressIndicator.popWork();
		});
	}
}