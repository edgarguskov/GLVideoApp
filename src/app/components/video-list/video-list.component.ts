import {Component, Input, Output, EventEmitter, Inject} from '@angular/core';
import { Video } from '../../models/video.model';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgFor} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor],
})
export class VideoListComponent {
  @Input() videoId!: string;
  @Input() videos: Video[] = [];
  @Output() selectVideo = new EventEmitter<string>();
  constructor(private dialog: MatDialog) {}

}

