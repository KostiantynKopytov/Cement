using System.Web.Mvc;

namespace Cement.Web.Controllers
{
    public class TemplatesController : Controller
    {
        public ActionResult Index(string page)
        {
            return View(page);
        }
    }
}
