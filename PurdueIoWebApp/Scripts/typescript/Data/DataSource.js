var DataSource = (function () {
    function DataSource() {
    }
    /**
    * Authenticate to myPurdue and set credentials for future requests
    *
    * @return Promise, resolved with boolean T success, F bad credentials. Rejected on request failure.
    */
    DataSource.prototype.authenticate = function (username, password) {
        // TODO: Verify authentication
        return null;
    };

    /**
    * Fetches an array of terms ordered reverse-chronologically
    * @return Promise, resolved with Term Array or rejected on request failure
    */
    DataSource.prototype.fetchTerms = function () {
        return JsonRequest.httpGet(DataSource.APIURL + "/odata/Terms?$orderby=StartDate%20desc");
    };

    /**
    * Fetches a count of subjects that have classes listed in the given term
    * @return Promise, resolved with number or rejected on request failure
    */
    DataSource.prototype.fetchTermSubjectCount = function (term) {
        return JsonRequest.httpGet(DataSource.APIURL + "/odata/Subjects/$count/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20" + term.TermId + ")))");
    };

    /**
    * Fetches a count of courses that have classes listed in the given term
    * @return Promise, resolved with number or rejected on request failure
    */
    DataSource.prototype.fetchTermCourseCount = function (term) {
        return JsonRequest.httpGet(DataSource.APIURL + "/odata/Courses/$count/?$filter=(Classes/any(c:%20c/Term/TermId%20eq%20" + term.TermId + "))");
    };
    return DataSource;
})();

// Defining a default API url here - this can be overridden by Debug.ts
DataSource.APIURL = "http://api.purdue.io";
//# sourceMappingURL=DataSource.js.map
