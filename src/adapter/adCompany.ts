import {ADPerson} from "./adPerson";
import {ADNode} from "./adNode";

export class ADCompany {
    name: string;
    structure: ADNode[];
    phone: string;
    gazPhone: string;
    fax: string;
    mail: string;
    address: string;

    titleWeight = new Map([
        ["Генеральный", 1],

        ["Заместитель генерального директора", 2],
        ["Главный бухгалтер", 2],
        ["Начальник филиала", 2],

        ["Заместитель главного", 3],
        ["Заместитель начальника филиала", 3],

        ["Начальник управления", 3],
        ["Начальник центра", 3],
        ["Начальник службы", 3],

        ["Заместитель начальника центра", 4],
        ["Заместитель начальника управления", 4],
        ["Заместитель начальника службы", 4],

        ["Начальник отдела", 5],
        ["Заместитель начальника отдела", 6],

        ["Главный механик", 5],
        ["Главный энергетик", 5],

        ["Руководитель группы", 7],
        ["Начальник лаборатории", 8],

        ["Главный специалист", 9],
        ["Главный юрисконсульт", 9],
        ["Главный технолог", 9],
        ["Главный аудитор", 9],
        ["Ведущий", 10],
        ["Техник", 12]
    ]);

    divisionWeight = new Map([
        ["Руководство", 1],
        ["Аппарат при руководстве", 2]
    ]);

    constructor(name: string, phone?: string, gazPhone?: string, fax?: string, mail?: string, address?: string) {
        this.name = name;
        this.structure = [];
        this.phone = phone;
        this.gazPhone = gazPhone;
        this.fax = fax;
        this.mail = mail;
        this.address = address;
    }

    public addPerson(person) {
        // Хардкод для учеток, которые есть и в недрах и ГГР, но организация у них стоит недра
        if (person.cn === 'Мязин Олег Гаврилович' && !person.mail) return 0;
        if (person.cn === 'Никонов Евгений Олегович' && !person.mail) return 0;
        if (person.cn === 'Новикас Жоржас Ромальдасович' && person.mail === 'g.novikas@ggr.gazprom.ru') return 0;
        //

        // Хардкод для учеток, у которых нет ни отдела, ни управления
        if (!person.departmentNumber && !person.division && !person.description) return 0;
        //

        let dep = null;
        if (person.division) {
            // Хак для НТЦ
            if (person.departmentNumber === "Руководство" && person.division !== "Руководство")
                person.departmentNumber = person.division;
            dep = this.addDivision(person.division);
        }

        if (!person.division && person.departmentNumber && !person.description) {
            dep = this.addDivision(person.departmentNumber);
        }

        if (person.division && person.departmentNumber) {
            if (person.division === person.departmentNumber) {
                dep = this.addDivision(person.division)
            } else
                dep = this.addDepartmentNumber(person.departmentNumber, person.division);
        }

        if (person.description && person.departmentNumber && person.division) {
            dep = this.addDescription(person.description, person.departmentNumber, person.division);
        }

        if (!person.division && person.departmentNumber && person.description) {
            dep = this.addDescription(person.description, person.departmentNumber)
        }


        // this.addDivision(person.division);
        //
        // // let dep = this.addDepartmentNumber(person.departmentNumber, person.division);
        // let dep;
        // // // Учетки у которых division === departmentNumber и они отдельные управления
        // if (person.division === person.departmentNumber){
        //     console.log("\naddPerson:");
        //     console.log(person);
        //     console.log("------------------");
        //     dep = this.getDivisionByName(person.departmentNumber);
        // }
        // else
        //     dep = this.addDepartmentNumber(person.departmentNumber, person.division);
        //
        // if (person.description && person.departmentNumber) {
        //     dep = this.addDescription(person.description, person.departmentNumber, person.division);
        // }
        // if (!person.division && person.departmentNumber) {
        //     dep = this.getDivisionByName(person.departmentNumber);
        //     // console.log("addPerson");
        //     // console.log(dep);
        // }
        if (dep != null) {
            try {
                const p = new ADPerson();
                p.cn = person.cn;
                p.title = person.title;
                if (person.cn !== "Белюскин Евгений Владимирович")
                    p.mail = person.mail;
                else
                    p.mail = "";
                p.telephoneNumber = person.telephoneNumber;
                p.mobile = person.mobile;
                p.ipPhone = person.ipPhone;
                p.facsimileTelephoneNumber = person.facsimileTelephoneNumber;
                p.l = person.l;
                p.weight = this.getPersonWeight(p);
                dep.persons.push(p);
                dep.persons = dep.persons.sort((n1, n2) => {
                    if (n1.weight > n2.weight) return 1;
                    if (n1.weight < n2.weight) return -1;
                    if (n1.cn.toUpperCase() > n2.cn.toUpperCase()) return 1;
                    if (n1.cn.toUpperCase() < n2.cn.toUpperCase()) return -1;
                    return 0;
                });
            } catch (e) {
                console.log(e);
                console.log(person);
                throw new Error('ERROR!!!!!!!!!!!!');
            }

        } else {
            console.log("addPerson IF:");
            console.log(person);
            throw new Error('ERROR!!!!!!!!!!!!');
        }
    }

