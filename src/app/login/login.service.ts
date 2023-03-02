import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, signOut} from '@firebase/auth';

@Injectable()
export class loginService
{
    token: string;

    constructor(private router:Router){}

    login(email:string, password:string)
    {
        const auth = getAuth();
        
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, email, password)
            .then(
                response =>{
                    auth.currentUser?.getIdToken().then(
                        token => {
                            this.token = token;
                            this.router.navigate(['/home']);
                            }
                        )
                    }
                )
            }
        )
    }

    getIdToken()
    {
        return this.token;
    }

    isAutenticado()
    {
        return this.token != null;
    }

    logout()
    {
        const auth = getAuth();
        signOut(auth).then(() => {
            this.token = "";
            this.router.navigate(['']);
        }).catch(error => console.log("error logout:" + error));
    }
}