export default class IPersona {
    public name: string;
    public email: string;
    public phone: string;
    public photo: string;

    constructor(name: string, email: string, phone: string, photo: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
    }
}