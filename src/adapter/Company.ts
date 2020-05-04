export class Company {
    name: string;
    phones: Array<any>;
    email: string;
    address: string;
    subDepartments: Array<Department>;
    people: Array<People>;

    constructor() {
        this.phones = new Array<any>();
        this.subDepartments = new Array<Department>();
        this.people = new Array<any>();
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