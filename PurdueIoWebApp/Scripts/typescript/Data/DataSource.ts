class DataSource {
	public static APIURL: string;
	private username: string;
	private password: string;
	
	constructor() {

	}

	/**
	 * Authenticate to myPurdue and set credentials for future requests
	 * 
	 * @return Promise, resolved with boolean T success, F bad credentials. Rejected on request failure.
	 */
	public authenticate(username: string, password: string): Promise<boolean> {
		// TODO: Verify authentication
		return null;
	}

	/**
	 * Fetches an array of terms ordered reverse-chronologically
	 * @return Promise, resolved with Term Array or rejected on request failure
	 */
	public fetchTerms(): Promise<Array<Term>> {
		return JsonRequest.httpGet<Array<Term>>(DataSource.APIURL + "/odata/Terms?$orderby=StartDate%20desc");
	}

	/**
	 * Fetches a count of subjects that have classes listed in the given term
	 * @return Promise, resolved with number or rejected on request failure
	 */
	public fetchTermSubjectCount(term: Term): Promise<number> {
		return JsonRequest.httpGet<number>(DataSource.APIURL + "/odata/Subjects/$count/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20" + term.TermId + ")))");
	}

	/**
	 * Fetches a count of courses that have classes listed in the given term
	 * @return Promise, resolved with number or rejected on request failure
	 */
	public fetchTermCourseCount(term: Term): Promise<number> {
		return JsonRequest.httpGet<number>(DataSource.APIURL + "/odata/Courses/$count/?$filter=(Classes/any(c:%20c/Term/TermId%20eq%20" + term.TermId + "))");
	}
}

// Defining a default API url here - this can be overridden by Debug.ts
DataSource.APIURL = "http://api.purdue.io";