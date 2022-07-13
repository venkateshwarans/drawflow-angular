import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import Drawflow, {
  ConnectionEvent,
  ConnectionStartEvent,
  DrawFlowEditorMode,
  DrawflowConnection,
  DrawflowConnectionDetail,
  DrawflowNode,
  MousePositionEvent,
} from 'drawflow';
import { NodeElement } from './node.model';
import { get as lGet, lowerCase as lLowerCase, map as lMap } from 'lodash-es';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.css'],
})
export class DrawBoardComponent implements OnInit, AfterViewInit {
  nodes: NodeElement[] = [];
  nodesHTML!: NodeListOf<Element>;

  nodesDrawn: any[] = [];
  selectedItem!: NodeElement;
  editor!: any;

  locked: boolean = false;

  lastMousePositionEv: any;

  drawFlowHtmlElement!: HTMLElement;
  dataToImport: any;

  constructor() {}

  private initializeList(length: number) {
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
  };
  this.nodes = lMap(lGet(this.dataToImport, 'drawflow.Home.data'))
    for (let i = 0; i < length; i++) {
      // this.nodes.push({
      //   id: i + 1,
      //   name: 'node' + (i + 1),
      //   inputs: 1,
      //   outputs: 0,
      // });
    }
  }

  private initDrawFlow(htmlElement: HTMLElement): void {
    this.editor = new Drawflow(htmlElement);
    this.editor.reroute = true;
    this.editor.reroute_fix_curvature = true;
    this.editor.force_first_input = false;
    this.editor.start();
    this.editor.import(this.dataToImport);
  }

  ngAfterViewInit(): void {
    this.drawFlowHtmlElement = <HTMLElement>document.getElementById('drawflow');
    this.initDrawFlow(this.drawFlowHtmlElement);

    // Events!
    this.editor.on('nodeCreated', (id: any) => {
      console.log(
        'Editor Event :>> Node created ' + id,
        this.editor.getNodeFromId(id)
      );
    });

    this.editor.on('nodeRemoved', (id: any) => {
      console.log('Editor Event :>> Node removed ' + id);
    });

    this.editor.on('nodeSelected', (id: any) => {
      console.log(
        'Editor Event :>> Node selected ' + id,
        this.editor.getNodeFromId(id)
      );
    });

    this.editor.on('moduleCreated', (name: any) => {
      console.log('Editor Event :>> Module Created ' + name);
    });

    this.editor.on('moduleChanged', (name: any) => {
      console.log('Editor Event :>> Module Changed ' + name);
    });

    this.editor.on('connectionCreated', (connection: any) => {
      console.log('Editor Event :>> Connection created ', connection);
    });

    this.editor.on('connectionRemoved', (connection: any) => {
      console.log('Editor Event :>> Connection removed ', connection);
    });

    // this.editor.on('mouseMove', (position: any) => {
    //   console.log('Editor Event :>> Position mouse x:' + position.x + ' y:' + position.y);
    // });

    this.editor.on('nodeMoved', (id: any) => {
      console.log('Editor Event :>> Node moved ' + id);
    });

    this.editor.on('zoom', (zoom: any) => {
      console.log('Editor Event :>> Zoom level ' + zoom);
    });

    // this.editor.on('translate', (position: any) => {
    //   console.log(
    //     'Editor Event :>> Translate x:' + position.x + ' y:' + position.y
    //   );
    // });

    this.editor.on('addReroute', (id: any) => {
      console.log('Editor Event :>> Reroute added ' + id);
    });

    this.editor.on('removeReroute', (id: any) => {
      console.log('Editor Event :>> Reroute removed ' + id);
    });
  }

  ngOnInit(): void {
    this.initializeList(5);
  }

  // Drag Events
  onDragStart(e: Event) {
    if (e.type === 'dragstart') {
      console.log('onDragStart :>> e :>> ', e);
      (e.target as HTMLElement).classList.add('disabled')
      this.selectedItem = <NodeElement>(this.nodes.find((node: NodeElement) => lLowerCase(node.name) === lLowerCase(lGet(e, 'target.outerText'))));
    }
  }

  onDragEnter(e: any) {
    console.log('onDragEnter :>> e :>> ', e);
  }

  onDragLeave(e: any) {
    console.log('onDragLeave :>> e :>> ', e);
  }

  onDragOver(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.lastMousePositionEv = e;
    console.log('onDragOver :>> e :>> ', e);
  }

  onDragEnd(e: Event) {
    (e.target as HTMLElement).classList.remove('disabled')
    console.log('onDragend :>> e :>> ', e);
  }

  onDrop(e: any) {
    // After dropping the element, create a node
    if (e.type === 'drop') {
      console.log('onDrop :>> e :>> ', e);
      e.preventDefault();
      this.addNodeToDrawBoard(e.clientX, e.clientY);
      this.resetAllInputsOutputs();
    }
  }

  resetAllInputsOutputs() {
    this.nodes.forEach((node) => {
      node.inputs = 0;
      node.outputs = 0;
    });
  }

  // Drawflow Editor Operations
  addNodeToDrawBoard(pos_x: number, pos_y: number) {
    if (this.editor.editor_mode === 'edit') {
      pos_x =
        pos_x *
          (this.editor.precanvas.clientWidth /
            (this.editor.precanvas.clientWidth * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().x *
          (this.editor.precanvas.clientWidth /
            (this.editor.precanvas.clientWidth * this.editor.zoom));

      pos_y =
        pos_y *
          (this.editor.precanvas.clientHeight /
            (this.editor.precanvas.clientHeight * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().y *
          (this.editor.precanvas.clientHeight /
            (this.editor.precanvas.clientHeight * this.editor.zoom));

      const htmlTemplate = `
          <div>
            <i class="title-box">${this.selectedItem.name}</i>
          </div>
          `;

      const nodeName = this.selectedItem.name;
      const nodeId = this.editor.addNode(
        this.selectedItem.name,
        this.selectedItem.inputs,
        this.selectedItem.outputs,
        pos_x,
        pos_y,
        '',
        {},
        htmlTemplate,
        false
      );

      this.nodesDrawn.push({
        nodeId,
        nodeName,
      });

      // const newNode = <DrawflowNode>this.editor.getNodeFromId(nodeId);
    }
  }

  onClear() {
    this.editor.clear();
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
    console.log('dataExport :>> ', dataExport);
  }
}
