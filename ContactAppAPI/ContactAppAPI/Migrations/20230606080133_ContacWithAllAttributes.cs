using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class ContacWithAllAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Contacts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Contacts");
        }
    }
}
