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
            return File(Server.MapPath("~/cement/portal/layouts/" + path + ".html"), "text/html");
        }

        public ActionResult Page(string path)
        {
            var pageId = ("/" + path).ToLower();
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

            var menu = new BsonDocument(new BsonElement("childPages", ChildPages(null, pages)));

            return Content(menu.ToJson(), "application/json", Encoding.UTF8);
        }

        private static BsonArray ChildPages(string current, IList<BsonDocument> pages)
        {
            return new BsonArray(
                pages
                .Where(page => page["parentId"] == current || current == null && page["parentId"].IsBsonNull)
                .Select(child =>
                    new BsonDocument( 
                        new BsonElement("href", child["_id"].AsString),
                        new BsonElement("title", child["title"].AsString),
                        new BsonElement("childPages", ChildPages(child["_id"].AsString, pages)))));
        }

        public ActionResult MasterPage()
        {
            return File(Server.MapPath("~/cement/index.html"), "text/html");
        }
    }
}
