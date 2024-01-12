using Microsoft.EntityFrameworkCore;

class CakesDb : DbContext
{
    public CakesDb(DbContextOptions<CakesDb> options)
        : base(options) { }

    public DbSet<Cake> Cakes { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Admin> Admins { get; set; }
}