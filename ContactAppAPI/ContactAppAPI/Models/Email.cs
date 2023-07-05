using System.Text.Json.Serialization;

namespace ContactAppAPI.Models
{
    public class Email
    {
        public int Id { get; set; }
        
        public string ContactEmail { get; set; }

        public int ContactId { get; set; }
        [JsonIgnore]
        public Contact Contact { get; set; }
    }
}
