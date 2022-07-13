import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Drawflow from 'drawflow';

export interface NodeElement {
  id: number;
  name: string;
  inputs: number;
  outputs: number;
}
import { get as _get, lowerCase as _lowerCase, map as _map, 
find as _find, forEach as _forEach} from 'lodash-es';

@Component({
  selector: 'app-cdk-draw-board',
  templateUrl: './cdk-draw-board.component.html',
  styleUrls: ['./cdk-draw-board.component.css']
})
export class CdkDrawBoardComponent implements OnInit, AfterViewInit {
  nodes: NodeElement[] = [];
  nodesHTML!: NodeListOf<Element>;

  nodesDrawn: any[] = [];
  selectedItem!: NodeElement;
  editor!: any;

  locked: boolean = false;

  lastMousePosition: any;

  drawBoardHTMLElement!: HTMLElement;

  dataToImport: any;  

  isBlockMenuOpen: boolean =  false;

  constructor() { }

  ngOnInit(): void {
    this.initData()
  }

  ngAfterViewInit(): void {
    this.drawBoardHTMLElement = <HTMLElement>document.getElementById('drawboard');
    this.initDrawBoard(this.drawBoardHTMLElement);

    this.initializeEvents()

  }

  private initData() {
    this.dataToImport = {
      "drawflow": {
          "Home": {
              "data": {
                  "1": {
                      "id": 1,
                      "name": "welcome",
                      "data": {},
                      "class": "welcome",
                      "html": "\n    <div>\n      <div class=\"title-box\">👏 Welcome!!</div>\n      <div class=\"box\">\n        <p>Simple flow library <b>demo</b>\n        <a href=\"https://github.com/jerosoler/Drawflow\" target=\"_blank\">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ",
                      "typenode": false,
                      "inputs": {},
                      "outputs": {},
                      "pos_x": 50,
                      "pos_y": 50
                  },
                  "2": {
                      "id": 2,
                      "name": "slack",
                      "data": {},
                      "class": "slack",
                      "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-slack\"></i> Slack chat message</div>\n          </div>\n          ",
                      "typenode": false,
                      "inputs": 1,
                      "outputs": {},
                      "pos_x": 1028,
                      "pos_y": 87
                  },
                  "3": {
                      "id": 3,
                      "name": "telegram",
                      "data": {
                          "channel": "channel_2"
                      },
                      "class": "telegram",
                      "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-telegram-plane\"></i> Telegram bot</div>\n            <div class=\"box\">\n              <p>Send to telegram</p>\n              <p>select channel</p>\n              <select df-channel>\n                <option value=\"channel_1\">Channel 1</option>\n                <option value=\"channel_2\">Channel 2</option>\n                <option value=\"channel_3\">Channel 3</option>\n                <option value=\"channel_4\">Channel 4</option>\n              </select>\n            </div>\n          </div>\n          ",
                      "typenode": false,
                      "inputs": {
                          "input_1": {
                              "connections": [{
                                  "node": "7",
                                  "input": "output_1"
                              }]
                          }
                      },
                      "outputs": {},
                      "pos_x": 1032,
                      "pos_y": 184
                  },
                  "4": {
                      "id": 4,
                      "name": "email",
                      "data": {},
                      "class": "email",
                      "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-at\"></i> Send Email </div>\n            </div>\n            ",
                      "typenode": false,
                      "inputs": {
                          "input_1": {
                              "connections": [{
                                  "node": "5",
                                  "input": "output_1"
                              }]
                          }
                      },
                      "outputs": {},
                      "pos_x": 1033,
                      "pos_y": 439
                  },
                  "5": {
                      "id": 5,
                      "name": "template",
                      "data": {
                          "template": "Write your template"
                      },
                      "class": "template",
                      "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-code\"></i> Template</div>\n              <div class=\"box\">\n                Ger Vars\n                <textarea df-template></textarea>\n                Output template with vars\n              </div>\n            </div>\n            ",
                      "typenode": false,
                      "inputs": {
                          "input_1": {
                              "connections": [{
                                  "node": "6",
                                  "input": "output_1"
                              }]
                          }
                      },
                      "outputs": {
                          "output_1": {
                              "connections": [{
                                  "node": "4",
                                  "output": "input_1"
                              }, {
                                  "node": "11",
                                  "output": "input_1"
                              }]
                          }
                      },
                      "pos_x": 607,
                      "pos_y": 304
                  },
                  "6": {
                      "id": 6,
                      "name": "github",
                      "data": {
                          "name": "https://github.com/jerosoler/Drawflow"
                      },
                      "class": "github",
                      "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-github \"></i> Github Stars</div>\n            <div class=\"box\">\n              <p>Enter repository url</p>\n            <input type=\"text\" df-name>\n            </div>\n          </div>\n          ",
                      "typenode": false,
                      "inputs": {},
                      "outputs": {
                          "output_1": {
                              "connections": [{
                                  "node": "5",
                                  "output": "input_1"
                              }]
                          }
                      },
                      "pos_x": 341,
                      "pos_y": 191
                  },
                  "7": {
                      "id": 7,
                      "name": "facebook",
                      "data": {},
                      "class": "facebook",
                      "html": "\n        <div>\n          <div class=\"title-box\"><i class=\"fab fa-facebook\"></i> Facebook Message</div>\n        </div>\n        ",
                      "typenode": false,
                      "inputs": {},
                      "outputs": {
                          "output_1": {
                              "connections": [{
                                  "node": "2",
                                  "output": "input_1"
                              }, {
                                  "node": "3",
                                  "output": "input_1"
                              }, {
                                  "node": "11",
                                  "output": "input_1"
                              }]
                          }
                      },
                      "pos_x": 347,
                      "pos_y": 87
                  },
                  "11": {
                      "id": 11,
                      "name": "log",
                      "data": {},
                      "class": "log",
                      "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-file-signature\"></i> Save log file </div>\n            </div>\n            ",
                      "typenode": false,
                      "inputs": {
                          "input_1": {
                              "connections": [{
                                  "node": "5",
                                  "input": "output_1"
                              }, {
                                  "node": "7",
                                  "input": "output_1"
                              }]
                          }
                      },
                      "outputs": {},
                      "pos_x": 1031,
                      "pos_y": 363
                  }
              }
          },
          "Other": {
              "data": {
                  "8": {
                      "id": 8,
                      "name": "personalized",
                      "data": {},
                      "class": "personalized",
                      "html": "\n            <div>\n              Personalized\n            </div>\n            ",
                      "typenode": false,
                      "inputs": {
                          "input_1": {
                              "connections": [{
                                  "node": "12",
                                  "input": "output_1"
                              }, {
                                  "node": "12",
                                  "input": "output_2"
                              }, {
                                  "node": "12",
                                  "input": "output_3"
                              }, {
                                  "node": "12",
                                  "input": "output_4"
                              }]
                          }
                      },
                      "outputs": {
                          "output_1": {
                              "connections": [{
                                  "node": "9",
                                  "output": "input_1"
                              }]
                          }
                      },
                      "pos_x": 764,
                      "pos_y": 227
                  },
                  "9": {
                      "id": 9,
                      "name": "dbclick",
                      "data": {
                          "name": "Hello World!!"
                      },
                      "class": "dbclick",
                      "html": "\n            <div>\n            <div class=\"title-box\"><i class=\"fas fa-mouse\"></i> Db Click</div>\n              <div class=\"box dbclickbox\" ondblclick=\"showpopup(event)\">\n                Db Click here\n                <div class=\"modal\" style=\"display:none\">\n                  <div class=\"modal-content\">\n                    <span class=\"close\" onclick=\"closemodal(event)\">&times;</span>\n                    Change your variable {name} !\n                    <input type=\"text\" df-name>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n            ",
                      "typenode": false,
                      "inputs": {
                          "input_1": {
                              "connections": [{
                                  "node": "8",
                                  "input": "output_1"
                              }]
                          }
                      },
                      "outputs": {
                          "output_1": {
                              "connections": [{
                                  "node": "12",
                                  "output": "input_2"
                              }]
                          }
                      },
                      "pos_x": 209,
                      "pos_y": 38
                  },
                  "12": {
                      "id": 12,
                      "name": "multiple",
                      "data": {},
                      "class": "multiple",
                      "html": "\n            <div>\n              <div class=\"box\">\n                Multiple!\n              </div>\n            </div>\n            ",
                      "typenode": false,
                      "inputs": {
                          "input_1": {
                              "connections": []
                          },
                          "input_2": {
                              "connections": [{
                                  "node": "9",
                                  "input": "output_1"
                              }]
                          },
                          "input_3": {
                              "connections": []
                          }
                      },
                      "outputs": {
                          "output_1": {
                              "connections": [{
                                  "node": "8",
                                  "output": "input_1"
                              }]
                          },
                          "output_2": {
                              "connections": [{
                                  "node": "8",
                                  "output": "input_1"
                              }]
                          },
                          "output_3": {
                              "connections": [{
                                  "node": "8",
                                  "output": "input_1"
                              }]
                          },
                          "output_4": {
                              "connections": [{
                                  "node": "8",
                                  "output": "input_1"
                              }]
                          }
                      },
                      "pos_x": 179,
                      "pos_y": 272
                  }
              }
          }
      }
   }

   this.nodes = _map(_get(this.dataToImport, 'drawflow.Home.data'))
  }

