class CProduct
{
    id;
    name;
    sku;
    description;
    images = [];

    constructor(model) {
        model.id && (this.id = model.id)
        this.name = model.name
        this.sku = model.sku
        this.description = model.description || ''
        this.images = model.images || []
    }

    plain() {
        return {
            id: this.id ? this.id : 0,
            name: this.name,
            sku: this.sku,
            description: this.description,
            images: this.images
        }
    }
}

module.exports = CProduct