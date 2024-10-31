import ItemModel from "../models/ItemModel.js";
import {item_db_array} from "../db/database.js"


let item_selected_index = null;


const saveItemsToLocalStorage = () => {
    localStorage.setItem("item_db_array", JSON.stringify(item_db_array));
}

const loadItemsFromLocalStorage = () => {
    let savedData = localStorage.getItem("item_db_array");
    if (savedData) {
        item_db_array.splice(0, item_db_array.length);
        JSON.parse(savedData).forEach((item) => {
            item_db_array.push(new ItemModel(item._item_id, item._description, item._qty, item._unit_price));
        });
    }
};



// Search Item
$("#search_button2").on("click", function () {
    const searchTerm = $("#searchId").val().toLowerCase().trim();

    const filteredItems = item_db_array.filter((item) =>
        item._item_id.toLowerCase().includes(searchTerm) ||
        item._description.toLowerCase().includes(searchTerm) ||
        item._qty.toString().includes(searchTerm) ||
        item._unit_price.toString().includes(searchTerm)
    );

    displaySearchResults(filteredItems);
});

const displaySearchResults = (filteredItems) => {
    $("#results-it").empty();

    if (filteredItems.length > 0) {
        filteredItems.forEach((item) => {
            let result = `<p>${item._item_id} - ${item._description} - ${item._qty} - ${item._unit_price}</p>`;
            $("#results-it").append(result);
        });
    } else {
        $("#results-it").html("<p>No results found</p>");
    }
};

const loadItemTable = () => {
    $("#itemTableBody").empty();

    item_db_array.forEach((item) => {
        let data = `<tr>
                        <td>${item._item_id}</td>
                        <td>${item._description}</td>
                        <td>${item._qty}</td>
                        <td>${item._unit_price}</td>
                    </tr>`;
        $("#itemTableBody").append(data);
    });
};


$('#itemTableBody').on('click', 'tr', function() {
    let index = $(this).index();
    item_selected_index = index;

    let item_obj = item_db_array[index];

    $("#item_ID").val(item_obj._item_id);
    $("#description").val(item_obj._description);
    $("#qty").val(item_obj._qty);
    $("#unit_price").val(item_obj._unit_price);
});

$(document).ready(function () {
    loadItemsFromLocalStorage();
    loadItemTable();
    generateItemId();
});


    const generateItemId = () => {
        let newItemId = 'I001';
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


    $("#item_save_btn").on("click", function () {
        let item_id = $("#item_ID").val();
        let description = $("#description").val();
        let qty = $("#qty").val();
        let unit_price = $("#unit_price").val();


        if(item_id.length===0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Item ID",
            });
        } else if(description.length===0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Item Description",
            });
        } else if(qty.length===0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Quantity",
            });
        } else if(unit_price.length===0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Unit Price",
            });
        } else {
            let newItem = new ItemModel(item_id, description, qty, unit_price);
            item_db_array.push(newItem);

            saveItemsToLocalStorage();
            loadItemTable();
            clearFields();

        }
        Swal.fire({
            title: 'Success!',
            text: 'Item has been added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        generateItemId();
    });




    const clearFields = () => {
        $("#item_ID").val('');
        $("#description").val('');
        $("#qty").val('');
        $("#unit_price").val('');
    };




// Delete item
    $("#item_delete_btn").on("click", function () {
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

                item_db_array.splice(item_selected_index,1);

                localStorage.setItem("item_db_array", JSON.stringify(item_db_array));

                loadItemTable();
                clearFields();
                generateItemId();

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



// Update item
    $("#item_update_btn").on("click", function () {
        let index = item_selected_index;

        let item_id = $("#item_ID").val();
        let description = $("#description").val();
        let qty = $("#qty").val();
        let unit_price = $("#unit_price").val();

        if (!description || !qty || !unit_price) {
            alert("Please fill all the fields!");
            return;
        }

        if(item_id.length===0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Item ID",
            });
        } else if(description.length===0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Item Description",
            });
        } else if(qty.length===0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Quantity",
            });
        } else if(unit_price.length===0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Unit Price",
            });
        } else {
            let newItem = new ItemModel(item_id, description, qty, unit_price);
            item_db_array[item_selected_index] = newItem;

            saveItemsToLocalStorage();
            loadItemTable();
            clearFields();
        }
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item has been updated",
            showConfirmButton: false,
            timer: 1500
        });

        generateItemId();
    });

