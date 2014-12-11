class MeetingDetails {
	public MeetingId: string;
	public Type: string;
	public DaysOfWeek: string;
	public StartTime: string;
	public Duration: string;
	public StartDate: string;
	public EndDate: string;
	public Instructors: Array<Instructor>;
	public Room: RoomDetails;
} 