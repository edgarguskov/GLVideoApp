import {Component, input, Input, InputSignal, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  videoId: InputSignal<string> = input.required()

  width = 960;
  height = 615;

  ngOnInit() {
    if (window.innerWidth < 1024) {
      this.width = 560
      this.height = 315
    }
    if (window.innerWidth < 570) {
      this.width = 350
      this.height = 275
    }
    console.log(window.innerWidth)
  }

  get videoUrl(): string {
    return `https://www.youtube.com/embed/${this.videoId()}`;
  }
}
