import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VideoService } from './services/video.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Video } from './models/video.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockVideoService: jasmine.SpyObj<VideoService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockVideos: Video[] = [
    {
      videoId: '1', channelTitle: 'Channel A', publishedAt: new Date('2023-01-01'),
      title: '',
      description: '',
      thumbnailUrl: ''
    },
    {
      videoId: '2', channelTitle: 'Channel B', publishedAt: new Date('2024-01-01'),
      title: '',
      description: '',
      thumbnailUrl: ''
    },
    {
      videoId: '3', channelTitle: 'Channel C', publishedAt: new Date('2022-01-01'),
      title: '',
      description: '',
      thumbnailUrl: ''
    }
  ];

  beforeEach(async () => {
    mockVideoService = jasmine.createSpyObj('VideoService', ['searchVideos']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: VideoService, useValue: mockVideoService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call onSearch with "random" on initialization', () => {
      spyOn(component, 'onSearch');
      component.ngOnInit();
      expect(component.onSearch).toHaveBeenCalledWith('random');
    });
  });

  describe('onSearch', () => {
    it('should populate videos and filteredVideos based on search query', () => {
      mockVideoService.searchVideos.and.returnValue(of(mockVideos));

      component.onSearch('test');
      expect(mockVideoService.searchVideos).toHaveBeenCalledWith('test');
      expect(component.videos).toEqual(mockVideos);
      expect(component.filteredVideos).toEqual(mockVideos);
    });
  });

  describe('onSelectVideo', () => {
    it('should set selectedVideoId and open dialog with the video', () => {
      component.onSelectVideo('1');
      expect(component.selectedVideoId).toBe('1');
      expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
        data: '1',
      });
    });
  });

  describe('onFilterChange', () => {
    beforeEach(() => {
      component.videos = [...mockVideos];
    });

    it('should sort filteredVideos by "Author A-Z"', () => {
      component.onFilterChange('Author A-Z');
      expect(component.filteredVideos).toEqual([
        mockVideos[0],
        mockVideos[1],
        mockVideos[2],
      ]);
    });

    it('should sort filteredVideos by "Newest"', () => {
      component.onFilterChange('Newest');
      expect(component.filteredVideos).toEqual([
        mockVideos[1],
        mockVideos[0],
        mockVideos[2],
      ]);
    });

    it('should sort filteredVideos by "Oldest"', () => {
      component.onFilterChange('Oldest');
      expect(component.filteredVideos).toEqual([
        mockVideos[2],
        mockVideos[0],
        mockVideos[1],
      ]);
    });
  });
});
