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
  player : YT.Player;
  scriptIndex: Number;
  timer: any;

  ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get("id");
    this.initPlayer();
  }

  initPlayer() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => this.player = this.createPlayer();
  }

  createPlayer(){
    return new YT.Player('player', {
      videoId: this.videoId,
      playerVars: {
        rel: 1,
        autoplay : 0,
        controls : 0,
        showinfo : 0,
        fs:0,
        iv_load_policy : 3,
        cc_load_policy : 1,
        modestbranding : 1,
      }
    });
  }

  changeScriptIndex(scriptInfo) {
    const {startTime, duration} = scriptInfo.scriptInfo;

    if(this.timer) clearTimeout(this.timer);

    this.scriptIndex = scriptInfo.scriptIndex;
    this.player.seekTo(startTime, true);
    this.player.playVideo();
    this.timer = setTimeout(()=> this.player.pauseVideo(), duration * 1000);
  }
}
