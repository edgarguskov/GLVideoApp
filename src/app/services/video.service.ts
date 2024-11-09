import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_KEY = 'AIzaSyBOMmRSQZl_kuG4C7mo35K3S2qlma9tdbI';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<Video[]> {
    return this.http
      .get<any>(this.API_URL, {
        params: {
          part: 'snippet',
          maxResults: 15,
          q: query,
          type: 'video',
          key: this.API_KEY,
        },
      })
      .pipe(
        map((response) =>
          response.items.map((item: any) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.medium.url,
            publishedAt: new Date(item.snippet.publishedAt),
            channelTitle: item.snippet.channelTitle,
          }))
        )
      );
  }
}
