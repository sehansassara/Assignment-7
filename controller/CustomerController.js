import CustomerModel from "../models/CustomerModel.js";
import { customer_db_array } from "../db/database.js";


const validateMobile = (cus_tel) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(cus_tel);
}


const validateCustomerName = (cus_name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(cus_name) && cus_name.trim().length > 0;
}


const validateAddress = (cus_address) => {
    return cus_address.trim().length > 0;
}

let customer_selected_index= null;


$("#search_button").on("click", function () {
    const searchTerm = $("#search").val().toLowerCase().trim();
    const filteredCustomers = customer_db_array.filter((customer) =>
        customer.cus_id.toLowerCase().includes(searchTerm) ||
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.address.toLowerCase().includes(searchTerm) ||
        customer.tel.includes(searchTerm)
    );

    loadSearchResults(filteredCustomers);
});


const loadSearchResults = (filteredCustomers) => {
    $("#results").empty();

    if (filteredCustomers.length > 0) {
        filteredCustomers.forEach((customer) => {
            let result = `<p>${customer.cus_id} - ${customer.name} - ${customer.address} - ${customer.tel}</p>`;
            $("#results").append(result);
        });
    } else {
        $("#results").html("<p>No results found</p>");
    }
};


const saveCustomersToLocalStorage = () => {
    localStorage.setItem("customer_db_array", JSON.stringify(customer_db_array));
}

const loadCustomersFromLocalStorage = () => {
    let savedData = localStorage.getItem("customer_db_array");
    if (savedData) {
        customer_db_array.splice(0, customer_db_array.length);
        JSON.parse(savedData).forEach((item) => {
            customer_db_array.push(new CustomerModel(item._cus_id, item._cus_name, item._cus_address, item._cus_tel));
        });
    }
}


const loadCustomerTable = () => {
    $("#customerTableBody").empty();

    customer_db_array.map((item) => {
        let data = `<tr>
                        <td>${item.cus_id}</td>
                        <td>${item.name}</td>
                        <td>${item.address}</td>
                        <td>${item.tel}</td>
                    </tr>`;
        $("#customerTableBody").append(data);
    });
}


$('#customerTableBody').on('click', 'tr', function() {
    let index = $(this).index();
    customer_selected_index = index;

    let customer_obj = customer_db_array[index];

    $("#cus_Id").val(customer_obj.cus_id);
    $("#cus_name").val(customer_obj.name);
    $("#cus_address").val(customer_obj.address);
    $("#cus_tel").val(customer_obj.tel);
});


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


    if (cus_id.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer ID",
        });
    } else if (!validateCustomerName(cus_name)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer Name",
        });
    } else if (!validateAddress(cus_address)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer Address",
        });
    } else if (!validateMobile(cus_tel)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    } else {
        let customer = new CustomerModel(cus_id, cus_name, cus_address, cus_tel);
        customer_db_array.push(customer);

        saveCustomersToLocalStorage();
        loadCustomerTable();
        clearCustomerFields();

        Swal.fire({
            title: 'Success!',
            text: 'Customer has been added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        generateCustomerId();
    }




});

// Clear input fields
const clearCustomerFields = () => {
    $("#cus_Id").val('');
    $("#cus_name").val('');
    $("#cus_address").val('');
    $("#cus_tel").val('');
};


// Delete customer
$("#customer_delete_btn").on("click", function () {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            // array eke remove karagannawa
            customer_db_array.splice(customer_selected_index, 1);

            // Update localStorage
            localStorage.setItem("customer_db_array", JSON.stringify(customer_db_array));

            // Clear the input fields
            clearCustomerFields();
            loadCustomerTable();
            generateCustomerId();

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
});



// Update customer
$("#customer_update_btn").on("click", function () {
    let index = customer_selected_index;
    let cus_id = $("#cus_Id").val();
    let cus_name = $("#cus_name").val();
    let cus_address = $("#cus_address").val();
    let cus_tel = $("#cus_tel").val();

    if (cus_id.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer ID",
        });
    } else if (!validateCustomerName(cus_name)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer Name",
        });
    } else if (!validateAddress(cus_address)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer Address",
        });
    } else if (!validateMobile(cus_tel)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    } else {
        let customer = new CustomerModel(cus_id, cus_name, cus_address, cus_tel);
        customer_db_array[customer_selected_index] = customer;

        saveCustomersToLocalStorage();
        loadCustomerTable();
        clearCustomerFields();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Customer has been updated",
            showConfirmButton: false,
            timer: 1500
        });
        generateCustomerId();
    }


});

