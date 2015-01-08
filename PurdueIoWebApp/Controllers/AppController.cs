using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PurdueIoWebApp.Controllers
{
	[RequireHttps]
	public class AppController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}
	}
}