import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { SidenavComponent } from "./side/sidenav.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidenavComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        SharedModule,

    ],
    exports: [
        LayoutComponent,
    ]
})

export class LayoutModule { }