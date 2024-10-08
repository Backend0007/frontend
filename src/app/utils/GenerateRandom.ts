import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class GenerateRandom{
    constructor() {
    }

    public generateRandomId(length: number = 8): string {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for(let i = 0; i < length; i++){
            const _randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[_randomIndex];
        }
        return result;
      }
}