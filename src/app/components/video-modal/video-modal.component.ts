import {Component, inject} from '@angular/core';
import {VideoPlayerComponent} from '../video-player/video-player.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [
    VideoPlayerComponent
  ],
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.scss'
})
export class VideoModalComponent {
  selectedVideoId = inject(MAT_DIALOG_DATA);
}
