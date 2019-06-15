import React from 'react';

import {
  ContentState,
  convertToRaw,
  convertFromHTML,
  Editor,
  EditorState,
  RawDraftContentBlock,
  RawDraftContentState
} from 'draft-js';

import htmlToDraft from 'html-to-draftjs';

interface Props {
  onChangeCallback: (content:any) => void;
  content:string;
}

interface State {
  editorLoaded:boolean;
  editorState:any;
}

class Draft extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      editorLoaded: false,
      editorState: EditorState.createEmpty()
    };
  }

  componentWillReceiveProps(props:any) {
    if ( ! this.state.editorLoaded && props.content) {
      this.setState({
        editorLoaded: true,
        editorState: this.fromHtml(props.content)
      });
    }
  }

  fromHtml(html:string) {
    const blocksFromHTML = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  }

  toHtml(raw:RawDraftContentState) {
    return raw.blocks.map((block:RawDraftContentBlock) => {
      return `<p>${block.text}</p>`;
    }).join('');
  }

  editorOnChange = (editorState:EditorState) => {
    this.setState({ editorState });
    const raw = convertToRaw(editorState.getCurrentContent());
    const html = this.toHtml(raw);
    this.props.onChangeCallback(html);
  }

  render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.editorOnChange} />
    );
  }
}

export default Draft;
