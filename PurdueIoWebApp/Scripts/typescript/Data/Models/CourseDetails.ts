class CourseDetails {
	public CourseId: string;
	public Title: string;
	public Number: string;
	public Description: string;
	public CreditHours: number;

	public Subject: Subject;

	public Classes: Array<ClassDetails>;
} 