namespace AutocompleteTest.Core.Cities
{
    public class City
    {
        public required string Name { get; set; }

        public string Latitude { get; set; } = string.Empty;

        public string Longtitude { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;
    }
}
