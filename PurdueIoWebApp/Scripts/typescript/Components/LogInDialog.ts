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
		this.setContent('<form><input type="text" placeholder="User Name" /><br /><input type="password" placeholder="Password" /></form>');
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
			this.getApp().progressIndicator.popWork();
		}, () => {
			alert("Error authenticating!");
			this.processing = false;
			this.getApp().progressIndicator.popWork();
		});
	}
}