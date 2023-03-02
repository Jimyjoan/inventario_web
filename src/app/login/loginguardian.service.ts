import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { loginService } from "./login.service";

@Injectable()
export class loginguardian implements CanActivate
{
    constructor(private logins:loginService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        if (this.logins.isAutenticado())
        {
            return true;
        }
        else
        {
            this.router.navigate(['']);
            return false;
        }
    }
}