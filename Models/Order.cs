public class Order
{
    public int Id { get; set; }
    public required string CustomerName { get; set; }
    public required string CustomerEmail { get; set; }
    public required string CustomerPhone { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal OrderTotal { get; set; }

    public enum Status
    {
        Pending,
        Confirmed
    }
}
