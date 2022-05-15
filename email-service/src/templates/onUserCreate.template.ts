import { LetterTemplateInterfaces } from '../types/letterTemplate.interfaces'
import { appName, sourceEmailDefaultFrom } from "../config/config";
import { OnUserCreateValuesType } from "../types/onUserCreateValues.type";

export class onUserCreateTemplate  {
    private readonly from = sourceEmailDefaultFrom;
    private readonly to: string;
    private readonly userName: string;
    private readonly subject: string;
    private readonly link: string;
    private readonly html: string;


    constructor ( emailValues: OnUserCreateValuesType ) {
        this.to = emailValues.email;
        this.userName = emailValues.userName;
        this.subject = `Welcome to ${ appName }. Confirm your Email`;
        this.link = emailValues.verificationLink;
        this.html = this.createBody();
    }

    createBody() {
       return `<p>Hello ${ this.userName }</p>
               <p>for activate your account click this link:</p>
               <a href=${this.link}>activate account</a>>`
    }

    getLetter(): Omit<LetterTemplateInterfaces, "getLetter"> {
        return {
            from: this.from,
            to: this.to,
            subject: this.subject,
            html: this.html,
        };
    }
}