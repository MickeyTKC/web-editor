window.addEventListener("DOMContentLoaded", event => {
  // Config of the quilljs tools
  const tools = {
    debug: false,
    //debug: "info",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image", "video", "formula"],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"], // remove formatting button
      ],
    },
    placeholder: "Compose an epic...",
    theme: "snow",
  };
  // init the quill object 
  const quill = new Quill("#editor", tools);
  // custom function of the editor base on quill
  const editor = {
    out: () => {
      const data = quill.getContents();
      out = JSON.stringify(data);
      return out;
    },
    in: data => {
      data = JSON.parse(data);
      quill.setContents(data);
    },
  };
  // custom elements
  const btnOpen = document.querySelectorAll("#open")[0];
  const btnSave = document.querySelectorAll("#save")[0];
  // oopen file function
  btnOpen.addEventListener("click", () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.click();
    inputFile.addEventListener("change", e => {
      const file = inputFile.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        editor.in(reader.result);
      };
    });
  });

  btnSave.addEventListener("click", () => {
    const data = editor.out();
    const file = new Blob([data], { type: "json" });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      var a = document.createElement("a");
      url = URL.createObjectURL(file);
      a.href = url;
      a.download = "content.json";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  });
});
