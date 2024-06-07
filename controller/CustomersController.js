import CustomerModel from "modle/CustomerModle";
import {customers} from "../db/db.js";
var recordIndexCustomers;

$('#nav-customers-section').on('click',() => {

    const home = $('.current-page-button');
    const orders = $('.Orders');
    const customers = $('.Customers');
    const items = $('.Items');

    // Hide/show relevant sections
    $('#home-section').hide();
    $('#orders-section').hide();
    $('#items-section').hide();
    $('#customers-section').show();


    // Define a function for styling buttons
    function styleButton(button) {
        button.css({
            background: 'none',
            color: 'darkslategrey',
            padding: '18px 28px',
            border: '30px',
            text: 'none',
            font: '700',
            cursor: 'pointer'
        });
    }

    /*Applying styles to buttons*/
    styleButton(home);
    styleButton(orders);
    styleButton(items);

    /*Define a function for hover effect*/
    function applyHoverEffect(button) {
        button.hover(function () {
            $(this).css({
                background: 'darkslategrey',
                color: '#FEE5D4'
            });
        }, function () {
            $(this).css({
                background: 'none',
                color: 'darkslategrey',
                padding: '18px 28px',
                border: '30px',
                text: 'none',
                font: '700'
            });
        });
    }

    /*Applying hover effect to buttons*/
    applyHoverEffect(home);
    applyHoverEffect(orders);
    applyHoverEffect(items);

    /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
    the css style in the orders page btn.This is because all the css is applied to one file (SPA)*/
    $(customers).hover(function (){
        $(this).css({
            background: 'darkslategrey',
            color: '#FEE5D4'
        });
    });
});


/**Add, Update, Delete, Clear All**/

function clearAll() {
    $('#txtCustomerID').val("");
    $('#txtName').val("");
    $('#txtAddress').val("");
    $('#txtPhoneNumber').val("");
}

function totalCustomers() {
    var total = customers.length;
    $('#count').text(total);
}

$('#btnClearAll-customer').on('click',() => {
    clearAll();
});

function loadCustomerTable() {
    $("#customers-table-tb").empty();

    customers.map((item,index) => {
        var customerRecord = `<tr>
                        <td class="c-id">${item.id}</td>
                        <td class="c-name">${item.name}</td>
                        <td class="c-address">${item.address}</td>
                        <td class="c-phoneNumber">${item.phoneNumber}</td>
                    </tr>`
        $('#customers-table-tb').append(customerRecord);
    });
}

$('#customers-table-tb').on('click','tr',function () {
    recordIndexCustomers = $(this).index();

    var id = $(this).find(".c-id").text();
    var name = $(this).find(".c-name").text();
    var address = $(this).find(".c-address").text();
    var phoneNumber = $(this).find(".c-phoneNumber").text();

    $('#txtCustomerID').val(id);
    $('#txtName').val(name);
    $('#txtAddress').val(address);
    $('#txtPhoneNumber').val(phoneNumber);
});

$('#addCustomers').on('click', () => {

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    let customerModel = new CustomerModel(customerID,customerName,customerAddress,phoneNumber);

    customers.push(customerModel);
    loadCustomerTable();
    clearAll();
    totalCustomers();
});

$('#btnDelete-customer').on('click',() => {
    customers.splice(recordIndexCustomers,1);
    loadCustomerTable();
    clearAll();
    totalCustomers();
});

$('#btnUpdate-customer').on('click',() => {

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    var cOb = customers[recordIndexCustomers];
    cOb.id = customerID;
    cOb.name = customerName;
    cOb.address = customerAddress;
    cOb.phoneNumber = phoneNumber;

    loadCustomerTable();
    clearAll();
    totalCustomers();
});

function searchCustomers(query) {
    const searchTerm = query.toLowerCase(); // Convert the search query to lowercase for case-insensitive search
    const searchResults = customers.filter(customer => {
        // Check if the customer ID or phone number contains the search term
        return customer.id.toLowerCase().includes(searchTerm) || customer.phoneNumber.toLowerCase().includes(searchTerm);
    });

    // Render search results
    renderSearchResults(searchResults);
}

function renderSearchResults(results) {

    // Render each search result in the table
    results.forEach(customer => {
        const customerRecord = `<tr>
            <td class="c-id">${customer.id}</td>
            <td class="c-name">${customer.name}</td>
            <td class="c-address">${customer.address}</td>
            <td class="c-phoneNumber">${customer.phoneNumber}</td>
        </tr>`;
        $('#customers-table-tb').append(customerRecord);

        $('#txtCustomerID').val(customer.id);
        $('#txtName').val(customer.name);
        $('#txtAddress').val(customer.address);
        $('#txtPhoneNumber').val(customer.phoneNumber);
    });
}

$('#txtSearch-customers').on('input', function() {
    const searchQuery = $(this).val();
    searchCustomers(searchQuery);
});