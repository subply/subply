import { Component, OnInit, Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import { parseString } from "xml2js";
import { ScriptsService } from "../../../service/scripts.service";
import { Script } from "../../model/script.interface";

@Component({
  selector: "app-raw-script",
  templateUrl: "./raw-script.component.html",
  styleUrls: ["./raw-script.component.css"],
})
export class RawScriptComponent implements OnInit {
  scripts: Array<Script> = [];
  @Input() videoId: string;
  scriptExist: boolean = false;
  loading: boolean = true;

  constructor(private scriptService: ScriptsService) {}

  @Output() scriptEvent = new EventEmitter();

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.loadScripts();
  }

  loadScripts() {
    if (this.videoId) {
      this.scriptService.getXMLScript(this.videoId).subscribe((xmlScripts) => {
        if (!xmlScripts) {
          this.loading = false;
          return;
        }
        this.parseScriptsFromXML(xmlScripts);

        this.scriptService.checkScriptIsExist().subscribe(
          (ret) => {
            if (ret) return;
            this.scriptService.initScripts(this.scripts).subscribe((ret) => {
              if (!ret) {
                alert("초기화 실패");
                return false;
              }
            });
          },
          (error) => {
            console.log("[checkScriptIsExist 에러]" + error);
          }
        );

        this.scriptExist = true;
        this.loading = false;
      });
    }
  }

  parseScriptsFromXML(xml_string) {
    parseString(xml_string, { explicitArray: false }, (error, result) => {
      if (error) {
        throw new Error(error);
      }

      const returned_scripts = result.transcript.text;
      returned_scripts.map((script) => {
        const _start = parseFloat(script.$.start);
        const _end = _start + parseFloat(script.$.dur);

        const start = new Date(script.$.start * 1000)
          .toISOString()
          .substr(11, 12);

        const end = new Date(_end * 1000).toISOString().substr(11, 12);

        let _script: Script = {
          script: script._,
          startTime: start,
          endTime: end,
        };

        this.scripts.push(_script);
      });
    });
  }

  handleclick(index) {
    this.scriptEvent.emit({
      scriptIndex: index,
      scriptInfo: this.scripts[index],
    });
  }
}
