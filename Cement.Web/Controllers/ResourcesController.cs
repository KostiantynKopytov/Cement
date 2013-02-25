using System.Linq;
using System.Text;
using System.Web.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace Cement.Web.Controllers
{
    using System.Collections.Generic;

    public class ResourcesController : Controller
    {
        public ActionResult Layout(string path)
        {
            return View("Layouts/" + path);
        }

        public ActionResult Page(string path)
        {
            var pageId = "/" + (path ?? string.Empty).ToLower();
            var client = new MongoClient();
            var server = client.GetServer();
            var pages = server["test"]["pages"];
            var page = pages.Find(Query.EQ("_id", pageId)).FirstOrDefault();

            return Content(page.ToJson(), "application/json", Encoding.UTF8);
        }

        public ActionResult Menu()
        {
            var client = new MongoClient();
            var server = client.GetServer();
            var pages = server["test"]["pages"].FindAll().ToList();
            var root = pages.First(p => p["_id"] == "/");

            var menu = ChildPages(root, pages);

            return Content(menu.ToJson(), "application/json", Encoding.UTF8);
        }

        private static BsonDocument ChildPages(BsonDocument current, IList<BsonDocument> pages)
        {
            return new BsonDocument(
                new BsonElement("href", current["_id"].AsString),
                new BsonElement("title", current["title"].AsString),
                new BsonElement("childPages", new BsonArray(pages.Where(page => page["parentId"] == current["_id"]).Select(child => ChildPages(child, pages)))));
        }

        public ActionResult MasterPage()
        {
            return View();
        }
    }
}
