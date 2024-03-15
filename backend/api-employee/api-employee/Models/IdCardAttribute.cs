using System.ComponentModel.DataAnnotations;

namespace api_employee.Models
{
    public class IdCardAttribute : RegularExpressionAttribute
    {
        public IdCardAttribute(string pattern)
            : base(pattern)
        {
            ErrorMessage = "The ID card number must be in the correct format.";
        }
    }
}