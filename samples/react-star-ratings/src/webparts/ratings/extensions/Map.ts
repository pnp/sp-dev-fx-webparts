interface Map<K, V> {
  keys(): K[];
  values(): V[];
}

Object.defineProperty(Map.prototype, 'keys', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function () {
    const array = [];
    this.forEach((value, key) => array.push(key));
    return array;
  }
});

Object.defineProperty(Map.prototype, 'values', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function () {
    const array = [];
    this.forEach((value, key) => array.push(value));
    return array;
  }
});
