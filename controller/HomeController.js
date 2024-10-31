import {customer_db_array, item_db_array, orderDetails_array} from "../db/database.js"

const updateCounts = () => {
    const customerCount = customer_db_array.length;
    const itemCount = item_db_array.length;
    const orderCount = orderDetails_array.length;


    $("#customerCount").text(customerCount);
    $("#itemCount").text(itemCount);
    $("#orderCount").text(orderCount);
};

$(document).ready(function () {
    updateCounts();
});