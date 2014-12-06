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

			bundles.Add(new ScriptBundle("~/bundles/typescript").Include(
						"~/Scripts/typescript/Component.js",
						"~/Scripts/typescript/Animator.js",
						"~/Scripts/typescript/Page.js",
						"~/Scripts/typescript/App.js",
						"~/Scripts/typescript/Components/DataTiles.js",
						"~/Scripts/typescript/Pages/LandingPage.js"));

			bundles.Add(new StyleBundle("~/bundles/css").Include(
					  "~/Content/css/App.css"));

#if DEBUG
			BundleTable.EnableOptimizations = false;
#else
			BundleTable.EnableOptimizations = true;
#endif
		}
	}
}
