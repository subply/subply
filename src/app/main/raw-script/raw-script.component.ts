import { Component, OnInit, Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import { parseString } from "xml2js";
import { ScriptsService } from "../../../service/scripts.service";
import { ErrorHandlerService } from "../../../service/error-handler.service";
@Component({
  selector: "app-raw-script",
  templateUrl: "./raw-script.component.html",
  styleUrls: ["./raw-script.component.css"],
})
export class RawScriptComponent implements OnInit {
  scripts: Array<object> = [];
  @Input() videoId: string;
  scriptExist: boolean = false;
  loading: boolean = true;

  constructor(
    private scriptService: ScriptsService,
    private errHandlerService: ErrorHandlerService
  ) {}

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
        const start = parseFloat(script.$.start);
        const end = start + parseFloat(script.$.dur);

        this.scripts.push({
          script: script._,
          startTime: start,
          endTime: end,
        });
      });
    });
  }

  handleclick(index) {
    this.scriptEvent.emit({
      scriptIndex: index,
    });
  }
}
