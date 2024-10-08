import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class  RoleStucker{

    private usr: string[] = ['utilisateur'];
    private mng: string[] = ['utilisateur','manager','responsable'];
    private rsp: string[] = ['utilisateur','manager','responsable'];
    private adm: string[] = ['utilisateur','manager', 'responsable','administrateur'];
    private dev: string[] = ['utilisateur','manager','responsable','administrateur','developper',''];
    
    

    constructor(){}




    roleManagement(roleUser: String): any[]{
        let roles: any[] = [ ];


        if(roleUser === 'utilisateur'){
           roles = this.usr;
        }

        if(roleUser === 'manager'){
            roles = this.mng;
         }

        if(roleUser === 'responsable'){
            roles = this.rsp;
         }

         if(roleUser === 'administrateur'){
            roles = this.adm;
         }

         if(roleUser === 'developpeur'){
            roles = this.dev;
         }

        return roles;
    }



    serviceManagement(serviceUser: String): any[]{
        let service: any[] = [ ];
        if(serviceUser === 'developpeur'){
           
           return service = [
                'ressources_humaines',
                'management',
                'finance',
                '',
            ]
        }
        if(serviceUser === 'administrateur'){
           
           return service = [
                'ressources_humaines',
                'management',
                'finance',
            ]
        }

        if(serviceUser === 'ressources_humaines'){
           
            return service = [
                 'ressources_humaines',
             ]
         }

        return service;
    }
}