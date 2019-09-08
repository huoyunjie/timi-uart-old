"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
exports.activate = function (context) {
    console.log('恭喜，您的扩展“vscode-plugin-demo”已被激活！');
    // console.log(vscode);
    require('./helloword')(context);
    require('./uart')(context);
    // context.subscriptions.push(vscode.commands.registerCommand('extension.timi_uart', () => {
    //     vscode.window.showInformationMessage('Hello World！你好，小茗同学！');
    // }));
    // // Use the console to output diagnostic information (console.log) and errors (console.error)
    // // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "timi-uart" is now active!');
    // // The command has been defined in the package.json file
    // // Now provide the implementation of the command with registerCommand
    // // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('extension.timi_uart', () => {
    // 	// The code you place here will be executed every time your command is executed
    // 	// Test display
    // 	vscode.window.showInformationMessage('TIMI: Test start...');
    // 	// vscode.window.showErrorMessage("ERROR info");
    // 	// vscode.window.showInformationMessage('Try to select？', 'Yes', 'No', 'Other').then(result => {
    // 	// 	if (result === 'Yes') {
    // 	// 		console.log("Yes button");
    // 	// 	} else if (result === 'No') {
    // 	// 		console.log("No button");
    // 	// 	}
    // 	// });
    // 	vscode.window.setStatusBarMessage("Test display status bar");
    // 	// Test display end
    // 	var change_cnt = 0;
    // 	var disp_str = '';
    // 	console.log('List serial start...');
    // 	SerialPort.list(function (err: Error, ports: Array<{manufacturer: undefined, pnpId: undefined, comName: undefined}>) {
    // 		ports.forEach(function(port) {
    // 			// console.log("port: Start...")
    // 			// console.log(port);
    // 			// Save devices info
    // 			if (typeof(port.pnpId) !== "undefined") {
    // 				console.log(port.comName);
    // 				console.log(port.pnpId);
    // 				console.log(port.manufacturer);
    // 				vscode.window.showInformationMessage('COM: ' + port.comName);
    // 			}
    // 		  	// console.log("port: End...")
    // 		});
    // 	});
    // 	// Display devices info
    // 	// Select device
    // 	console.log('List serial end...');
    // 	// test uart
    // 	const port = new SerialPort('/dev/ttyUSB0', {baudRate: 921600, autoOpen: false});
    // 	// parser will lost log
    // 	// const parser = new Readline();
    // 	// port.pipe(parser);
    // 	port.open(function (err: Error) {
    // 		console.log(typeof(err));
    // 		if (err) {
    // 		  return console.log('Error opening port: ', err.message);
    // 		}
    // 		// Because there's no callback to write, write errors will be emitted on the port:
    // 		port.write('main screen turn on');
    // 	});
    // 	// The open event is always emitted
    // 	port.on('open', function() {
    // 		console.log("Open COM...");
    // 		vscode.window.showInformationMessage('Open COM...');
    // 	});
    // 	// port.on('readable', function () {
    // 	// 	console.log('Data:', port.read());
    // 	// });
    // 	// parser.on('data', function (data) {
    // 	port.on('data', function (data: Buffer) {
    // 		console.log('Data:', data);
    // 		// vscode.window.showInformationMessage(data);
    // 		// let doc = editor.document;
    // 		let editor = vscode.window.activeTextEditor;
    // 		if (editor) {
    // 			let doc = editor.document;
    // 			var end_pos = doc.lineCount;
    // 			var jump_range = new vscode.Range(end_pos, 0, end_pos, 0);
    // 			disp_str += data;
    // 			editor.edit(editBuilder => {
    // 				editBuilder.replace(new vscode.Position(end_pos, 0), disp_str);
    // 				disp_str = '';
    // 			});
    // 			editor.revealRange(jump_range, vscode.TextEditorRevealType.Default);
    // 		}
    // 	});
    // 	console.log("END...");
    // });
    // context.subscriptions.push(disposable);
};
/**
 * 插件被释放时触发
 */
exports.deactivate = function () {
    console.log('您的扩展“vscode-plugin-demo”已被释放！');
};
//# sourceMappingURL=extension.js.map