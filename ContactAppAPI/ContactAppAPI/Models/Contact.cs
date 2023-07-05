using System.Text.Json.Serialization;

namespace ContactAppAPI.Models
{
    public class Contact
    {
        public int Id { get; set; }
        
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Adress { get; set; }
        
        public string Tag { get; set; }
        public List<Number> Number { get; set; }
        public List<Email> Email { get; set; }
    }
}
