using System.Web.Mvc;

namespace Cement.Web.Controllers
{
    public class JasmineController : Controller
    {
        public ActionResult Run()
        {
            return File(Server.MapPath("~/cement/tests/index.html"), "text/html");
        }
    }
}
