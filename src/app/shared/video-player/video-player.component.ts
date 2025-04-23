import {Component, Input, OnInit} from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  standalone: true,
  imports: [YouTubePlayerModule],
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  private apiLoaded = false;

  @Input() videoId!: string;

  ngOnInit(): void {
    console.log('videoId', this.videoId)
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
