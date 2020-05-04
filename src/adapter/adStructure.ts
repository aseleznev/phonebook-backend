import {ADCompany} from "./adCompany";

export class ADPhoneBook {
    companies: ADCompany[];

    constructor() {
        this.companies = [];
    }

    public addPerson(person) {
        if (person.company !== undefined) {
            const c = this.addCompany(person.company);
            if (c) c.addPerson(person);
        }
    }

    private addCompany(company: string): ADCompany {
        if (!this.getCompanyByName(company) && company !== undefined) {
            switch (company) {
                case "ООО \"Газпром недра\"":
                    this.companies.push(new ADCompany(company, "(495)7195775",
                        "70095775", "(495)7195765",
                        "office@nedra.gazprom.ru",
                        "117418, г. Москва, ул. Новочеремушкинская, д. 65"));
                    break;
                case "Филиал \"Газпром недра НТЦ\" (г. Тюмень)":
                    this.companies.push(new ADCompany(company, "(3452)381980",
                        "72137500", "(3452)381981",
                        "ntc@nedra.gazprom.ru",
                        "625000, г. Тюмень, ул. Герцена, д. 70"));
                    break;
                default:
                    this.companies.push(new ADCompany(company));
                    break;
            }
            return this.companies[this.companies.length - 1];
        } else if (this.getCompanyByName(company)) {
            return this.getCompanyByName(company);
        } else {
            return null;
        }
    }

    private getCompanyByName(name: string): ADCompany {
        return this.companies.find(comp => comp.name === name);
    }
}