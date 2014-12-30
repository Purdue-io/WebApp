using System.Web;
using System.Web.Optimization;

namespace PurdueIoWebApp
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/javascript").Include("~/Scripts/es6-promise-2.0.1.js"));

			// Typescript
			var tsBundle = new ScriptBundle("~/bundles/typescript");

			// TS Core
			tsBundle.Include(
				"~/Scripts/typescript/Component.js",
				"~/Scripts/typescript/Animator.js",
				"~/Scripts/typescript/Page.js",
				"~/Scripts/typescript/Utility.js",
				"~/Scripts/typescript/App.js");

			// TS Data
			tsBundle.Include(
				"~/Scripts/typescript/Data/JsonRequest.js",
				"~/Scripts/typescript/Data/DataSource.js",
				"~/Scripts/typescript/Models/Term.js",
				"~/Scripts/typescript/Models/Subject.js",
				"~/Scripts/typescript/Models/Course.js",
				"~/Scripts/typescript/Models/CourseDetails.js",
				"~/Scripts/typescript/Models/ClassDetails.js",
				"~/Scripts/typescript/Models/SectionDetails.js",
				"~/Scripts/typescript/Models/MeetingDetails.js",
				"~/Scripts/typescript/Models/Instructor.js",
				"~/Scripts/typescript/Models/RoomDetails.js",
				"~/Scripts/typescript/Models/Building.js");

			// TS Components
			tsBundle.Include(
				"~/Scripts/typescript/Components/Dialog.js",
				"~/Scripts/typescript/Components/UserBar.js",
				"~/Scripts/typescript/Components/LogInDialog.js",
				"~/Scripts/typescript/Components/SubjectSelectionDialog.js",
				"~/Scripts/typescript/Components/SubjectCourseSelectionDialog.js",
				"~/Scripts/typescript/Components/GlobalProgressIndicator.js",
				"~/Scripts/typescript/Components/DataTiles.js");

			// TS Pages
			tsBundle.Include(
				"~/Scripts/typescript/Pages/TermSelectPage.js",
				"~/Scripts/typescript/Pages/LandingPage.js",
				"~/Scripts/typescript/Pages/SubjectPage.js",
				"~/Scripts/typescript/Pages/CoursePage.js");

#if DEBUG
			// Include debug JS if we're in debug mode (sets debug API URL, etc)
			tsBundle.Include("~/Scripts/typescript/DEBUG.js");
#endif

			bundles.Add(tsBundle);

			bundles.Add(new StyleBundle("~/Content/bundles/css").Include(
					  "~/Content/css/App.css", new CssRewriteUrlTransform()));

#if DEBUG
			BundleTable.EnableOptimizations = false;
#else
			BundleTable.EnableOptimizations = true;
#endif
		}
	}
}
