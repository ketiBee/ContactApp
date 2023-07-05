using Azure.Core;
using Azure;
using ContactAppAPI.Data;
using ContactAppAPI.DataTransferObject;
using ContactAppAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace ContactAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactAppDbContext _context;

        public ContactController(ContactAppDbContext context)
        {
            _context = context;
        }
       
        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContact(ContactCreateDTO request)
        {
            var newContact = new Contact
            {
                Firstname = request.Firstname,
                Lastname = request.Lastname,
                Adress = request.Adress,
                Tag = request.Tag
            };

            
            var number = request.Number.Select(num => new Number { ContactNum = num.ContactNum, Contact = newContact }).ToList();
            var email = request.Email.Select(e => new Email { ContactEmail = e.ContactEmail, Contact = newContact }).ToList();
            
            newContact.Number = number;
            newContact.Email = email;

            _context.Contacts.Add(newContact);
            await _context.SaveChangesAsync();

            return Ok(await _context.Contacts.Include(c => c.Number).Include(c=> c.Email).OrderBy(n=>n.Id).LastAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContactById(int id)
        {
            var contact = await _context.Contacts
                .Include(c => c.Number)
                .Include(c => c.Email)
                .FirstOrDefaultAsync(c => c.Id == id);

            if(contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }


        [HttpGet]
        public async Task<ActionResult<Contact>> GetContactById()
        {
            var contact = await _context.Contacts
                .Include(c => c.Number)
                .Include(c => c.Email)
                .ToListAsync();

            return Ok(contact);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Contact>> UpdateContact(int id, ContactCreateDTO request)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null) {
                return NotFound();
            }


            contact.Firstname = request.Firstname;
            contact.Lastname = request.Lastname;
            contact.Adress = request.Adress;
            contact.Tag = request.Tag;




            
            /*ne mjenja listu, nego dodaje novu
            var number = request.Number.Select(num => new Number { ContactNum = num.ContactNum, Contact = contact }).ToList();
            var email = request.Email.Select(e => new Email { ContactEmail = e.ContactEmail, Contact = contact }).ToList();

            contact.Number = number;
            contact.Email = email;*/



            await _context.SaveChangesAsync();

            return Ok(await _context.Contacts.Include(c => c.Number).Include(c => c.Email).OrderBy(n => n.Id).LastAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if(contact == null)
            {
                return NotFound();
            }
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return Ok(contact);
        }

        

    }
}
