class SectionExpanded {
	public SectionId: string;
	public CRN: string;
	public Type: string;
	public RegistrationStatus: string;
	public StartDate: Date;
	public EndDate: Date;
	public Capacity: number;
	public Enrolled: number;
	public RemainingSpace: number;
	public WaitlistCapacity: number;
	public WaitlistCount: number;
	public WaitlistSpace: number;

	public Class: ClassExpanded;
	public Meetings: Array<MeetingDetails>;
}