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
      menu_id: row.menu_id,
      name: row.name,
      quantity: row.quantity,
      price: row.price,
      type: row.type,
      image: row.image,
      description: row.description,
    };
  });

  const foundOrder = {
    customer_id: data[0].customer_id,
    restaurant_id: data[0].restaurant_id,
    restaurant_name: data[0].restaurant_name,
    created_at: data[0].created_at,
    address: data[0].address,
    total_price,
    items,
  };

  return foundOrder;
};

export const buildCustomerOrderData = (customerId: Number, data: any): any => {
  // Transform the result into the desired structure
  const orders = data.map((row: any) => ({
    restaurant_id: row.restaurant_id,
    restaurant_name: row.restaurant_name,
    created_at: row.created_at,
    address: row.address,
    total_price: row.total_price,
    items: data
      .filter((itemRow) => itemRow.created_at === row.created_at)
      .map((itemRow) => ({
        menu_id: itemRow.menu_id,
        name: itemRow.name,
        quantity: itemRow.quantity,
        price: itemRow.price,
        type: itemRow.type,
        image: itemRow.image,
        description: itemRow.description,
      })),
  }));

  const total_orders = orders.length;
  const total_spent = orders.reduce((sum, order) => sum + order.total_price, 0);

  const response = {
    customer_id: customerId,
    total_orders,
    total_spent,
    orders,
  };

  return response;
};
