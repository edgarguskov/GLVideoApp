import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerToggle} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<{ date: string; author: string }>();

  filters = { date: '', author: '' };

  onFilterChange() {
    this.filterChange.emit(this.filters);
  }

}
