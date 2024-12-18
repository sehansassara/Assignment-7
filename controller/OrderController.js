import { item_db_array, customer_db_array, orderDetails_array } from "../db/database.js";
import Order from "../models/Order.js";
import CustomerModels from "../models/CustomerModel.js";
import ItemModel from "../models/ItemModel.js";

const phoneRegex = /^[0-9]{10}$/;
const itemIdRegex = /^[A-Za-z0-9]{4,10}$/;
const quantityRegex = /^[1-9]\d*$/;
const amountRegex = /^\d+(\.\d{1,2})?$/;


const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
        alert("Invalid phone number. Please enter a valid 10-digit phone number.");
        return false;
    }
    return true;
};


const validateItemId = (itemId) => {
    if (!itemId || !itemIdRegex.test(itemId)) {
        alert("Invalid item ID. Item ID should be alphanumeric and 5-10 characters long.");
        return false;
    }
    return true;
};


const validateQuantity = (quantity) => {
    if (!quantity || !quantityRegex.test(quantity)) {
        alert("Invalid quantity. Quantity must be a positive integer.");
        return false;
    }
    return true;
};


const validateAmount = (amount) => {
    if (!amount || !amountRegex.test(amount)) {
        alert("Invalid amount. Please enter a valid payment amount.");
        return false;
    }
    return true;
};

const loadCustomersFromLocalStorage = () => {
    const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    customer_db_array.push(...savedCustomers);
};


const loadItemsFromLocalStorage = () => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    item_db_array.push(...savedItems);
};


const searchCustomer = (cusTel) => {
    if (!validatePhoneNumber(cusTel)) {
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

    if (!validateItemId(itemId) || !validateQuantity(qty)) {
        return;
    }

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

// cart eka local storage ekata danawa
const saveCartToLocalStorage = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalAmount", totalAmount.toFixed(2));
};


// data tika set karanawa cart table ekata
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

// local storage eken load karagannawa
const loadCartFromLocalStorage = () => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;
    cartItems = savedCartItems;
    renderCart();
    $("#total").val(totalAmount.toFixed(2));
};

// item cart eken remove karagannawa
const removeFromCart = (itemKey) => {
    if (cartItems[itemKey]) {
        totalAmount -= cartItems[itemKey].totalPrice;
        delete cartItems[itemKey]; // Remove item from the cart
        saveCartToLocalStorage();
        renderCart();
    }
};


$(document).on("click", ".remove-row-btn", function () {
    const row = $(this).closest("tr");
    const itemKey = row.data("item-id");
    removeFromCart(itemKey);
});

// Payment based karagena balance eka hadagannawa
const calculateBalance = () => {
    const payAmount = parseFloat($("#pay").val()) || 0;
    const balance = payAmount - totalAmount;
    $("#balance").val(balance.toFixed(2));
};

// Cart eka reset kragannawa
const resetCart = () => {
    $("#orderTableBody").empty();
    $("#total, #balance, #pay, #cust_tel, #cust_id, #cust_name, #itm_id, #itm_des, #ord_qty, #qty_on_hand, #itm_unit_price").val('');
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


// Order place karanawa
function placeOrder() {
    console.log("Attempting to place order...");

    const payAmount = parseFloat($("#pay").val()) || 0;

    if (totalAmount > 0) {
        const custId = $("#cust_id").val();

        if (!custId) {
            alert("Please select a customer.");
            return;
        }

        if (!validateAmount(payAmount)) {
            return;
        }

        // Customer kenek innawada balanawa ayema
        const customer = customer_db_array.find(c => c.cus_id === custId);
        if (!customer) {
            alert("Customer not found.");
            return;
        }

        const items = Object.entries(cartItems).map(([itemId, details]) => {
            // Item ekak thiyenawada balanawa ayema
            const item = item_db_array.find(i => i.item_id === itemId);
            if (!item) {
                alert(`Item with ID ${itemId} not found.`);
                return;
            }

            // Quntity eka adu karagannawa item ekenma
            item.deductQuantity(details.qty);

            return {
                itemId,
                description: item.description,
                qty: details.qty,
                unitPrice: item.unit_price,
                totalPrice: details.totalPrice
            };
        });

        // order detail array ekata dagannawa
        items.forEach(item => {
            orderDetails_array.push({
                orderId: currentOrderId,
                customerId: custId,
                itemId: item.itemId,
                quantity: item.qty,
                totalPrice: item.totalPrice.toFixed(2)
            });
        });

        localStorage.setItem("orderDetails", JSON.stringify(orderDetails_array));
        saveItemsToLocalStorage(item_db_array);

        loadItemTable();
        loadOrderDetail();

        currentOrderId = generateOrderId();
        localStorage.setItem("currentOrderId", currentOrderId);

        Swal.fire({
            title: 'Success!',
            text: 'Order placed successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        resetCart();
    } else {
        alert("No items in the cart.");
    }
}


function loadOrderDetail(){
    $("#orderDetailTableBody").empty();

    orderDetails_array.forEach(orderDetail => {
        const { orderId, customerId, itemId, quantity, totalPrice } = orderDetail;

        const orderRow = `
            <tr>
                <td>${orderId}</td>
                <td>${customerId}</td>
                <td>${itemId}</td>
                <td>${quantity}</td>
                <td>${totalPrice}</td>
            </tr>
        `;

        $("#orderDetailTableBody").append(orderRow);
    });
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
loadOrderDetail();

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