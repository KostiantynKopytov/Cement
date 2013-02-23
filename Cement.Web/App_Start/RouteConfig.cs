using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Cement.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Test",
                url: "Test",
                defaults: new { controller = "Jasmine", action = "Run", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{*path}",
                defaults: new { controller = "Test", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}