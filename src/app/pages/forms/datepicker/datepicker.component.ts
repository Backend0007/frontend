import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DatePipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FlatpickrModule } from '../../../Component/flatpickr/flatpickr.module';


@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [PageTitleComponent, FormsModule, CommonModule, FlatpickrModule],
  templateUrl: './datepicker.component.html',
  styles: ``,
})
export class DatepickerComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  componentcolor: any = '#405189';
  monolith: any = '#0AB39C';
  nano: any = '#3577F1';
  color: any;

  colorTheme: any = 'theme-blue';
  // bsConfig?: Partial<BsDatepickerConfig>;
  minDate: any;
  maxDate: any;
  defaultdate: any = new Date();
  form!: UntypedFormGroup;
  disabledDates: any;
  bsInlineValue = new Date();
  mytime: Date = new Date()
  myTime: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();

  constructor(private formBuilder: UntypedFormBuilder) {
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(23);
    this.maxTime.setMinutes(55);
  }
  ngOnInit(): void {


    // this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    // this.form.controls['defaultdate'].setValue(this.defaultdate);

    this.form = this.formBuilder.group({
      defaultdate: [this.defaultdate, [Validators.required]],
    });

    this.disabledDates = [
      new Date()
    ];

  }
}
