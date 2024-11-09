import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../../models/video.model';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor],
})
export class VideoListComponent {
  @Input() videos: Video[] = [];
  @Output() selectVideo = new EventEmitter<string>();
}
