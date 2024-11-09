import { Component } from '@angular/core';
import { SafePipe } from './pipes/safe.pipe';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import {MatToolbar} from '@angular/material/toolbar';
import {Video} from './models/video.model';
import {VideoService} from './services/video.service';
import { FormsModule } from '@angular/forms';

import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FilterComponent} from './components/filter/filter.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    SearchBarComponent,
    VideoListComponent,
    VideoPlayerComponent,
    SafePipe,
    MatToolbar,
    FormsModule,
    MatLabel,
    MatFormField,
    FilterComponent
  ]
})
export class AppComponent {
  videos: Video[] = [];
  selectedVideoId = '';
  filteredVideos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.onSearch('random');
  }

  onSearch(query: string) {
    this.videoService.searchVideos(query).subscribe((videos: Video[]) => {
      console.log(videos);
      this.videos = videos;
      this.filteredVideos = videos;
    });
  }

  onSelectVideo(videoId: string) {
    this.selectedVideoId = videoId;
  }

  onFilterChange(filters: { date: string; author: string }) {
    this.filteredVideos = this.videos.filter((video) => {
      const matchesDate = filters.date ? new Date(video.publishedAt) >= new Date(filters.date) : true;
      const matchesAuthor = filters.author ? video.channelTitle.toLowerCase().includes(filters.author.toLowerCase()) : true;
      return matchesDate && matchesAuthor;
    });
  }

}
