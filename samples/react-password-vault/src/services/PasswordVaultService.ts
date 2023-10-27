import * as CryptoJS from 'crypto-js';
import { isNullOrEmpty, toBoolean } from '@spfxappdev/utility';
import { SessionStorage } from '@spfxappdev/storage';
import { ModuleType } from '@src/models';


export interface IPasswordVaultService {
    decryptModuleData(moduleType: ModuleType, encryptedData: string): string;
    encryptModuleData(moduleType: ModuleType, plainData: string): string;
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

    private encryptedMasterPWInstanceId: string = "";

    private secretWasSet: boolean = false;

    private isVaultOpen: boolean = false;

    private get plainMasterPW() : string {
        return this.decrypt(this.encryptedMasterPw, this.masterSecretKey);
    }

    private encryptedMasterPw: string = "";

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
        this.encryptedInstanceId = CryptoJS.HmacSHA256(instanceId, instanceId).toString();
        this.setSecret(`SPFxAppDevSecret_${instanceId}`);
        this.encryptedMasterPWInstanceId = CryptoJS.HmacSHA256(`${instanceId}_Master`, this.masterSecretKey).toString();

        const cacheSettings = {
            ...SessionStorage.DefaultSettings, 
            ...{
                DefaultTimeToLife: 5
            }
        };

        this.cache = new SessionStorage(cacheSettings);
        this.isVaultOpen = toBoolean(this.cache.get(this.encryptedInstanceId));
        const pwFromCache = this.cache.get(this.encryptedMasterPWInstanceId);
        this.encryptedMasterPw = isNullOrEmpty(pwFromCache) ? "" : pwFromCache;

        if(!isNullOrEmpty(this.encryptedMasterPw)) {
            const plainPassword: string = this.decrypt(this.encryptedMasterPw, this.masterSecretKey);
            this.hashedMasterPw = CryptoJS.HmacSHA256(plainPassword, this.masterSecretKey).toString();
        }
    }

    public encryptModuleData(moduleType: ModuleType, plainData: string): string {
        switch(moduleType) {
            case ModuleType.UserField: return this.encryptUsername(plainData);
            case ModuleType.PasswordField: return this.encryptPassword(plainData);
            case ModuleType.NoteField: return this.encryptNote(plainData)
        }
    }

    public decryptModuleData(moduleType: ModuleType, encryptedData: string): string {
        if(!this.isVaultOpen) {
            return "";
        }

        switch(moduleType) {
            case ModuleType.UserField: return this.decryptUsername(encryptedData);
            case ModuleType.PasswordField: return this.decryptPassword(encryptedData);
            case ModuleType.NoteField: return this.decryptNote(encryptedData)
        }
    }

    public open(masterPW: string, encryptedMasterPW: string): boolean {
        const masterPWEncrypted = CryptoJS.HmacSHA256(masterPW, this.masterSecretKey);
        
        if(masterPWEncrypted.toString() === encryptedMasterPW) {
            this.isVaultOpen = true;
            this.cache.set(this.encryptedInstanceId, true);
            this.encryptedMasterPw = this.encrypt(masterPW, this.masterSecretKey);
            this.cache.set(this.encryptedMasterPWInstanceId, this.encryptedMasterPw);
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
        this.cache.set(this.encryptedInstanceId, false);
        this.cache.remove(this.encryptedMasterPWInstanceId);
        this.encryptedMasterPw = "";
    }

    public setMasterPassword(plainPassword: string): string {
        this.encryptedMasterPw = this.encrypt(plainPassword, this.masterSecretKey);
        this.hashedMasterPw = CryptoJS.HmacSHA256(plainPassword, this.masterSecretKey).toString();
        this.cache.set(this.encryptedMasterPWInstanceId, this.encryptedMasterPw);
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

        const bytes  = CryptoJS.AES.decrypt(encryptedText, secret);
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
        return this.encrypt(note, this.noteSecretKey);
    }

    private decryptNote(encryptedNote: string): string {
        return this.decrypt(encryptedNote, this.noteSecretKey);
    }
}