// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TestController.cs" company="">
//   Cement (c) 2013
// </copyright>
// <summary>
//   The test controller.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Cement.Web.Controllers
{
    using System.Web.Mvc;

    /// <summary>
    /// The test controller.
    /// </summary>
    public class TestController : Controller
    {
        #region Public Methods and Operators

        /// <summary>
        /// The index.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult Index()
        {
            var model = new { Layout = "_Basic" };
            return this.View(model);
        }

        #endregion
    }
}