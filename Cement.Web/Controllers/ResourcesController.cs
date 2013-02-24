using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Mvc;
using Cement.Web.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;

namespace Cement.Web.Controllers
{
    public class ResourcesController : Controller
    {
        public ActionResult Layout(string path)
        {
            return View("Layouts" + path);
        }

        public ActionResult Page(string path)
        {
            var pageId = path.ToLower();
            var client = new MongoClient();
            var server = client.GetServer();
            var pages = server["test"]["pages"];
            var page = pages.Find(Query.EQ("_id", pageId)).FirstOrDefault();

            return Content(page.ToJson(), "application/json", Encoding.UTF8);
        }

        public ActionResult MasterPage()
        {
            return View();
        }
    }
}
