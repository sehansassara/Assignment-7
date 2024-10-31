export default  class CustomerModel{
    constructor(id,name,address,tel) {
        this._cus_id = id;
        this._cus_name = name;
        this._cus_address = address;
        this._cus_tel = tel;
    }


    get cus_id() {
        return this._cus_id;
    }

    set cus_id(value) {
        this._cus_id = value;
    }


    get name() {
        return this._cus_name;
    }

    set name(value) {
        this._cus_name = value;
    }

    get address() {
        return this._cus_address;
    }

    set address(value) {
        this._cus_address = value;
    }

    get tel() {
        return this._cus_tel;
    }

    set tel(value) {
        this._cus_tel = value;
    }
}