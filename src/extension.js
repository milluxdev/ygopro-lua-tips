const vscode = require('vscode');
const functions = require('./util/tips');

function provideHover(document, position) {
    const word        = document.getText(document.getWordRangeAtPosition(position));
	if(word){
		let json = functions[word];
		let desc = '';
		if(json.type == 2) {
			desc += `* ${json.name}\n    - **值**：${json.value}\n    - **描述**：${json.desc}\n`
		} else {
			let funs = json.function;
			for (const key in funs) {
				if (funs.hasOwnProperty(key)) {
					const element = funs[key];
					desc += `* ${element.name}\n    - **返回值**：${element.return}\n    - **描述**：${element.desc}\n`
				}
			}
		}
		return new vscode.Hover(desc);
	}
}

exports.activate = function(context) {
	context.subscriptions.push(vscode.languages.registerHoverProvider('lua', {
        provideHover
	}));
};