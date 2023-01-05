import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations: [LoginComponent],
    imports: [LoginRoutingModule, ReactiveFormsModule],

})

export class LoginModule { }