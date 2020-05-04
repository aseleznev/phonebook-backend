export class ADNode {
    division: string;
    departmentNumber: string;
    description: string;
    weight: number;
    child: ADNode[];
    persons: Array<any>;

    constructor(division?: string,
                departmentNumber?: string,
                description?: string,
                weight?: number) {
        this.child = [];
        this.departmentNumber = departmentNumber;
        this.description = description;
        this.weight = weight;
        this.persons = [];
    }
}