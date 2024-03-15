﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api_employee.Data;

#nullable disable

namespace api_employee.Migrations
{
    [DbContext(typeof(EmployeeContext))]
    [Migration("20240314160413_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.17")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api_employee.Models.Employee", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(8)");

                    b.Property<string>("CreateBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("EndDatetime")
                        .HasColumnType("datetime2");

                    b.Property<string>("FName_en")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FName_th")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdCard")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LName_en")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LName_th")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("StartDatetime")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<string>("UpdateBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}
