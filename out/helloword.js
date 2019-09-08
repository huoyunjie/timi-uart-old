"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
module.exports = function (context) {
    // 注册HelloWord命令
    context.subscriptions.push(vscode.commands.registerCommand('extension.timi_uart_test', () => {
        vscode.window.showInformationMessage('This is used to test API...');
        // vscode.window.showErrorMessage("ERROR info");
        // vscode.window.showInformationMessage('Try to select？', 'Yes', 'No', 'Other').then(result => {
        // 	if (result === 'Yes') {
        // 		console.log("Yes button");
        // 	} else if (result === 'No') {
        // 		console.log("No button");
        // 	}
        // });
        // vscode.window.setStatusBarMessage('Test display status bar');
    }));
};
//# sourceMappingURL=helloword.js.map