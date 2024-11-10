import {Component, EventEmitter, output, Output} from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerToggle} from '@angular/material/datepicker';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    MatInput,
    MatSelect,
    MatOption,
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  filterChange = output<'Author A-Z' | 'Newest'| 'Oldest'>();

  filterControl = new FormControl('');

  filterOptionsList = ['Author A-Z', 'Newest', 'Oldest'];

  onFilterChange(option: 'Author A-Z' | 'Newest'| 'Oldest') {
    this.filterChange.emit(option);
  }
}
