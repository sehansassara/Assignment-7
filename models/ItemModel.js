export default class ItemModel{
    constructor(item_id, description, qty, unit_price) {
        this._item_id = item_id;
        this._description = description;
        this._qty = qty;
        this._unit_price = unit_price;
    }


    get item_id() {
        return this._item_id;
    }

    set item_id(value) {
        this._item_id = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get unit_price() {
        return this._unit_price;
    }

    set unit_price(value) {
        this._unit_price = value;
    }

    deductQuantity(amount) {
        this.qty = Math.max(0, this.qty - amount); // Ensure quantity doesn't go negative
    }
}