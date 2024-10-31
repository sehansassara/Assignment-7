import { item_db_array, customer_db_array, orderDetails_array } from "../db/database.js";
import Order from "../models/Order.js";
import CustomerModels from "../models/CustomerModel.js";
import ItemModel from "../models/ItemModel.js";


const loadCustomersFromLocalStorage = () => {
    const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    customer_db_array.push(...savedCustomers);
};


const loadItemsFromLocalStorage = () => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    item_db_array.push(...savedItems);
};


const searchCustomer = (cusTel) => {
    if (!cusTel) {
        alert("Please enter a telephone number.");
        return;
    }
    console.log(`Searching for customer with telephone: ${cusTel}`);
    const customer = customer_db_array.find(item => item.tel === cusTel);
    if (customer) {
        $("#cust_id").val(customer.cus_id);
        $("#cust_name").val(customer.name);
        $("#searchMessage").text("Customer found.");
    } else {
        $("#cust_id").val('');
        $("#cust_name").val('');
        $("#searchMessage").text("Customer not found.");
    }
};


const searchItem = (itmId) => {
    console.log(`Searching for item with ID: ${itmId}`);
    const item = item_db_array.find(item => item.item_id === itmId);
    if (item) {
        $("#itm_des").val(item.description);
        $("#qty_on_hand").val(item.qty);
        $("#itm_unit_price").val(item.unit_price);
    } else {
        alert("Item not found.");
    }
};


let totalAmount = 0;
let orderCount = parseInt(localStorage.getItem("orderCount")) || [0];
let currentOrderId;
let cartItems = {};


const generateOrderId = () => {
    orderCount++;
    localStorage.setItem("orderCount", orderCount);
    return `O00${orderCount}`;
};


const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
};


const initializeOrderFields = () => {
    const storedOrderId = localStorage.getItem("currentOrderId");
    currentOrderId = storedOrderId || generateOrderId();
    localStorage.setItem("currentOrderId", currentOrderId);
    $("#order_id").val(currentOrderId);
    $("#date").val(getCurrentDate());
};

const addToCart = () => {
    const qty = parseInt($("#ord_qty").val(), 10);
    const unitPrice = parseFloat($("#itm_unit_price").val()) || 0;
    const itemId = $("#itm_id").val();
    const cusId = $("#cust_id").val();

    if (!currentOrderId || !qty || !cusId) {
        alert("Please complete all fields.");
        return;
    }

    const item = item_db_array.find(item => item.item_id === itemId);
    if (!item) {
        alert("Item not found.");
        return;
    }

    if (item.qty < qty) {
        alert("Insufficient stock.");
        return;
    }

    if (!cartItems[itemId]) {
        cartItems[itemId] = { qty: 0, totalPrice: 0, cusId: cusId };
    }

    const existingItem = cartItems[itemId];
    const newQty = existingItem.qty + qty;

    if (item.qty < newQty) {
        alert("Insufficient stock available.");
        return;
    }

    existingItem.qty += qty;
    existingItem.totalPrice += qty * unitPrice;
    totalAmount += qty * unitPrice;

    $("#total").val(totalAmount.toFixed(2));
    saveCartToLocalStorage();
    renderCart();
};

// Save cart to local storage
const saveCartToLocalStorage = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalAmount", totalAmount.toFixed(2));
};


// Render cart in the table
const renderCart = () => {
    $("#orderTableBody").empty();
    for (const [itemKey, item] of Object.entries(cartItems)) {
        $("#orderTableBody").append(`
            <tr id="row-${itemKey}" data-item-id="${itemKey}">
                <td>${currentOrderId}</td>
                <td>${itemKey}</td>
                <td>${item.cusId}</td>
                <td class="qty">${item.qty}</td>
                <td>${(item.totalPrice / item.qty).toFixed(2)}</td>
                <td class="total">${item.totalPrice.toFixed(2)}</td>
                <td><button class="remove-row-btn">Remove</button></td>
            </tr>
        `);
    }


    $("#total").val(totalAmount.toFixed(2));
};

// Load cart from local storage
const loadCartFromLocalStorage = () => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;
    cartItems = savedCartItems;
    renderCart();
    $("#total").val(totalAmount.toFixed(2));
};

