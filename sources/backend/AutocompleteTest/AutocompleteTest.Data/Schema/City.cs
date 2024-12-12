using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutocompleteTest.Data.Schema
{
    public class City
    {
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("lat")]
        public string Latitude { get; set; } = string.Empty;

        [Column("lng")]
        public string Longtitude { get; set; } = string.Empty;

        [Column("country")]
        public string Country { get; set; } = string.Empty;
    }
}
