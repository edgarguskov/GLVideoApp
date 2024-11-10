import {Component, inject, OnInit} from '@angular/core';
import {SafePipe} from './pipes/safe.pipe';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {VideoListComponent} from './components/video-list/video-list.component';
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import {MatToolbar} from '@angular/material/toolbar';
import {Video} from './models/video.model';
import {VideoService} from './services/video.service';
import {FormsModule} from '@angular/forms';

import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FilterComponent} from './components/filter/filter.component';
import {MatDialog} from '@angular/material/dialog';
import {VideoModalComponent} from './components/video-modal/video-modal.component';

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
export class AppComponent implements OnInit {
  videos: Video[] = [];
  selectedVideoId = '';
  filteredVideos: Video[] = [];
  dialog = inject(MatDialog);

  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.onSearch('random');
  }

  onSearch(query: string) {
    this.videoService.searchVideos(query).subscribe((videos: Video[]) => {
      this.videos = videos;
      this.filteredVideos = videos;
    });
  }

  onSelectVideo(videoId: string) {
    this.selectedVideoId = videoId;
    this.dialog.open(VideoModalComponent, {
      data: this.selectedVideoId
    });

  }

  onFilterChange(option: 'Author A-Z' | 'Newest' | 'Oldest') {
    if (option === 'Author A-Z') {
      this.filteredVideos = this.videos.sort((a, b) => {
        return a.channelTitle.localeCompare(b.channelTitle);
      })
    }
    if (option === 'Newest') {
      this.filteredVideos = this.videos.sort((a, b) => {
        return b.publishedAt.getTime() - a.publishedAt.getTime();
      })
    }
    if (option === 'Oldest') {
      this.filteredVideos = this.videos.sort((a, b) => {
        return a.publishedAt.getTime() - b.publishedAt.getTime();
      })
    }
  }
}
