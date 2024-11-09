import { Component } from '@angular/core';
import { SafePipe } from './pipes/safe.pipe';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import {MatToolbar} from '@angular/material/toolbar';
import {Video} from './models/video.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    SearchBarComponent,
    VideoListComponent,
    VideoPlayerComponent,
    SafePipe,
    MatToolbar
  ]
})
export class AppComponent {
  videos: Video[] = [];
  selectedVideoId = '';

  onSearch(query: string) {
    // @ts-ignore
    this.videos = [{ videoId: 'dQw4w9WgXcQ', title: 'Test Video' }];
  }

  onSelectVideo(videoId: string) {
    this.selectedVideoId = videoId;
  }
}
