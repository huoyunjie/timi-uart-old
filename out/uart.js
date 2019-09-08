"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const SerialPort = require('serialport');
// import * as SerialPort from 'serialport';
const Readline = require('@serialport/parser-readline');
var comID = '';
// test uart
var port;
const g_baudRate = '921600';
// // parser will lost log
// // const parser = new Readline();
// // port.pipe(parser);
function listCom() {
    return __awaiter(this, void 0, void 0, function* () {
        let serial_com = ['A', 'B'];
        let abc = yield SerialPort.list(function (err, ports) {
            console.log('******listCom Start******');
            ports.forEach(function (port) {
                // console.log(port);
                // Save devices info
                if (typeof (port.pnpId) !== 'undefined') {
                    console.log(port.comName);
                    console.log(port.pnpId);
                    console.log(port.manufacturer);
                    // vscode.window.showInformationMessage('COM: ' + port.comName);
                    serial_com.push(port.comName);
                    console.log('**********************');
                }
            });
            console.log('******listCom End******');
        });
        console.log(serial_com);
        return serial_com;
    });
}
function selectCom(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let i = 0;
        const com = yield vscode.window.showQuickPick(item, {
            placeHolder: 'eins, zwei or drei',
            onDidSelectItem: item => vscode.window.showInformationMessage(`Focus ${++i}: ${item}`)
        });
        console.log(com);
        // vscode.window.showInformationMessage(`Got: ${result}`);
        return com;
    });
}
function setBaudRate() {
    return __awaiter(this, void 0, void 0, function* () {
        const baudRate = yield vscode.window.showInputBox({
            value: g_baudRate,
            valueSelection: [0, g_baudRate.length],
            placeHolder: 'Set baudRate for this COM',
            validateInput: text => {
                // vscode.window.showInformationMessage(`Validating: ${text}`);
                // return Number(baudRate) === '123' ? 'Not 123!' : null;
                let val = Number(text);
                console.log(val);
                if (isNaN(val)) {
                    return 'Invalid input';
                }
                if (val < 1200) {
                    return 'baudRate >= 1200';
                }
                if (val > 3000000) {
                    return 'baudRate <= 3000000';
                }
                return null;
            }
        });
        console.log(baudRate);
        let val = Number(baudRate);
        // Check the val is valiable
        return val;
    });
}
module.exports = function (context) {
    console.log('Congratulations, your extension "timi-uart" is now active!');
    context.subscriptions.push(vscode.commands.registerCommand('extension.timi_uart_open_or_close', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // The code you place here will be executed every time your command is executed
            // Test display
            // vscode.window.showInformationMessage('TIMI: Test start...');
            console.log('Open or Stop COM...START');
            var change_cnt = 0;
            var disp_str = '';
            if (comID === '') {
                console.log('COM is NULL');
                return;
            }
            console.log('COM: ' + comID);
            console.log('0...');
            if (port.isOpen) {
                port.close();
                console.log('Close COM...');
                vscode.window.showInformationMessage('Open COM...');
                return;
            }
            console.log('Open COM...');
            yield port.open(function (err) {
                if (err) {
                    return console.log('Error opening COM: ', err.message);
                }
                else {
                    console.log('Open COM...OK');
                    vscode.window.showInformationMessage('Open COM...');
                }
            });
            // // The open event is always emitted
            // port.on('open', function() {
            // 	console.log('Open COM...');
            // 	vscode.window.showInformationMessage('Open COM...');
            // });
            // port.on('readable', function () {
            // 	console.log('Data:', port.read());
            // });
            // parser.on('data', function (data) {
            port.on('data', function (data) {
                console.log('Data:', data);
                // vscode.window.showInformationMessage(data);
                // let doc = editor.document;
                let editor = vscode.window.activeTextEditor;
                if (editor) {
                    let doc = editor.document;
                    var end_pos = doc.lineCount;
                    var jump_range = new vscode.Range(end_pos, 0, end_pos, 0);
                    disp_str += data;
                    editor.edit(editBuilder => {
                        editBuilder.replace(new vscode.Position(end_pos, 0), disp_str);
                        disp_str = '';
                    });
                    editor.revealRange(jump_range, vscode.TextEditorRevealType.Default);
                }
            });
            console.log('Open or Stop COM...END');
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.timi_uart_select', function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Select COM...');
            let serial_com = yield listCom();
            let com = yield selectCom(serial_com);
            let baudRate_val = NaN;
            if (com === undefined) {
                comID = '';
            }
            else {
                comID = com;
                baudRate_val = yield setBaudRate();
            }
            console.log('Select COM: ' + comID);
            console.log('Set baudRate: ' + baudRate_val);
            // Check input...
            if ((comID !== '') && !isNaN(baudRate_val)) {
                port = new SerialPort(comID, { baudRate: baudRate_val, autoOpen: false });
                console.log("Create COM...");
            }
            console.log('Select COM...END');
        });
    }));
};
//# sourceMappingURL=uart.js.map