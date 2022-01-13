import OtherUtil from "./otherUtil";

class readerConfig {
  // 为 iframe 添加默认的样式
  static addDefaultCss() {
    if (!document.getElementsByTagName("iframe")[0].contentDocument) {
      return;
    }
    let css = this.getDefaultCss();
    let iDoc = document.getElementsByTagName("iframe")[0].contentDocument;
    let style = iDoc!.getElementById("default-style");
    let background = document.querySelector(".background");
    background!.setAttribute(
      "style",
      `background-color:${OtherUtil.getReaderConfig("theme")}`
    );

    if (!style) {
      style = iDoc!.createElement("style");
      style.id = "default-style";
      style.textContent = css;
      iDoc!.head.appendChild(style);
      return;
    }
    style.textContent = css;
  }
  // 获取为文档默认应用的css样式
  static getDefaultCss() {
    let colors = ["#FBF1D1", "#EFEEB0", "#CAEFC9", "#76BEE9"];
    let css1 = `::selection{background:#f3a6a68c}::-moz-selection{background:#f3a6a68c}[class*=color-]:hover{cursor:pointer;background-image:linear-gradient(0,rgba(0,0,0,.075),rgba(0,0,0,.075))}.color-0{background-color:${colors[0]}}.color-1{background-color:${colors[1]}}.color-2{background-color:${colors[2]}}.color-3{background-color:${colors[3]}}`;
    let css2 = [
      "a, article, cite, code, div, li, p, pre, span, table {",
      `    font-size: ${
        OtherUtil.getReaderConfig("fontSize") || 17
      }px !important;`,
      `    line-height: ${
        OtherUtil.getReaderConfig("lineHeight") || "1.25"
      } !important;`,
      `    font-family: "${
        OtherUtil.getReaderConfig("fontFamily") || "Helvetica"
      }" !important;`,
      "}",
      "img {",
      "    max-width: 100% !important;",
      "}",
    ];
    return css1 + css2.join("\n");
  }
}
export const themeList = [
  { id: 1, theme: "rgba(235,255,231,1)" },
  { id: 2, theme: "rgba(244, 232, 211,0.4)" },
  { id: 3, theme: "rgba(242,219,187,0.8)" },
  { id: 4, theme: "rgba(255,254,252,1)" },
];
export const fontSizeList = [
  { id: 1, size: "Small", value: "15" },
  { id: 2, size: "Medium", value: "17" },
  { id: 3, size: "Large", value: "20" },
  { id: 4, size: "Extra Large", value: "23" },
  { id: 5, size: "Ultra Large", value: "26" },
];
export const updateLog = {
  date: "2020.8.23",
  new: [
    "现在您可以给喜爱的图书添加心形标记，并且可以在我的喜爱中找到所有标记过的图书",
    "添加书签之后，这一页的右上角会出现书签图标",
    "图书操作的UI优化",
  ],
  fix: [
    "修复笔记，书摘，书签跳转位置不准确的问题",
    "修复删除书签导致阅读器崩溃的问题",
    "修复阅读进度为NaN的问题",
    "修复笔记弹窗超出阅读器范围的问题",
    "修复导入图书失败后，图书页面闪烁问题",
  ],
};

export const dropdownList = [
  {
    id: 1,
    title: "Font Family",
    value: "fontFamily",
    option: [
      { id: 1, name: "Helvetica", value: "Helvetica" },
      { id: 2, name: "Times New Roman", value: "Times New Roman" },
      { id: 3, name: "Microsoft YaHei", value: "Microsoft YaHei" },
      { id: 4, name: "SimSun", value: "SimSun" },
      { id: 5, name: "SimHei", value: "SimHei" },
      { id: 6, name: "Aril", value: "Aril" },
    ],
  },
  {
    id: 2,
    title: "Line Height",
    value: "lineHeight",
    option: [
      { id: 1, name: "1.25", value: "1.25" },
      { id: 2, name: "1", value: "1" },
      {
        id: 3,
        name: "1.25",
        value: "1.25",
      },
      { id: 4, name: "1.5", value: "1.5" },
      {
        id: 5,
        name: "1.75",
        value: "1.75",
      },
      { id: 6, name: "2", value: "2" },
    ],
  },
];
export const sideMenu = [
  {
    name: "All Books",
    icon: "home",
    mode: "home",
  },
  {
    name: "My Favorites",
    icon: "love",
    mode: "favorite",
  },
  {
    name: "My Bookmarks",
    icon: "bookmark",
    mode: "bookmark",
  },
  {
    name: "My Notes",
    icon: "idea",
    mode: "note",
  },

  {
    name: "My Digests",
    icon: "digest",
    mode: "digest",
  },
];
export const config = {
  callback_url:
    process.env.NODE_ENV === "production"
      ? "https://reader.960960.xyz"
      : "http://localhost:3000",
  token_url:
    process.env.NODE_ENV === "production"
      ? "https://koodo.960960.xyz"
      : "http://localhost:3001",
  dropbox_client_id: "e3zgg310xbizvaf",
  googledrive_client_id:
    "99440516227-ifr1ann33f2j610i3ri17ej0i51c7m6e.apps.googleusercontent.com",
  onedrive_client_id: "ac96f9bf-94f2-49c0-8418-999b919bc236",
};
export const driveList = [
  {
    id: 1,
    name: "Local",
    icon: "local",
    url: "",
  },
  {
    id: 2,
    name: "Dropbox",
    icon: "dropbox",
    url: `https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=${config.dropbox_client_id}&redirect_uri=${config.callback_url}`,
  },

  {
    id: 3,
    name: "Google Drive",
    icon: "googledrive",
    url: "",
  },
  {
    id: 4,
    name: "OneDrive",
    icon: "onedrive",
    url: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${config.onedrive_client_id}&scope=files.readwrite offline_access&response_type=code&redirect_uri=${config.callback_url}`,
  },
  {
    id: 5,
    name: "WebDav",
    icon: "webdav",
    url: "",
  },
];
export const emptyList = [
  {
    mode: "home",
    main: "Empty Library",
    sub: "Click the top-right button to add books",
  },
  {
    mode: "favorite",
    main: "No Favorite Books",
    sub:
      "Move your mouse on the top of any book, click the heart icon to add it to your favorite books",
  },
  {
    mode: "bookmark",
    main: "Empty Bookmark",
    sub: "Move your mouse on the top edge of the reader",
  },
  {
    mode: "note",
    main: "Empty Note",
    sub: "Select any text and click the Add-Note button on the popup Menu",
  },
  {
    mode: "digest",
    main: "Empty Digest",
    sub: "Select any text and click the Collect button on the popup Menu",
  },
  {
    mode: "shelf",
    main: "Empty Shelf",
    sub: "Move your mouse on the top of any book",
  },
];
export const welcomeMessage = [
  {
    main: "This is a free and open-source Epub reader",
    sub:
      "Koodo Reader works on multiple platforms with backup and restore support",
  },
  {
    main: "For better reading experience",
    sub:
      "Supports for theme changing, reading history, book managerment, shelf managerment and more",
  },
  {
    main: "Fluent and easy operation",
    sub:
      "Move your mouse to the edge of the reader to trigger menu,use mouse wheel and keyborad to switch pages",
  },
  {
    main: "Go to Add your first book",
    sub: "That's all for the tutorial",
  },
];
export default readerConfig;
