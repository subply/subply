import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-translation",
  templateUrl: "./translation.component.html",
  styleUrls: ["./translation.component.css"],
})
export class TranslationComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  
  videoId: string;
  player: any;
  scriptIndex: Number;

  ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get("id");
    this.initPlayer();
  }

  initPlayer() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => this.startVideo();
  }

  startVideo(){
    this.player = new YT.Player('player', {
      videoId: this.videoId,
      playerVars: {
        rel: 0,
        autoplay : 0
      },
      events: {
        'onReady': this.onPlayerReady, //로딩할때 이벤트 실행
        'onStateChange': this.onPlayerStateChange //플레이어 상태 변화시 이벤트실행
      }
    });
  }
  onPlayerReady(event) {
    // event.target.playVideo();
  }
  onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
    }
  }
  changeScriptIndex(scriptInfo) {
    this.scriptIndex = scriptInfo.scriptIndex;
  }
}
