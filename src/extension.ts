// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { generateCircularReferenceModel, generateConstants, generateModel } from './templates'

export function registerAction(context: vscode.ExtensionContext, actionName: string, generator: (word: string) => string) {
  const disposable = vscode.commands.registerCommand(`yutang-code-generator.${actionName}`, () => {
    const editor = vscode.window.activeTextEditor

    if (!editor)
      return
    const document = editor.document
    const selection = editor.selection
    const word = document.getText(selection)

    const result = generator(word)
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, result)
    })
  })

  context.subscriptions.push(disposable)
}

export function activate(context: vscode.ExtensionContext) {
  registerAction(context, 'constants', generateConstants)
  registerAction(context, 'model', generateModel)
  registerAction(context, 'circularReferenceModel', generateCircularReferenceModel)
}

export function deactivate() {}
