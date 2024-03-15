using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_employee.Models
{
    public class Employee
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        [StringLength(8)]
        public string Id { get; set; } = string.Empty;

        public string FName_th { get; set; }

        public string LName_th { get; set; }

        public string? FName_en { get; set; }

        public string? LName_en { get; set; }

        [Required]
        public string IdCard { get; set; }

        [NotMapped]
        public string? StartDate { get; set; }

        [NotMapped]
        public string? EndDate { get; set; }

        public DateTime? StartDatetime { get; set; }

        public DateTime? EndDatetime { get; set; }

        public bool Status { get; set; }

        public DateTime? CreateDate { get; set; }

        public string? CreateBy { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string? UpdateBy { get; set; }
    }
}