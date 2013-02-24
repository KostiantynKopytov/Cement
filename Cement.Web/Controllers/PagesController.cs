// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PagesController.cs" company="">
//   Cement (c) 2013
// </copyright>
// <summary>
//   The test controller.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Linq;
using System.Web.Mvc;
using Cement.Web.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Cement.Web.Controllers
{
    /// <summary>
    ///     The test controller.
    /// </summary>
    public class PagesController : Controller
    {
        #region Public Methods and Operators

        /// <summary>
        ///     The index.
        /// </summary>
        /// <returns>
        ///     The <see cref="ActionResult" />.
        /// </returns>
        public ActionResult Index()
        {
            var pageId = Request.Path.ToLower();

            var client = new MongoClient();
            var server = client.GetServer();
            var pages = server["test"]["pages"].AsQueryable<Page>();
            var page = pages.FirstOrDefault(p => p.Id == pageId);
            page = page ?? new Page {Id = pageId, Template = "Page"};
            return View(page);
        }

        #endregion
    }
}