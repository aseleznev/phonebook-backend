import { ADCompany } from './adCompany';
import { WorkerEntity } from '../database/worker/worker.entity';

export class ADPhoneBook {
    companies: ADCompany[];

    constructor() {
        this.companies = [];
    }

    public addPerson(person: WorkerEntity) {
        if (person.company !== undefined) {
            const c = this.addCompany(person.company);
            if (c) c.addPerson(person);
        }
    }

    private addCompany(company: string): ADCompany {
        if (!this.getCompanyByName(company) && company !== undefined) {
            switch (company) {
                case 'ООО "Торговля и сервис"':
                    this.companies.push(
                        new ADCompany(
                            company,
                            '(444)9394933',
                            '70055555',
                            '(444)9394933',
                            'trade@phones.ru',
                            '000000, мой адрес не дом и не улица'
                        )
                    );
                    break;
                case 'Филиал "Торговля и сервис':
                    this.companies.push(
                        new ADCompany(
                            company,
                            '(444)9394933',
                            '70055555',
                            '(444)9394933',
                            'trade@phones.ru',
                            '000000, мой адрес не дом и не улица'
                        )
                    );
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
