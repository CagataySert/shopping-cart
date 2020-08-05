class Category {
  constructor(title, parent) {
    this._title = title;
    this._parent = parent;
  }

  get title() {
    return this._title;
  }

  get parent() {
    return this_parent;
  }
}

module.exports = Category;
