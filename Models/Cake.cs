public class Cake
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }

    public enum AvailableSizes
    {
        Small,
        Medium,
        Large
    }

    public List<string> Flavors { get; set; }

    public Cake()
    {
        Flavors = new List<string>();
        Name = null;
        Description = null;
        ImageUrl = null;
    }

    public bool IsAvailable { get; set; }
}
