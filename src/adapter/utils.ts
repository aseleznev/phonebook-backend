export class Utils {
    static formatPhoneGaz(phone: string): string {
        // v1.0 газовый 721 38641
        // v2.0 газовые: 721 229-97
        if (!phone) return null;
        if (phone.length > 10 || phone.length < 6)
            console.log("formatPhoneGaz:" + phone);
        let result = phone.replace(/[^+\d]/g, '');
        // return result.slice(0, 3) + ' ' + result.slice(3, result.length);
        return result.replace(/(\d{3})(\d{3})(\d{2})/, "$1 $2-$3");
    }

    static formatPhoneCity(phone: string): string {
        // v1.0 городской +7 3452 54 09 61 / +7 495 719 30 87
        // v2.0 городские: +7 3452 56-12-14, +7 495 234-90-11
        if (!phone) return null;
        if (phone.length > 12 || phone.length < 7)
            console.log("formatPhoneCity:" + phone);
        let result = phone.replace(/[^+\d]/g, '');
        switch (result.slice(0, 3)) {
            // Красноярск
            case "391":
            // Москва
            case "495":
            // Питер
            case "812":
                result = result.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 $1 $2-$3-$4");
                break;
            default:
                result = result.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, "+7 $1 $2-$3-$4");
                break;
        }
        return result;
    }

    static formatPhoneMobile(phone: string): string {
        // v1.0 мобильный +7 982 948 15 25
        // v.2.- +7 908 200-50-59
        if (!phone) return null;
        if (phone.length > 11 || phone.length < 10)
            console.log("formatPhoneMobile:" + phone);
        return phone.slice(-10).replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 $1 $2-$3-$4");
    }

    static getFormattedDate(): string {
        const date = new Date();

        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year + ' г.';
    }

    static formatQuotes(name: string): string {
        return name.replace(/"(.*?)"/, "«$1»");
    }
}