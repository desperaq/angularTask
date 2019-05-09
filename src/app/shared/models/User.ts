export class User {
    id: string;
    name: string;
    password: string;
}
export class UserDetails {
    constructor(
        public id: string,
        public name: string,
        public emailId: string
    ) {
        this.id = id;
        this.name = name;
        this.emailId = emailId;
    }
}