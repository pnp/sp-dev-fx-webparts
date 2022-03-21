import * as CryptoJS from 'crypto-js';
import { isNullOrEmpty, toBoolean } from '@spfxappdev/utility';
import { SessionStorage } from '@spfxappdev/storage';
import { IVaultData } from '@src/interfaces/IVaultData';


export interface IPasswordVaultService {
    // encryptPassword(password: string): string;
    // decryptPassword(encryptedPassword: string): string;
    // encryptUsername(username: string): string;
    // decryptUsername(encryptedUsername: string): string;
    // encryptDescription(description: string): string;
    // decryptDescription(encryptedDescription: string): string;
    encryptData(plainData: IVaultData): IVaultData;
    decryptData(encryptedData: IVaultData): IVaultData;
    open(masterPW: string, encryptedMasterPW: string): boolean;
    isOpen(): boolean;
    close(): void;
    setMasterPassword(plainPassword: string): string;
}


export class PasswordVaultService implements IPasswordVaultService {

    private cache: SessionStorage = null;

    private secretKey: string = "SPFxAppDevSecret";

    private instanceId: string = "";

    private encryptedInstanceId: string = "";

    private secretWasSet: boolean = false;

    private isVaultOpen: boolean = false;

    private plainMasterPW: string = "";

    private hashedMasterPw: string = "";

    private get masterSecretKey(): string {
        return `${this.secretKey}_M@5t€r`;
    }

    private get userNameSecretKey(): string {
        return `${this.secretKey}_U5€r_${this.plainMasterPW}`;
    }

    private get passwordSecretKey(): string {
        return `${this.secretKey}_P@5Sw0Rd_${this.plainMasterPW}`;
    }

    private get noteSecretKey(): string {
        return `${this.secretKey}_n0t3_${this.plainMasterPW}`;
    }

    constructor(instanceId: string) {

        this.instanceId = instanceId;
        this.encryptedInstanceId = this.encrypt(instanceId, instanceId);
        this.setSecret(`SPFxAppDevSecret_${instanceId}`);

        this.cache = new SessionStorage(
            {
            ...SessionStorage.DefaultSettings, 
            ...{
                DefaultTimeToLife: 5
            }
        });

        this.isVaultOpen = toBoolean(this.cache.get(this.encryptedInstanceId));

        
    }

    public encryptData(plainData: Omit<IVaultData, "masterPW">): IVaultData {
        return {
            masterPW: this.hashedMasterPw,
            username: this.encryptUsername(plainData.username),
            password: this.encryptPassword(plainData.password),
            note: this.encryptNote(plainData.note)
        };
    }

    public decryptData(encryptedData: IVaultData): IVaultData {

        if(!this.isVaultOpen) {
            return {
                masterPW: "",
                username: "",
                password: "",
                note: ""
            };
        }

        return {
            masterPW: "",
            username: this.decryptUsername(encryptedData.username),
            password: this.decryptPassword(encryptedData.password),
            note: this.decryptNote(encryptedData.note)
        };
    }

    public open(masterPW: string, encryptedMasterPW: string): boolean {
        const masterPWEncrypted = CryptoJS.HmacSHA256(masterPW, this.masterSecretKey);
        
        if(masterPWEncrypted.toString() == encryptedMasterPW) {
            this.isVaultOpen = true;
            // this.cache.set(this.encryptedInstanceId, true);
            this.plainMasterPW = masterPW;
            this.hashedMasterPw = masterPWEncrypted.toString();
            return true;            
        }

        return false;
    }

    
    public isOpen(): boolean {
        return this.isVaultOpen;
    }

    public close(): void {
        this.isVaultOpen = false;
        // this.cache.set(this.encryptedInstanceId, false);
        this.plainMasterPW = "";
    }

    public setMasterPassword(plainPassword: string): string {
        this.plainMasterPW = plainPassword;
        this.hashedMasterPw = CryptoJS.HmacSHA256(plainPassword, this.masterSecretKey).toString();
        return this.hashedMasterPw;
    }

    private setSecret(secretKey: string): void {
        if(this.secretWasSet) {
            return;
        }

        this.secretWasSet = true;
        this.secretKey = secretKey;
    }

    private encrypt(text: string, secret: string): string {
        if(isNullOrEmpty(text)) {
            return null;
        }

        return CryptoJS.AES.encrypt(text, secret).toString(CryptoJS.format.OpenSSL);
    }

    private decrypt(encryptedText: string, secret: string): string {
        if(isNullOrEmpty(encryptedText)) {
            return null;
        }

        var bytes  = CryptoJS.AES.decrypt(encryptedText, secret);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    private encryptPassword(password: string): string {
        return this.encrypt(password, this.passwordSecretKey);
    }

    private decryptPassword(encryptedPassword: string): string {
        return this.decrypt(encryptedPassword, this.passwordSecretKey);
    }

    private encryptUsername(username: string): string {
        return this.encrypt(username, this.userNameSecretKey);
    }

    private decryptUsername(encryptedUsername: string): string {
        return this.decrypt(encryptedUsername, this.userNameSecretKey);
    }

    private encryptNote(note: string): string {
        return this.encrypt(note, this.noteSecretKey)
    }

    private decryptNote(encryptedNote: string): string {
        return this.decrypt(encryptedNote, this.noteSecretKey);
    }
}