import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	const provider = new MdxEditorProvider(context);
	context.subscriptions.push(
		vscode.window.registerCustomEditorProvider('mdxVisualEditor.editor', provider, {
			webviewOptions: { retainContextWhenHidden: true },
			supportsMultipleEditorsPerDocument: false
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('mdxVisualEditor.open', (uri: vscode.Uri) => {
			vscode.commands.executeCommand('vscode.openWith', uri, 'mdxVisualEditor.editor');
		})
	);
}

export function deactivate() { }

class MdxEditorProvider implements vscode.CustomTextEditorProvider {
	constructor(private readonly context: vscode.ExtensionContext) { }

	async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		const fileName = document.uri.fsPath.split('/').pop();
		webviewPanel.webview.options = { enableScripts: true };
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
		webviewPanel.iconPath = {
			light: vscode.Uri.joinPath(this.context.extensionUri, 'src', 'assets', 'icon-light.png'),
			dark: vscode.Uri.joinPath(this.context.extensionUri, 'src', 'assets', 'icon-dark.png')
		};
		webviewPanel.title = `Edit: ${fileName}`;

		const updateWebview = () => {
			webviewPanel.webview.postMessage({
				type: 'refresh',
				content: document.getText()
			});
		};

		webviewPanel.webview.onDidReceiveMessage(async (message) => {
			switch (message.type) {
				case 'save':
					const edit = new vscode.WorkspaceEdit();
					const fullRange = new vscode.Range(
						document.lineAt(0).range.start,
						document.lineAt(document.lineCount - 1).range.end
					);
					edit.replace(document.uri, fullRange, message.content);
					await vscode.workspace.applyEdit(edit);
					break;
				case 'init_content':
					updateWebview();
					break;
			}
		});
	}

	private getHtmlForWebview(webview: vscode.Webview): string {
		const editorDistPath = vscode.Uri.joinPath(this.context.extensionUri, 'media', 'editor');
		const indexPath = vscode.Uri.joinPath(editorDistPath, 'index.html');

		let html = fs.readFileSync(indexPath.fsPath, 'utf-8');

		const baseUri = webview.asWebviewUri(editorDistPath);
		html = html.replace(/(href|src)="([^"]+)"/g, (_match: any, attr: any, relPath: any) => {
			if (relPath.startsWith('http')) {
				return `${attr}="${relPath}"`;
			}
			const absUri = vscode.Uri.joinPath(baseUri, relPath);
			return `${attr}="${webview.asWebviewUri(absUri)}"`;
		});

		return html;
	}
}