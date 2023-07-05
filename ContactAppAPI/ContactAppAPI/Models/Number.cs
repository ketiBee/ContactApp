using System.Text.Json.Serialization;

namespace ContactAppAPI.Models
{
    public class Number
    {
        public int Id { get; set; }
        
        public string ContactNum { get; set; }

        public int ContactId { get; set; }
        [JsonIgnore]
        public Contact Contact { get; set; }
    }
}
