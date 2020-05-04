export class Company {
    name: string;
    phones: Array<any>;
    mail: string;
    address: string;
    departments: Array<Department>;

    constructor() {
        this.phones = new Array<any>();
        this.departments = new Array<Department>();
    }
}

export class People {
    name: string;
    position: string;
    email: string;
    location: string;
    weight: number;
    phones: Array<any>;

    // company: string;

    constructor() {
        this.phones = new Array<any>();
    }
}

export class Department {
    name: string;
    weight: number;
    subDepartments: Array<Department>;
    people: Array<People>;

    constructor() {
        this.subDepartments = new Array<Department>();
        this.people = new Array<People>();
    }
}