  private initDrawBoard(element: HTMLElement): void {
    this.editor = new Drawflow(element);

    this.editor.reRoute =  true;
    this.editor.reRouteFixCurvature = true;
    this.editor.forceFirstInput= false
    this.editor.start();
    this.editor.import(this.dataToImport);
  }

  private initializeEvents() {
    this.editor.on('nodeCreated', (id: any) => {
      console.log(`Node created ${id}, ${this.editor.getNodeFromId(id)}`)
    })

    this.editor.on('nodeRemoved', (id: any) => {
      console.log(`Node Removed ${id}`)
    })

    this.editor.on('nodeSelected', (id: any) => {
      console.log(`Node selected ${id} ${this.editor.getNodeFromId(id)}`)
    })

    this.editor.on('moduleCreated', (name: any) => {
      console.log(`Editor event ${name}`)
    })

    this.editor.on('connectionCreated', (connection: any) => {
      console.log(`Connection created ${connection}`)
    })

    this.editor.on('connectionRemoved', (connection: any) => {
      console.log(`Connection removed ${connection}`)
    })

    this.editor.on('nodeMoved', (id: any) => {
      console.log(`Node moved ${id}`)
    })

    this.editor.on('zoom', (zoom: any) => {
      console.log(`Zoom level ${zoom}`)
    })

    this.editor.on('addReroute', (id: any) => {
      console.log(`addReroute ${id}`)
    })

    this.editor.on('removeReroute', (id: any) => {
      console.log(`removeReroute ${id}`)
    })

  }

