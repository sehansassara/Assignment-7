//nav okkoma gannawa
let dashboard_nav=document.getElementById("home-nav");
let customer_nav=document.getElementById("customer-nav");
let item_nav=document.getElementById("item-nav");
let order_nav=document.getElementById("order-nav");
let orderDetail_nav=document.getElementById("orderDetail-nav");

//section okkoma
let dashboard_section=document.getElementById("home-section");
let customer_section=document.getElementById("customer-section");
let item_section=document.getElementById("item-section");
let order_section=document.getElementById("order-section");
let orderDetail_section=document.getElementById("orderDetail-section");

//dasboard ganna epa
customer_section.style.display = "none";
item_section.style.display = "none";
order_section.style.display = "none";
orderDetail_section.style.display = "none";
dashboard_section.style.display = "block";

customer_nav.addEventListener('click',function (){
    //dashboar ekath ganna oni
    dashboard_section.style.display="none"
    customer_section.style.display="block"
    item_section.style.display="none"
    order_section.style.display="none"
    orderDetail_section.style.display = "none";
    //adala eka witharak block karanna oni
});

item_nav.addEventListener('click',function (){
    dashboard_section.style.display="none"
    customer_section.style.display="none"
    item_section.style.display="block"
    order_section.style.display="none"
    orderDetail_section.style.display = "none";
});

order_nav.addEventListener('click',function (){
    dashboard_section.style.display="none"
    customer_section.style.display="none"
    item_section.style.display="none"
    order_section.style.display="block"
    orderDetail_section.style.display = "none";
});

dashboard_nav.addEventListener('click',function (){
    dashboard_section.style.display="block"
    customer_section.style.display="none"
    item_section.style.display="none"
    order_section.style.display="none"
    orderDetail_section.style.display = "none";
});

orderDetail_nav.addEventListener('click',function (){
    dashboard_section.style.display="none"
    customer_section.style.display="none"
    item_section.style.display="none"
    order_section.style.display="none"
    orderDetail_section.style.display = "block";
});



/*

/!*customer*!/
// Customer array
let customer_db_array = [];

// Function to save data to localStorage
const saveCustomersToLocalStorage = () => {
    localStorage.setItem("customer_db_array", JSON.stringify(customer_db_array));
}

// Function to load data from localStorage
const loadCustomersFromLocalStorage = () => {
    let savedData = localStorage.getItem("customer_db_array");
    if (savedData) {
        customer_db_array = JSON.parse(savedData); // Parse the saved data and assign it to the array
    }
}

// Function to load the table
const loadCustomerTable = () => {
    $("#customerTableBody").empty(); // Clear the table body

    customer_db_array.map((item, index) => {
        let data = `<tr o1nclick="populateFields('${item.cus_id}', '${item.name}', '${item.address}', '${item.tel}')">
                        <td>${item.cus_id}</td>
                        <td>${item.name}</td>
                        <td>${item.address}</td>
                        <td>${item.tel}</td>
                    </tr>`;
        $("#customerTableBody").append(data);
    });
}

// Populate fields for update
function populateFields(cus_id, name, address, tel) {
    $("#cus_Id").val(cus_id);
    $("#cus_name").val(name);
    $("#cus_address").val(address);
    $("#cus_tel").val(tel);
}

// Generate Customer ID
const generateCustomerId = () => {
    let newCustomerId = 'C001';
    if (customer_db_array.length > 0) {
        let lastCustomer = customer_db_array[customer_db_array.length - 1];
        let newIdNum = parseInt(lastCustomer.cus_id.slice(1)) + 1;
        newCustomerId = `C${newIdNum.toString().padStart(3, '0')}`;
    }
    $("#cus_Id").val(newCustomerId);
    return newCustomerId;
}

$(document).ready(function () {
    loadCustomersFromLocalStorage();
    loadCustomerTable();
    generateCustomerId();
});

// Add customer
$("#customer_add_btn").on("click", function () {
    let cus_id = $("#cus_Id").val();
    let cus_name = $("#cus_name").val();
    let cus_address = $("#cus_address").val();
    let cus_tel = $("#cus_tel").val();

    if (!cus_name || !cus_address || !cus_tel) {
        alert("Please fill all the fields!");
        return;
    }

    let customer = {
        cus_id: cus_id,
        name: cus_name,
        address: cus_address,
        tel: cus_tel
    }

    customer_db_array.push(customer);

    saveCustomersToLocalStorage();
    loadCustomerTable();
    clearCustomerFields();
    generateCustomerId();
});

// Clear input fields
const clearCustomerFields = () => {
    $("#cus_Id").val('');
    $("#cus_name").val('');
    $("#cus_address").val('');
    $("#cus_tel").val('');
};

// View customers
$("#customer_view_btn").on("click", function () {
    loadCustomerTable();
});

// Delete customer
$("#customer_delete_btn").on("click", function () {
    let cus_id = $("#cus_Id").val();

    customer_db_array = customer_db_array.filter(customer => customer.cus_id !== cus_id);

    saveCustomersToLocalStorage(); // Update local storage
    loadCustomerTable();
    clearCustomerFields();
    generateCustomerId();
});

// Update customer
$("#customer_update_btn").on("click", function () {
    let cus_id = $("#cus_Id").val();
    let cus_name = $("#cus_name").val();
    let cus_address = $("#cus_address").val();
    let cus_tel = $("#cus_tel").val();

    let customerIndex = customer_db_array.findIndex(customer => customer.cus_id === cus_id);
    if (customerIndex !== -1) {
        customer_db_array[customerIndex] = {
            cus_id: cus_id,
            name: cus_name,
            address: cus_address,
            tel: cus_tel
        };
        saveCustomersToLocalStorage(); // Update local storage
        loadCustomerTable();
        clearCustomerFields();
        generateCustomerId();
    } else {
        alert("Customer not found.");
    }
});
*/







