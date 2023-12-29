import React from "react";
import PropTypes from "prop-types";
import { EditorState, Modifier } from "draft-js";

const CustomComponent = ({ editorState, onChange }) => {
  const addStar = () => {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "⭐",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  return <div onClick={addStar}>⭐</div>;
};

CustomComponent.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object
};

export default CustomComponent;
