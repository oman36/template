### Результат верстки
[http://oman.esy.es/template](http://oman.esy.es/template)

### Задание по js
```js
class Product {
    constructor ({id,name,price,description = ''}){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
    withDiscount(){
        let count = 0;
        let temp_value = this.price;
        while (temp_value) {
            (temp_value & 1 ) ? count++ : null;
            temp_value = temp_value << 1;
        }
        return this.price * (1 + count / 100);
    }
    setPrice(price) {
        this.price = price;
    }
}

class Products {
    constructor(json){
        let products = JSON.parse(json);
        if ( Array.isArray(products)){
            !(Array.isArray(this.products)) ? this.products = [] : null;
            for (let x of products) this.products.push(new Product(x));
        }
    }
    getProducts() {
        return this.products;
    }
    getProduct(id) {
        for(var idx = 0,l = this.products.length;
            this.products[idx] && this.products[idx].id !== id;
            idx++){}
        return idx === l ? -1 : this.products[idx];
    }
}
```