import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorService } from "./utilities/mat-paginator.service";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from "@ngx-translate/core";
import { MatListModule } from '@angular/material/list';


@NgModule({
    declarations: [
        // SearchPipe,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule
    ],
    exports: [
        // SearchPipe,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatCheckboxModule,
        MatDialogModule,
        MatMenuModule,
        MatToolbarModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSortModule,
        MatTabsModule,
        MatCardModule,
        MatButtonToggleModule,
        MatListModule,
        TranslateModule
    ],
    providers: [
        // { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        { provide: MatPaginatorIntl, useClass: MatPaginatorService },
    ]
})

export class SharedModule { }
