namespace ContactAppAPI.DataTransferObject
{
   public record struct ContactCreateDTO(string Firstname, string Lastname, string Adress, string Tag,
       List<ContactNumCreateDTO> Number, 
       List<ContactEmailCreateDTO> Email);
}
