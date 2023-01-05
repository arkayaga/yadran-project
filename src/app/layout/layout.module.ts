import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports:[
        LayoutComponent
    ]
})

export class LayoutModule { }