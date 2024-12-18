import {customer_db_array, item_db_array, orderDetails_array} from "../db/database.js"

const updateCounts = () => {
    const customerCount = customer_db_array.length;
    const itemCount = item_db_array.length;
    const orderCount = orderDetails_array.length;
    let savedData = localStorage.getItem("orderCount");

    console.log(savedData);

    $("#customerCount").text(customerCount);
    $("#itemCount").text(itemCount);
    $("#orderCount").text(savedData-1);


    const ctx = document.getElementById('overviewPieChart').getContext('2d');

    // Initialize the pie chart
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Customers', 'Items', 'Orders'],
            datasets: [{
                data: [customerCount, itemCount, savedData],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const value = tooltipItem.raw;
                            return `${tooltipItem.label}: ${value}`;
                        }
                    }
                }
            }
        }
    });
};

$(document).ready(function () {
    updateCounts();
});

