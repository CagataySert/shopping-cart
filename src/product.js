class Product {
  constructor(title, price, category) {
    this._title = title;
    this._price = price;
    this._category = category;
  }

  get title() {
    return this._title;
  }

  get price() {
    return this._price;
  }

  get category() {
    return this._category;
  }
}

module.exports = Product;
