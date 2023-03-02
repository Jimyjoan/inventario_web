import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { loginguardian } from "./login/loginguardian.service";
import { PopupComponent } from "./home/popup/popup.component";

const routes:Routes = [
    {path:'home', component: HomeComponent},
    {path:'', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(
            routes
        )
    ],
    exports: [RouterModule]
})

export class routing { }