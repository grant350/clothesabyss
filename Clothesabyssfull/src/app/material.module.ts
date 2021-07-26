import { NgModule  } from '@angular/core'
import {  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatSliderModule,
  MatPaginatorModule} from '@angular/material'
  import { FormsModule }   from '@angular/forms';


const material = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTooltipModule,
  MatSliderModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
]


@NgModule({
imports:[material, FormsModule],
exports:[material]
})
export class MaterialModule{}
