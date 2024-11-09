import { Component, EventEmitter, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule],
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Output() searchQuery = new EventEmitter<string>();

  onSearch() {
    this.searchQuery.emit(this.searchTerm);
  }
}