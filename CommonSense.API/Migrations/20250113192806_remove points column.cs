﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CommonSense.API.Migrations
{
    /// <inheritdoc />
    public partial class removepointscolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
