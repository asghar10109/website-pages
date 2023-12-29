const toolbar = {
    options: [
      "blockType",
      "inline",
      "list",
      // "textAlign",
      "link",
      // "embedded",
      "image"
    ],
    blockType: {
      inDropdown: true,
      options: ["H2", "H3", "H4", "Normal", "Blockquote"],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined
    },
    inline: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ["bold", "italic", "underline"]
    },
    link: {
      options: ["link", "unlink"],
      showOpenOptionOnHover: false
    },
    list: {
      options: ["ordered", "unordered"]
    },
    image: {
      className: undefined,
      component: undefined,
      popupClassName: undefined,
      urlEnabled: true,
      uploadEnabled: true,
      alignmentEnabled: true,
      uploadCallback: undefined,
      previewImage: false,
      inputAccept: "image/gif,image/jpeg,image/jpg,image/png",
      alt: { present: true, mandatory: true },
      defaultSize: {
        height: "auto",
        width: "auto"
      }
    }
  };
  
  export default toolbar;
  