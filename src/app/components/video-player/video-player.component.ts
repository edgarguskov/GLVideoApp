import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  @Input() videoId!: string;

  get videoUrl(): string {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }
}
