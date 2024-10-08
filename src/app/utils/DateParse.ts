import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class DateParse{

public parseDate(dateString: string): Date{
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1,day)
}
}