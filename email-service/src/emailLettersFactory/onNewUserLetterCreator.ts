import { LetterCreatorInterfaces } from '../contracts/emailLettersFactory/letterCreator.interfaces'
import { appName } from "../config/config";
import { SafeUserType } from "../contracts/safeUser.type";

export class onNewUserLetterCreator extends LetterCreatorInterfaces {
    constructor ( user: SafeUserType ) {
        super()
        this.userId = user.userId;
        this.to = user.email;
        this.userName = user.userName;
        this.subject = `Welcome to ${ appName }. Confirm your Email`
    }

    createBody() {
       return `<p>Hello ${ this.userName }</p>
               <p>for activate your account click this link:</p>
               <a href=""></a>>`
    }

    getLetter(): Omit<LetterCreatorInterfaces, "getLetter"> {
        return {
            html: this.html,
            to: this.to,
            from: this.from ? this.from : undefined,
            subject: this.subject,
        };
    }


}