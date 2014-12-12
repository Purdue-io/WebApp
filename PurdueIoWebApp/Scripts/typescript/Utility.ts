interface Date {
	toLocaleString(lang: any, options: any); // we shouldn't need this, but something's weird here.
}

class Utility {
	public static IsDate(d: Date): boolean {
		if (Object.prototype.toString.call(d) === "[object Date]") {
			// it is a date
			if (isNaN(d.getTime())) {  // d.valueOf() could also work
				return false;
			}
			else {
				return true;
			}
		}
		else {
			return false;
		}
	}
}