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
  index: number;

  constructor(private scriptService: ScriptsService) {}

  @Output() scriptEvent = new EventEmitter();

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.loadScripts();
    this.handleKeyboardPressed();
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
        const _dur = parseFloat(script.$.dur);
        const _end = _start + _dur;

        let _script: Script = {
          script: script._,
          startTime: _start,
          endTime: _end,
          duration: _dur
        };

        this.scripts.push(_script);
      });
    });
  }

  handleclick(index) {
    this.index = index;
    this.removeActiveClass();
    this.addActiveClass();
    this.scriptEvent.emit({
      scriptIndex: this.index,
      scriptInfo: this.scripts[this.index],
    });
  }

  removeActiveClass() {
    const activeElements = document.querySelectorAll(".active");
    activeElements.forEach((element) => {
      element.classList.remove("active");
    });
  }

  addActiveClass() {
    const clickedBlock = document.getElementById(`${this.index}`);
    clickedBlock.classList.add("active");
  }

  upperPressed() {
    if (this.index === undefined) return;
    this.index == 0 ? this.index : (this.index -= 1);
    this.handleclick(this.index);
  }

  downPressed() {
    if (this.index === undefined) return;
    this.index == this.scripts.length - 1 ? this.index : (this.index += 1);
    this.handleclick(this.index);
  }

  handleKeyboardPressed() {
    window.onkeydown = (event) => {
      if (event.keyCode === 38) {
        event.preventDefault();
        return this.upperPressed();
      }

      if (event.keyCode == 40) {
        event.preventDefault();
        return this.downPressed();
      }
    };
  }
}
