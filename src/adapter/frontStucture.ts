import {ADCompany} from "./adCompany";
import {Company, Department, People} from "./Company";
import {ADPhoneBook} from "./adStructure";
import {Utils} from "./utils";
import {ADPerson} from "./adPerson";

export class FrontStucture {
    private companies: Array<Company>;
    private phoneBook: ADPhoneBook;

    constructor() {
        this.companies = new Array<Company>();
        this.phoneBook = new ADPhoneBook();
    }

    public addPeople(people: Array<any>) {
        people.forEach(user => {
            if (
                (user.telephoneNumber || user.ipPhone || user.mobile || user.facsimileTelephoneNumber || user.cn === "Черепанов Всеволод Владимирович")
                && user.company !== "ООО \"Газпром геологоразведка\""
                && user.company !== "НПФ \"Инжиниринговый центр\" (г. Раменское)"
            // && user.company !== "Филиал \"Газпром недра НТЦ\" (г. Тюмень)"
            ) {
                this.phoneBook.addPerson(user);
            }
        });

        this.phoneBook.companies.forEach(company => {
            let _company: Company = new Company();
            _company.name = company.name;
            _company.address = company.address;
            _company.email = company.mail;
            _company.phones.push({type: "Городской", number: Utils.formatPhoneCity(company.phone)});
            _company.phones.push({type: "Газовый", number: Utils.formatPhoneGaz(company.gazPhone)});
            _company.phones.push({type: "Факс", number: Utils.formatPhoneCity(company.fax)});

            if (company.structure.length > 0) {
                company.structure.forEach(child => {
                    let department1: Department = new Department();
                    department1.name = child.division || child.departmentNumber || child.description;

                    if (child.persons.length > 0) {
                        child.persons.forEach(person => {
                            department1.people.push(this.convertPerson(person));
                        });
                    }

                    if (child.child.length > 0) {
                        child.child.forEach(child2 => {
                            let department2: Department = new Department();
                            department2.name = child2.division || child2.departmentNumber || child2.description;
                            if (child2.persons.length > 0) {
                                child2.persons.forEach(person => {
                                    department2.people.push(this.convertPerson(person));
                                });
                            }
                            if (child2.child.length > 0) {
                                child2.child.forEach(child3 => {
                                    let department3: Department = new Department();
                                    department3.name = child3.division || child3.departmentNumber || child3.description;
                                    if (child3.persons.length > 0)
                                        child3.persons.forEach(person => {
                                            department3.people.push(this.convertPerson(person));
                                        });
                                    department2.subDepartments.push(department3);
                                });
                            }
                            department1.subDepartments.push(department2);
                        });
                    }
                    _company.subDepartments.push(department1);
                })
            }

            this.companies.push(_company);
        });


    }

    public getCompanies(): Company[] {
        return this.companies;
    }

    public getCompanyByName(name: string): Company {
        return this.companies.find(company => company.name === name);
    }

    private buildTree(company: Company, adCompany: ADCompany) {
        // company.departments.p
    }

    private convertPerson(person: ADPerson): People {
        let result: People = new People();
        result.name = person.cn;
        result.email = person.mail;
        result.location = person.l;
        result.position = person.title;
        result.weight = person.weight;
        result.phones.push({type: "Городской", number: Utils.formatPhoneCity(person.ipPhone)});
        result.phones.push({type: "Газовый", number: Utils.formatPhoneGaz(person.telephoneNumber)});
        result.phones.push({type: "Факс", number: Utils.formatPhoneCity(person.facsimileTelephoneNumber)});
        return result;
    }
}