using System.Web;
using System.Web.Optimization;

namespace PurdueIoWebApp
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/typescript").Include(
						"~/Scripts/typescript/"));



			bundles.Add(new StyleBundle("~/bundles/css").Include(
					  "~/Content/css/App.css"));
		}
	}
}
