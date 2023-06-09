export const buildResponse = (data: any, message?: string): any => {
  return {
    error: data == undefined || data == null ? true : false,
    message: message || "",
    data: data || null,
  };
};

export const buildOrderData = (data: any): any => {
  let total_price = 0; // Initialize total_price outside the loop
  const items = data.map((row: any) => {
    const itemTotalPrice = row.quantity * row.price;
    total_price += itemTotalPrice;

    return {
      menu_id: Number(row.menu_id),
      name: row.name,
      quantity: row.quantity,
      price: Number(row.price),
      type: row.type,
      image: row.image,
      description: row.description,
    };
  });

  const foundOrder = {
    customer_id: Number(data[0].customer_id),
    restaurant_id: Number(data[0].restaurant_id),
    restaurant_name: data[0].restaurant_name,
    created_at: data[0].created_at,
    address: data[0].address,
    total_price: Number(total_price),
    items,
  };

  return foundOrder;
};

export const buildCustomerOrderData = (customerId: Number, data: any): any => {
  // Transform the result into the desired structure
  // console.log(data);

  const restructuredData = {
    customer_id: data[0].customer_id,
    total_orders: data.length,
    total_spent: data.reduce(
      (total, order) => total + parseFloat(order.total_price),
      0
    ),
    orders: [],
  };

  const orderMap = new Map();

  for (const order of data) {
    if (!orderMap.has(order.order_id)) {
      orderMap.set(order.order_id, {
        order_id: order.order_id,
        restaurant_id: order.restaurant_id,
        restaurant_name: order.restaurant_name,
        created_at: new Date(order.created_at),
        address: order.address,
        total_price: parseFloat(order.total_price),
        items: [],
      });
    }

    const currentOrder = orderMap.get(order.order_id);
    currentOrder.items.push({
      menu_id: order.menu_id,
      name: order.name,
      quantity: order.quantity,
      price: parseFloat(order.price),
      type: order.type,
      image: order.image,
      description: order.description,
    });
  }

  restructuredData.orders = Array.from(orderMap.values());
  return restructuredData;
};
