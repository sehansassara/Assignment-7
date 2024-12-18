export default class Order {
    constructor(orderID, customer, items) {
        this._orderID = orderID;
        this._customerID = customer._custId;
        this._items = items;
        this._date = new Date();
        this._total = this.calculateTotal();
        this._customer = customer;
    }

    addItem(itemId, quantity, totalPrice) {
        const item = {
            itemId,
            quantity,
            price: totalPrice,
        };
        this._items.push(item); // Add item to the items array
        this._total = this.calculateTotal();
    }

    calculateTotal() {
        return this._items.reduce((accumulator, item) => {
            return accumulator + parseFloat(item.price);
        }, 0);
    }

    get orderID() {
        return this._orderID;
    }

    set orderID(value) {
        this._orderID = value;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    get customerID() {
        return this._customerID;
    }

    set customerID(value) {
        this._customerID = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}