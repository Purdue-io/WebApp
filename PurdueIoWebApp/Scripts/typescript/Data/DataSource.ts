class DataSource {
	public static APIURL: string;
	public username: string;
	public password: string;
	
	constructor() {

	}

	/**
	 * Authenticate to myPurdue and set credentials for future requests
	 * @return Promise, resolved with boolean T success. Rejected on request failure.
	 */
	public authenticate(username: string, password: string): Promise<string> {
		return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
			JsonRequest.httpGet<string>(DataSource.APIURL + '/Students/Authenticate', username, password).then((success) => {
				this.username = username;
				this.password = password;
				resolve("Authenticated");
			}, (error) => {
				reject();
			});
		});
	}

	/**
	 * Fetches an array of terms ordered reverse-chronologically
	 * @return Promise, resolved with Term Array or rejected on request failure
	 */
	public fetchTerms(): Promise<Array<Term>> {
		return JsonRequest.httpGet<Array<Term>>(DataSource.APIURL + "/odata/Terms?$orderby=StartDate%20desc");
	}

	/**
	 * Fetches an array of subjects ordered by abbreviation in the given term
	 * @return Promise, resolved with Subject Array or rejected on failure
	 */
	public fetchTermSubjects(term: Term): Promise<Array<Subject>> {
		return JsonRequest.httpGet<Array<Subject>>(DataSource.APIURL + "/odata/Subjects/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20" + term.TermId + ")))&$orderby=Abbreviation%20asc");
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

	/**
	 * Fetches a count of sections that belong to classes listed in the given term
	 * @return Promise, resolved with number or rejected on request failure
	 */
	public fetchTermSectionCount(term: Term): Promise<number> {
		return JsonRequest.httpGet<number>(DataSource.APIURL + "/odata/Sections/$count/?$filter=(Class/Term/TermId%20eq%20" + term.TermId + ")");
	}

	/**
	 * Fetches a count of full sections that belong to classes listed in the given term
	 * @return Promise, resolved with number or rejected on request failure
	 */
	public fetchTermFilledSectionCount(term: Term): Promise<number> {
		return JsonRequest.httpGet<number>(DataSource.APIURL + "/odata/Sections/$count/?$filter=((Class/Term/TermId%20eq%20" + term.TermId + ")%20and%20(RemainingSpace%20eq%200))");
	}

	/**
	 * Fetches a count of courses in a particular subject and term
	 * @return Promise, resolved with number or rejected on request failure
	 */
	public fetchTermSubjectCoursesCount(term: Term, subject: Subject): Promise<number> {
		return JsonRequest.httpGet<number>(DataSource.APIURL + "/odata/Courses/$count/?$filter=(Classes/any(c:%20c/Term/TermId%20eq%20" + term.TermId + "))%20and%20Subject/SubjectId%20eq%20" + subject.SubjectId);
	}

	/**
	 * Fetches an array of courses in a particular subject and term
	 * @return Promise, resolved with array of Courses or rejected on request failure
	 */
	public fetchTermSubjectCourses(term: Term, subject: Subject): Promise<Array<Course>> {
		return JsonRequest.httpGet<Array<Course>>(DataSource.APIURL + "/odata/Courses/?$filter=(Classes/any(c:%20c/Term/TermId%20eq%20" + term.TermId + "))%20and%20Subject/SubjectId%20eq%20" + subject.SubjectId + "&$orderby=Number%20asc");
	}

	/**
	 * Fetches a count of instructors in a particular subject and term
	 * @return Promise, resolved with number or rejected on request failure
	 */
	public fetchTermSubjectInstructorsCount(term: Term, subject: Subject): Promise<number> {
		return JsonRequest.httpGet<number>(DataSource.APIURL + "/odata/Instructors/$count/?$filter=(Meetings/any(m:%20m/Section/Class/Course/Subject/SubjectId%20eq%20" + subject.SubjectId + "%20and%20m/Section/Class/Term/TermId%20eq%20" + term.TermId + "))");
	}

	/**
	 * Fetches details on a particular course (all navigational properties expanded)
	 * @return Promise, resolved with CourseDetails or rejected on request failure
	 */
	public fetchCourseDetails(course: Course): Promise<CourseDetails> {
		return JsonRequest.httpGet<CourseDetails>(DataSource.APIURL + "/odata/Courses(" + course.CourseId + ")?$expand=Subject,Classes($expand=Term,Sections($expand=Meetings($expand=Instructors,Room($expand=Building))))");
	}
}

// Defining a default API url here - this can be overridden by Debug.ts
DataSource.APIURL = "//api.purdue.io";