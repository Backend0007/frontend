import { Component, Injectable, OnInit } from '@angular/core';
import * as forge from  'node-forge';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})




export class EncryptionData  {   

    publicKey: string = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2RRF/W0Ws7rPcLIOLTQwy43l7kYi7Rqn1vO7PUa33dL33qxZrv1jz2bl/2cN31fF79wcjHV/DjgweZY2ra9ZAE1fSA3OhpU9ckqmF2qRBhcCKeqrJ37sPOaM6w/7MSQ2VxOFsflORNTWvwa3Dl0jWSEFEWzFSWD9WUdoXkQOuKse1JVd3HW+pALxUJaICm55QsbfodYY2WclahdqnFWYNzMK5yqflvh0vJf4h5+vVJWT3xU5g/sy5reOL1X5vQm59hESY4oBSjTlwdbA1sEnNI7dAaOoMmlJRRtPTfl4gOCvkN9bEDGMxCbwWso68c+kkpuOEFEd1XW9MHV7pFcmlEz+6E7Io2pk6J7GWd8ndooOvZTmoq6EFopKgquH/o0gK/NzH0ut71HAJRVJuk5C4+OU+R105RJJvJwdAfgyqOIevy+tGYXPtGqsjaH9XIR9rPE8HnfO3HMGY0BTtMUoAARxr6FHJiwUCgc4/dEsDXqr+v1kI9zKJ50CWTOh02TkCV3obd/gdThn8ovvku3YkL/TtCUafGWm1fv8t5Of9V2KlVHZrDr8sn5ShW0mbVAyAXkB4ya3ZVdaUoa1gYi8cH46KXzd53bgxsrmGF7AQvJCL2knhtlKD+OE9Nuhj+sqzgOWOL+CC+/8FdhIqRYw5CtgLkV+kVZZjoroKqJJJRsCAwEAAQ==
-----END PUBLIC KEY-----`;

    publicKeyAES: string = `QU82n3EWxxCoN4FR+bRTLksxx8HEv21My9H1tILm+rFWzFFgn6xWzIPxOZdKFiyw`;


    constructor(){}

    encryptCalls(value: string): string {
        const rsa = forge.pki.publicKeyFromPem(this.publicKey);
        const encrypted = rsa.encrypt(value.toString(), 'RSA-OAEP');
        return window.btoa(forge.util.encode64(encrypted));
    }


    encrypt(data: string): string {
        const encryptor = CryptoJS.AES.encrypt(data, this.publicKeyAES).toString();
        return  encryptor;

    }
    

}
