using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cement.Web.Controllers
{
    public class TemplatesController : Controller
    {
        //
        // GET: /Templates/



        public ActionResult Index(string page)
        {
            return View(page);
        }


    }
}
