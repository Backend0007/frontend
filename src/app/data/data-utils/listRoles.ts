import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ListRoles {
    public roles!: any[];


    constructor() {

        this.roles = [
                      'developpeur',
                      'administrateur',
                      'manager',
                      'utilisateur',
                      'responsable',
                    ]

    }
}