    private getPersonWeight(person: ADPerson) {
        for (let [key, value] of this.titleWeight) {
            if (person.title.toUpperCase().includes(key.toUpperCase())) return value;
        }
        return 11;
    }

    private getDivisionWeight(division: string) {
        for (let [key, value] of this.divisionWeight) {
            if (division.toUpperCase().includes(key.toUpperCase())) return value;
        }
        return 99;
    }

    private addDivision(division: string): ADNode {
        if (!this.getDivisionByName(division) && division !== undefined) {
            const _adNode = new ADNode();
            _adNode.division = division;
            _adNode.weight = this.getDivisionWeight(division);
            this.structure.push(_adNode);
            this.structure = this.structure.sort((n1, n2) => {
                if (n1.weight > n2.weight) return 1;
                if (n1.weight < n2.weight) return -1;
                if (n1.division > n2.division) return 1;
                if (n1.division < n2.division) return -1;
                return 0;
            });
            return _adNode;
        } else if (this.getDivisionByName(division)) {
            return this.getDivisionByName(division)
        } else {
            return null;
        }
    }

    private addDepartmentNumber(departmentNumber: string, division?: string): ADNode {
        // У пользователя указан отдел, его нет в списке отделов, и есть управление
        if (departmentNumber && !this.getDepartmentNumberByName(departmentNumber) && division) {
            const _adNode = new ADNode();
            // Если у отдела есть управление
            // if (division) {
            const _division = this.getDivisionByName(division);
            _adNode.departmentNumber = departmentNumber;
            _division.child.push(_adNode);
            _division.child = _division.child.sort((n1, n2) => {
                if (n1.departmentNumber > n2.departmentNumber) return 1;
                if (n1.departmentNumber < n2.departmentNumber) return -1;
                return 0;
            });
            return _adNode;
            // }
        }
        // Похоже у пользователя отдел, который не в составе управления
        if (departmentNumber && !this.getDivisionByName(departmentNumber) && !division) {
            return this.addDivision(departmentNumber);
        }

        if (departmentNumber && !division) {
            return this.getDivisionByName(departmentNumber);
        }
        return this.getDepartmentNumberByName(departmentNumber);

        // if (departmentNumber && !this.getDepartmentNumberByName(departmentNumber)) {
        //     const _adNode = new ADNode();
        //     // Если у отдела есть управление
        //     if (division) {
        //     const _division = this.getDivisionByName(division);
        //     _adNode.departmentNumber = departmentNumber;
        //     _division.child.push(_adNode);
        //     _division.child = _division.child.sort((n1, n2) => {
        //         if (n1.departmentNumber > n2.departmentNumber) return 1;
        //         if (n1.departmentNumber < n2.departmentNumber) return -1;
        //         return 0;
        //     });
        //     return _adNode;
        //
        //     } else {
        //         // Самостоятельный отдел, без управления
        //         _adNode.division = departmentNumber;
        //         this.structure.push(_adNode);
        //         this.structure = this.structure.sort((n1, n2) => {
        //             if (n1.division > n2.division) return 1;
        //             if (n1.division < n2.division) return -1;
        //             return 0;
        //         });
        //         return _adNode;
        //     }
        // } else {
        //     if (departmentNumber && !division)
        //         return this.getDivisionByName(departmentNumber);
        //     else
        //         return this.getDepartmentNumberByName(departmentNumber);

    }

    private addDescription(description: string, departmentNumber: string, division?: string): ADNode {
        // Есть группа, есть отдел и есть подразделение
        if (description && !this.getDescriptionByName(description) && division && departmentNumber) {
            const desc = new ADNode();
            desc.description = description;
            let dep = this.addDepartmentNumber(departmentNumber, division);
            if (!dep && !division) {
                dep = this.addDivision(departmentNumber);
            }
            try {
                dep.child.push(desc);
            } catch (e) {
                console.log("ERROR addDescription: ");
                console.log(dep);
                console.log("\n");
                console.log(desc);
                console.log(`${description} - ${departmentNumber} - ${division}`);
            }
            dep.child = dep.child.sort((n1, n2) => {
                if (n1.description > n2.description) return 1;
                if (n1.description < n2.description) return -1;
                return 0;
            });
            return desc;
        }
        // Есть группа, есть отдел, но нет управления
        if (description && !division && departmentNumber && !this.getDescriptionByName(description)) {
            const desc = new ADNode();
            desc.description = description;
            console.log(desc);
            console.log('------------');
            const div = this.getDivisionByName(departmentNumber);
            console.log(div);
            div.child.push(desc);
            return desc;
        }
        return this.getDescriptionByName(description);
    }

    private getDivisionByName(name: string): ADNode {
        return this.structure.find(dep => dep.division === name);
    }

    private getDepartmentNumberByName(name: string): ADNode {
        return this.getItemByName(name, 'departmentNumber', this.structure);
    }

    private getDescriptionByName(name: string): ADNode {
        return this.getItemByName(name, 'description', this.structure);
    }

    private getItemByName(name: string, searchField: string, data: ADNode[]): ADNode {
        for (const d of data) {
            if (d[searchField] == name) {
                return d;
            }
            if (d.child) {
                let res = this.getItemByName(name, searchField, d.child);
                if (res) {
                    return res;
                }
            }
        }
    }
}