/*
/!*Item*!/

let item_db_array = [];

// Function to save data to localStorage
const saveItemsToLocalStorage = () => {
    localStorage.setItem("item_db_array", JSON.stringify(item_db_array));
}

// Function to load data from localStorage
const loadItemsFromLocalStorage = () => {
    let savedData = localStorage.getItem("item_db_array");
    if (savedData) {
        item_db_array = JSON.parse(savedData); // Parse the saved data and assign it to the array
    }
}

const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_db_array.map((item) => {
        let data = `<tr onclick="populateItemFields('${item.item_id}', '${item.description}', ${item.qty}, ${item.unit_price})">
                        <td>${item.item_id}</td>
                        <td>${item.description}</td>
                        <td>${item.qty}</td>
                        <td>${item.unit_price}</td>
                    </tr>`;
        $("#itemTableBody").append(data);
    });
}

// Populate fields for item update
function populateItemFields(item_id, description, qty, unit_price) {
    $("#item_ID").val(item_id);
    $("#description").val(description);
    $("#qty").val(qty);
    $("#unit_price").val(unit_price);
}

// Generate unique Item ID
const generateItemId = () => {
    let newItemId = 'I001';  // Default ID for the first item
    if (item_db_array.length > 0) {
        let lastItem = item_db_array[item_db_array.length - 1];
        let newIdNum = parseInt(lastItem.item_id.slice(1)) + 1;
        newItemId = `I${newIdNum.toString().padStart(3, '0')}`;
    }
    $("#item_ID").val(newItemId);
};


$(document).ready(function () {
    loadItemsFromLocalStorage();
    loadItemTable();
    generateItemId();
});

// Add item
$("#item_save_btn").on("click", function () {
    let item_id = $("#item_ID").val();
    let description = $("#description").val();
    let qty = $("#qty").val();
    let unit_price = $("#unit_price").val();

    if (!description || !qty || !unit_price) {
        alert("Please fill all the fields!");
        return;
    }

    let newItem = {
        item_id: item_id,
        description: description,
        qty: qty,
        unit_price: unit_price
    };

    item_db_array.push(newItem);

    saveItemsToLocalStorage();

    loadItemTable();

    clearFields();
    generateItemId();
});

// Clear input fields
const clearFields = () => {
    $("#description").val('');
    $("#qty").val('');
    $("#unit_price").val('');
};

// View items
$("#item_view_btn").on("click", function () {
    loadItemTable();
});

// Delete item
$("#item_delete_btn").on("click", function () {
    let item_id = $("#item_ID").val();
    item_db_array = item_db_array.filter(item => item.item_id !== item_id);

    saveItemsToLocalStorage(); // Update local storage
    loadItemTable();
    clearFields();
    generateItemId();
});

// Update item
$("#item_update_btn").on("click", function () {
    let item_id = $("#item_ID").val();
    let description = $("#description").val();
    let qty = $("#qty").val();
    let unit_price = $("#unit_price").val();

    let itemIndex = item_db_array.findIndex(item => item.item_id === item_id);
    if (itemIndex !== -1) {
        item_db_array[itemIndex] = {
            item_id: item_id,
            description: description,
            qty: qty,
            unit_price: unit_price
        };
        saveItemsToLocalStorage(); // Update local storage
        loadItemTable();
        clearFields();
        generateItemId();
    } else {
        alert("Item not found.");
    }
});


*/




