using Microsoft.EntityFrameworkCore;
using ContactAppAPI.Models;
using Microsoft.Identity.Client;

namespace ContactAppAPI.Data
{
    public class ContactAppDbContext : DbContext
    {
        public ContactAppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Number> Numbers { get; set; }
        public DbSet<Email> Emails { get; set; }
    }
}
