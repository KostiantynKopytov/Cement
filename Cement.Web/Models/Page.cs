using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Cement.Web.Models
{
    public class Page
    {
        [BsonElement("_id", Order = 1)]
        public string Id { get; set; }

        [BsonElement("template", Order = 2)]
        public string Template { get; set; }

        [BsonExtraElements]
        public BsonDocument Document { get; set; }
    }
}