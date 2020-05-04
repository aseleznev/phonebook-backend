export class ADPerson {
    cn: string;
    title: string;
    mail: string;
    l: string;
    telephoneNumber: string;
    ipPhone: string;
    mobile: string;
    facsimileTelephoneNumber: string;
    weight: number;

    constructor(cn?: string,
                title?: string,
                mail?: string,
                l?: string,
                telephoneNumber?: string,
                mobile?: string,
                ipPhone?: string,
                facsimileTelephoneNumber?: string,
                weight?: number) {
        this.cn = cn;
        this.title = title;
        this.mail = mail;
        this.l = l;
        this.telephoneNumber = telephoneNumber;
        this.mobile = mobile;
        this.ipPhone = ipPhone;
        this.facsimileTelephoneNumber = facsimileTelephoneNumber;
        this.weight = weight;
    }
}