import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMaximize, faMinimize } from '@fortawesome/free-solid-svg-icons'

const MarkdownPreInput = "# Dies ist mein Markdown Previewer\n## Mit Markdown kann man verschiedene Sachen machen:\nMan kann Code, `<div></div>` , in einer Zeile schreiben\n```\n//oder sogar Codeblöcke über mehrere Zeilen schreiben\nlet x = 5;\n```\nMan kann die Schrift ebenfalls verändern, und zwar **so**, _so_ oder **_so_**.\nEs gibt auch [Links](https://de.wikipedia.org/wiki/Wikipedia:Hauptseite) und\n>Zitate\n\n- Es gibt auch Listen:\n  - Manche sind unsortiert\n    - oder eingerückt\n\n1. Andere sind sortiert...\n1. ...und nicht eingerückt"

class Editorsmall extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="parent">
                <div className="editor-header">
                    <p className="heading">Editor</p>
                    <button className="logo" onClick={this.props.function}><FontAwesomeIcon icon={faMaximize} /></button>
                </div>
                <textarea id="editor-small" onChange={this.props.inputUpdate} value={this.props.text}></textarea>
            </div>
        )
    }
}

class Editorlarge extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="parent">
                <div className="editor-header">
                    <p className="heading">Editor</p>
                    <button className="logo" onClick={this.props.function}><FontAwesomeIcon icon={faMinimize} /></button>
                </div>
                <textarea id="editor-large" onChange={this.props.inputUpdate} value={this.props.text}></textarea>
            </div>
        )
    }
}

class Previewersmall extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="parent">
                <div className="previewer-header">
                    <p className="heading">Previewer</p>
                    <button className="logo" onClick={this.props.function}><FontAwesomeIcon icon={faMaximize} /></button>
                </div>
                <div id="previewer-small"><ReactMarkdown>{this.props.text}</ReactMarkdown></div>
            </div>
        )
    }
}

class Previewerlarge extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="parent">
                <div className="previewer-header">
                    <p className="heading">Previewer</p>
                    <button className="logo" onClick={this.props.function}><FontAwesomeIcon icon={faMinimize} /></button>
                </div>
                <div id="previewer-large"><ReactMarkdown>{this.props.text}</ReactMarkdown></div>
            </div>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: MarkdownPreInput,
            smalleditor: true,
            smallpreviewer: true
        };

        this.handleClickEditor = this.handleClickEditor.bind(this)
        this.handleClickPreviewer = this.handleClickPreviewer.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleClickEditor () {
        this.setState ({
            smalleditor: !this.state.smalleditor
        });
    }
    handleClickPreviewer () {
        this.setState ({
            smallpreviewer: !this.state.smallpreviewer
        });
    }
    handleChange (event) {
        this.setState({
            input: event.target.value
        });
    }

    render() {
        if (this.state.smalleditor && this.state.smallpreviewer) {
            return (
                <div>
                    <Editorsmall function={this.handleClickEditor} inputUpdate={this.handleChange} text={this.state.input}/>
                    <Previewersmall function={this.handleClickPreviewer} text={this.state.input}/>
                </div>
            )
        }
        else if (!this.state.smalleditor && this.state.smallpreviewer) {
            return (
                <div>
                    <Editorlarge function={this.handleClickEditor} inputUpdate={this.handleChange} text={this.state.input} />
                    <Previewersmall function={this.handleClickPreviewer} text={this.state.input}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Previewerlarge function={this.handleClickPreviewer} text={this.state.input}/>
                </div>
            )
        }
    } 
};

ReactDom.render(<App />, document.getElementById("root"));