  onDragStart(event: Event) {
    if(event.type === 'dragstart') {
      (event.target as HTMLElement).classList.add('opacity-50')
      console.log();
      const child = <HTMLElement>(event.target as HTMLElement).lastChild; 
      this.selectedItem = <NodeElement>(_find(this.nodes, (node) => {
        return _lowerCase(node.name) === _lowerCase(_get(child, 'innerText')) 
      }))
    }
  }

  onDragEnter(event: Event) {
    console.log(`Drag enter ${event}`)
  }

  onDragLeave(event: Event) {
    console.log(`Drag leave ${event}`);
  }

  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.lastMousePosition = event;
    console.log(`Drag over ${event}`);
  }

  onDragEnd(event: Event) {
    (event.target as HTMLElement).classList.remove('opacity-50')
    console.log(`Drag end ${event}`);
  }

  onDrop(event: any) {
    // After dropping the element, create a node
    if (event.type === 'drop') {
      console.log(`On drop ${event}`);
      event.preventDefault();
      this.addNodeToDrawBoard(event.clientX, event.clientY);
      this.resetAllInputsOutputs();
    }
  }

  resetAllInputsOutputs() {
    _forEach(this.nodes, (node: NodeElement) => {
      node.inputs = 0;
      node.outputs = 0;
    })
  }

  addNodeToDrawBoard(positionX: number, positionY: number) {
    if(this.editor.editor_mode === 'edit') {
      positionX = positionX * 
        (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().x *
        (this.editor.precanvas.clientWidth /
        (this.editor.precanvas.clientWidth * this.editor.zoom));

      positionY = positionY *
          (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)) -
          this.editor.precanvas.getBoundingClientRect().y *
          (this.editor.precanvas.clientHeight /
          (this.editor.precanvas.clientHeight * this.editor.zoom));

      const htmlTemplate = 
      `<div>
        <i class="title-box">${this.selectedItem.name}</i>
      </div>`

      const nodeName = this.selectedItem.name;
      const nodeId = this.editor.addNode(
        this.selectedItem.name,
        this.selectedItem.inputs,
        this.selectedItem.outputs,
        positionX, positionY,
        '', {}, htmlTemplate,
        false
      );

      this.nodesDrawn.push({
        nodeId, nodeName
      })
    };

  }

  onClear() {
    this.editor.clear();
    console.log(`Editor cleared`)
  }

  changeMode() {
    this.locked = !this.locked;
    this.editor.editor_mode = this.locked ? 'fixed' : 'edit';
  }

  onZoomOut() {
    this.editor.zoom_out();
  }

  onZoomIn() {
    this.editor.zoom_in();
  }

  onZoomReset() {
    this.editor.zoom_reset();
  }

  onSubmit() {
    const dataExport = this.editor.export();
    console.log('On Submit ', dataExport);
  }

}