/*

// Search customer by ID
// Search customer by Tel
const searchCustomer = (cusTel) => {
    if (!cusTel) {
        alert("Please enter a telephone number.");
        return;
    }

    const customer = customer_db_array.find(item => item.tel === cusTel);
    if (customer) {
        $("#cust_id").val(customer.cus_id);
        $("#cust_name").val(customer.name);
        $("#searchMessage").text("Customer in here");
    } else {
        $("#cust_id").val('');
        $("#cust_name").val('');
        $("#searchMessage").text("Customer not found.");
    }
};


// Search item by ID
const searchItem = (itmId) => {
    const item = item_db_array.find(item => item.item_id === itmId);
    if (item) {
        $("#itm_des").val(item.description);
        $("#qty_on_hand").val(item.qty);
        $("#itm_unit_price").val(item.unit_price);

    } else {
        alert("Item not found.");
    }
};

$(document).ready(function () {
    loadCustomersFromLocalStorage();
    loadItemsFromLocalStorage();


    $("#cust_tel").on("keydown", function (event) {
        if (event.key === "Enter") {
            const custTel = $(this).val();
            searchCustomer(custTel);
            event.preventDefault();
        }
    });

    // Search item when Enter is pressed
    $("#itm_id").on("keydown", function (event) {
        if (event.key === "Enter") {
            const itmId = $(this).val();
            searchItem(itmId);
            event.preventDefault();
        }
    });
});


/////////////////////////////////////////////////////////////////////////////////

let orderCount = 0;
let totalAmount = 0; // Variable to store the total amount
let currentOrderId; // Variable to hold the current Order ID
const cartItems = {}; // Object to track added items by item ID

const generateOrderId = () => {
    orderCount++;
    return `O00${orderCount}`;
};

const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const initializeOrderFields = () => {
    // Generate order ID and current date once during initialization
    currentOrderId = generateOrderId();
    $("#order_id").val(currentOrderId);
    $("#date").val(getCurrentDate());
};

const addToCart = () => {
    const orderId = $("#order_id").val(); // Order ID should already be set
    const date = $("#date").val(); // Date should already be set
    const qty = parseInt($("#ord_qty").val(), 10);
    const unitPrice = parseFloat($("#itm_unit_price").val()) || 0;
    const itemId = $("#itm_id").val(); // Assuming you have an input for item ID
    const itemKey = itemId; // Use item ID as a unique key for the cart
    const cusId = $("#cust_id").val(); // Use item ID as a unique key for the cart

    if (!orderId) {
        alert("Please enter an Order ID.");
        return;
    }

    if (!date) {
        alert("Please select a Date.");
        return;
    }

    // Check if item is already in the cart
    if (cartItems[itemKey]) {
        // Update quantity and total price for the existing item
        const existingItem = cartItems[itemKey];
        const newQty = existingItem.qty + qty; // Add new quantity to existing
        const newTotalPrice = newQty * unitPrice;

        // Update total amount
        totalAmount -= existingItem.totalPrice; // Subtract old total price
        totalAmount += newTotalPrice; // Add new total price

        // Update the table row
        $(`#row-${itemKey} .qty`).text(newQty); // Update displayed quantity
        $(`#row-${itemKey} .total`).text(newTotalPrice.toFixed(2)); // Update displayed total

        // Update cart item
        existingItem.qty = newQty; // Update quantity
        existingItem.totalPrice = newTotalPrice; // Update total price
    } else {
        // If the item is not in the cart, create a new entry
        const totalPrice = qty * unitPrice;

        // Append order details to the table
        $("#orderTableBody").append(`
            <tr id="row-${itemKey}">
                <td>${orderId}</td>
                <td>${itemId}</td> 
                <td>${cusId}</td>
                <td class="qty">${qty}</td>
                <td>${unitPrice.toFixed(2)}</td>
                <td class="total">${totalPrice.toFixed(2)}</td>
            </tr>
        `);

        // Update cart item tracking
        cartItems[itemKey] = {
            qty: qty,
            totalPrice: totalPrice,
        };

        // Update the total amount
        totalAmount += totalPrice; // Add the new item's total price to the overall total
    }

    $("#total").val(totalAmount.toFixed(2)); // Display the updated total

    // Reset quantity input
    $("#ord_qty").val('');
};

// Function to place the order and save order details
const placeOrder = () => {
    const orderId = generateOrderId(); // Generate new order ID each time
    $("#order_id").val(orderId); // Update the Order ID in the input field

    // Clear previous order details
    $("#orderDetailTableBody").empty();

    // Create an array to hold the order details
    const orderDetails = [];

    // Add each item in the cart to the order details table
    for (const [itemId, itemDetails] of Object.entries(cartItems)) {
        const orderRow = `
            <tr>
                <td>${$("#cust_id").val()}</td>  <!-- Assuming customer ID is input somewhere -->
                <td>${itemId}</td>
                <td>${itemDetails.qty}</td>
                <td>${itemDetails.totalPrice.toFixed(2)}</td>
            </tr>
        `;
        $("#orderDetailTableBody").append(orderRow);

        // Push the order detail to the array
        orderDetails.push({
            custId: $("#cust_id").val(),
            itemId: itemId,
            qty: itemDetails.qty,
            totalPrice: itemDetails.totalPrice.toFixed(2)
        });

        // Deduct quantity from the item_db_array
        let item = item_db_array.find(item => item.item_id === itemId);
        if (item) {
            item.qty -= itemDetails.qty; // Deduct the ordered quantity
            if (item.qty < 0) item.qty = 0; // Ensure quantity doesn't go negative
        }
    }

    // Save updated items to localStorage
    saveItemsToLocalStorage();

    // Save order details to localStorage
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    loadItemTable(); // Refresh the item table to reflect updated quantities

    // Reset the cart items and total amount
    totalAmount = 0;
    $("#total").val(totalAmount.toFixed(2));
    $("#orderTableBody").empty(); // Clear the cart display
    Object.keys(cartItems).forEach(itemKey => delete cartItems[itemKey]); // Clear the cartItems object

    // Optional: Reset input fields after placing the order
    $("#ord_qty").val('');
    $("#itm_id").val('');
    $("#itm_unit_price").val('');
};


// Attach event listener to the Place Order button
$("#placeOrder-btn").on("click", function () {
    placeOrder();
});

// Attach event listener to the Add to Cart button
$("#addToCart-btn").on("click", function () {
    addToCart();
});

// Initial call to populate Order ID and Date fields
$(document).ready(function () {
    initializeOrderFields();
});

// Event listener for the Pay input field to calculate balance
$("#pay").on("input", function () {
    const total = parseFloat($("#total").val()) || 0; // Get total amount
    const payAmount = parseFloat($(this).val()) || 0; // Get amount paid

    // Calculate the balance
    const balance = payAmount - total;

    // Set balance in the balance input field
    $("#balance").val(balance.toFixed(2)); // Display the balance
});
*/