// Remove item from cart
const removeFromCart = (itemKey) => {
    if (cartItems[itemKey]) {
        totalAmount -= cartItems[itemKey].totalPrice;
        delete cartItems[itemKey]; // Remove item from the cart
        saveCartToLocalStorage();
        renderCart();
    }
};

// Event delegation for dynamic elements
$(document).on("click", ".remove-row-btn", function () {
    const row = $(this).closest("tr");
    const itemKey = row.data("item-id");
    removeFromCart(itemKey);
});

// Calculate balance based on payment
const calculateBalance = () => {
    const payAmount = parseFloat($("#pay").val()) || 0;
    const balance = payAmount - totalAmount;
    $("#balance").val(balance.toFixed(2));
};

// Reset cart
const resetCart = () => {
    $("#orderTableBody").empty(); // Clear the table body
    $("#total, #balance, #pay, #cust_tel, #cust_id, #cust_name, #itm_id, #itm_des, #ord_qty, #qty_on_hand, #itm_unit_price").val(''); // Reset totals and payments
    totalAmount = 0;
    cartItems = {};
    initializeOrderFields();
    saveCartToLocalStorage();
};

const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_db_array.forEach(item => {
        console.log(item);
        const itemRow = `
            <tr>
                <td>${item.item_id}</td>
                <td>${item.description}</td>
                <td>${item.qty}</td>
                <td>${item.unit_price}</td>
            </tr>
        `;
        $("#itemTableBody").append(itemRow);
    });
};



// Place order
function placeOrder() {
    console.log("Attempting to place order...");

    if (totalAmount > 0) {
        const custId = $("#cust_id").val();

        if (!custId) {
            alert("Please select a customer.");
            return;
        }


        const items = Object.entries(cartItems).map(([itemId, details]) => ({
            id: itemId,
            qty: details.qty,
            price: details.totalPrice / details.qty
        }));

        const order = new Order(currentOrderId, new CustomerModels(custId), items);


        $("#orderDetailTableBody").empty();

        // item data tika order detail ekata
        for (const [itemId, itemDetails] of Object.entries(cartItems)) {
            const qty = itemDetails.qty;
            const totalPrice = itemDetails.totalPrice.toFixed(2);
            order.addItem(itemId, qty, totalPrice);

            const orderRow = `
                <tr>
                    <td>${currentOrderId}</td>
                    <td>${custId}</td>
                    <td>${itemId}</td>
                    <td>${qty}</td>
                    <td>${totalPrice}</td>
                </tr>
            `;
            $("#orderDetailTableBody").append(orderRow);

            // model eken qty eka gannawa hadala
            const item = item_db_array.find(item => item.item_id === itemId);
            if (item) {
                item.deductQuantity(qty);
            }

            orderDetails_array.push({
                orderId: currentOrderId,
                customerId: custId,
                itemId: itemId,
                quantity: qty,
                totalPrice: totalPrice
            });
        }

        // update item_db_array
        saveItemsToLocalStorage(order.items);

        // Save order details to localStorage
        localStorage.setItem("orderDetails", JSON.stringify(order));
        localStorage.setItem("orderDetailData", JSON.stringify(orderDetails_array));
        loadItemTable(); // Refresh the item table

        // Generate a new order ID and update currentOrderId
        currentOrderId = generateOrderId();
        localStorage.setItem("currentOrderId", currentOrderId);

        Swal.fire({
            title: 'Success!',
            text: 'Order Placed successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        resetCart(); // Reset the cart
    } else {
        alert("No items in the cart.");
    }
}


function saveItemsToLocalStorage(items) {
    localStorage.setItem('orderItems', JSON.stringify(items));
}


$(document).ready(() => {
    loadCustomersFromLocalStorage();
    loadItemsFromLocalStorage();
    loadCartFromLocalStorage();
    initializeOrderFields();
    loadItemTable();


    $("#cust_tel").on("keydown", function (event) {
        if (event.key === "Enter") {
            searchCustomer($(this).val());
            event.preventDefault();
        }
    });

    $("#itm_id").on("keydown", function (event) {
        if (event.key === "Enter") {
            searchItem($(this).val());
            event.preventDefault();
        }
    });
    $("#addToCart-btn").on("click",addToCart);
    $("#placeOrder-btn").on("click",placeOrder);
    $("#pay").on("input", calculateBalance);
    $("#resetCartBtn").on("click",resetCart);
});

