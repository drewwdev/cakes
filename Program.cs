using dotenv.net;
using Microsoft.EntityFrameworkCore;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    $"Host={Environment.GetEnvironmentVariable("DB_HOST")};"
    + $"Port={Environment.GetEnvironmentVariable("DB_PORT")};"
    + $"Database={Environment.GetEnvironmentVariable("DB_NAME")};"
    + $"Username={Environment.GetEnvironmentVariable("DB_USER")};"
    + $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";

builder.Services.AddDbContext<CakesDb>(options =>
{
    options.UseNpgsql(connectionString);
});
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/cakes", async (CakesDb db) => await db.Cakes.ToListAsync());

app.MapGet(
    "/cakes/{id}",
    async (CakesDb db, int id) =>
        await db.Cakes.FindAsync(id) is Cake cake ? Results.Ok(cake) : Results.NotFound()
);

app.MapPost(
    "/cakes",
    async (CakesDb db, Cake cake) =>
    {
        db.Cakes.Add(cake);
        await db.SaveChangesAsync();
        return Results.Created($"/cakes/{cake.Id}", cake);
    }
);

app.MapPut(
    "/cakes/{id}",
    async (CakesDb db, int id, Cake updatedCake) =>
    {
        if (id != updatedCake.Id)
        {
            return Results.BadRequest();
        }

        db.Entry(updatedCake).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return Results.Ok();
    }
);

app.MapDelete(
    "/cakes/{id}",
    async (CakesDb db, int id) =>
    {
        var cake = await db.Cakes.FindAsync(id);
        if (cake is null)
        {
            return Results.NotFound();
        }

        db.Cakes.Remove(cake);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
);

app.MapGet("/orders", async (CakesDb db) => await db.Orders.ToListAsync());

app.MapGet(
    "/orders/{id}",
    async (CakesDb db, int id) =>
        await db.Orders.FindAsync(id) is Order order ? Results.Ok(order) : Results.NotFound()
);

app.MapPost(
    "/orders",
    async (CakesDb db, Order order) =>
    {
        db.Orders.Add(order);
        await db.SaveChangesAsync();
        return Results.Created($"/orders/{order.Id}", order);
    }
);

app.MapPut(
    "/orders/{id}",
    async (CakesDb db, int id, Order updatedOrder) =>
    {
        if (id != updatedOrder.Id)
        {
            return Results.BadRequest();
        }

        db.Entry(updatedOrder).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return Results.Ok();
    }
);

app.MapDelete(
    "/orders/{id}",
    async (CakesDb db, int id) =>
    {
        var order = await db.Orders.FindAsync(id);
        if (order is null)
        {
            return Results.NotFound();
        }

        db.Orders.Remove(order);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
);

app.MapGet("/orderitems", async (CakesDb db) => await db.OrderItems.ToListAsync());

app.MapGet(
    "/orderitems/{id}",
    async (CakesDb db, int id) =>
        await db.OrderItems.FindAsync(id) is OrderItem orderItem
            ? Results.Ok(orderItem)
            : Results.NotFound()
);

app.MapPost(
    "/orderitems",
    async (CakesDb db, OrderItem orderItem) =>
    {
        db.OrderItems.Add(orderItem);
        await db.SaveChangesAsync();
        return Results.Created($"/orderitems/{orderItem.Id}", orderItem);
    }
);

app.MapPut(
    "/orderitems/{id}",
    async (CakesDb db, int id, OrderItem updatedOrderItem) =>
    {
        if (id != updatedOrderItem.Id)
        {
            return Results.BadRequest();
        }

        db.Entry(updatedOrderItem).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return Results.Ok();
    }
);

app.MapDelete(
    "/orderitems/{id}",
    async (CakesDb db, int id) =>
    {
        var orderItem = await db.OrderItems.FindAsync(id);
        if (orderItem is null)
        {
            return Results.NotFound();
        }

        db.OrderItems.Remove(orderItem);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
);

app.MapGet("/admins", async (CakesDb db) => await db.Admins.ToListAsync());

app.MapGet(
    "/admins/{id}",
    async (CakesDb db, int id) =>
        await db.Admins.FindAsync(id) is Admin admin ? Results.Ok(admin) : Results.NotFound()
);

app.MapPost(
    "/admins",
    async (CakesDb db, Admin admin) =>
    {
        db.Admins.Add(admin);
        await db.SaveChangesAsync();
        return Results.Created($"/admins/{admin.Id}", admin);
    }
);

app.MapPut(
    "/admins/{id}",
    async (CakesDb db, int id, Admin updatedAdmin) =>
    {
        if (id != updatedAdmin.Id)
        {
            return Results.BadRequest();
        }

        db.Entry(updatedAdmin).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return Results.Ok();
    }
);

app.MapDelete(
    "/admins/{id}",
    async (CakesDb db, int id) =>
    {
        var admin = await db.Admins.FindAsync(id);
        if (admin is null)
        {
            return Results.NotFound();
        }

        db.Admins.Remove(admin);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
);

app.Run();
