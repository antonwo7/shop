class CUser
{
    id;
    email;
    name;
    role;
    is_activated;

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.email = model.email
        this.role = model.role
        this.is_activated = model.is_activated
    }

    plain() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role
        }
    }
}

module.exports = CUser