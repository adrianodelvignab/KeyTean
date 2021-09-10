// import localforage from "localforage";
import JSZip from "jszip";
import FileSaver from "file-saver";
import BookModel from "../model/Book";
import NoteModel from "../model/Note";
import DigestModel from "../model/Digest";
import HighligherModel from "../model/Highlighter";
import BookmarkModel from "../model/Bookmark";
class BackupUtil {
  static backup(
    books: BookModel[],
    notes: NoteModel[],
    digests: DigestModel[],
    highlighters: HighligherModel[],
    bookmarks: BookmarkModel[],
    handleFinish: () => void
  ) {
    let zip = new JSZip();

    let epubZip = zip.folder("epub");
    books.forEach((item) => {
      epubZip.file(`${item.name}.epub`, item.content);
    });
    books.forEach((item) => {
      delete item.content;
    });
    let dataZip = zip.folder("data");
    dataZip
      .file("notes.json", JSON.stringify(notes))
      .file("books.json", JSON.stringify(books))
      .file("digests.json", JSON.stringify(digests))
      .file("highlighters.json", JSON.stringify(highlighters))
      .file("bookmarks.json", JSON.stringify(bookmarks))
      .file("isList.json", localStorage.getItem("isList") || "no")
      .file("totalBooks.json", localStorage.getItem("totalBooks") || "0")
      .file("isSingle.json", localStorage.getItem("isSingle") || "yes")
      .file("isFirst.json", localStorage.getItem("isFirst") || "yes")
      .file(
        "sortCode.json",
        localStorage.getItem("sortCode") || "{ sort: 2, order: 2 }"
      )
      .file("fontSize.json", localStorage.getItem("fontSize") || "17")
      .file(
        "fontFamily.json",
        localStorage.getItem("fontFamily") || "Helvetica"
      )
      .file(
        "theme.json",
        localStorage.getItem("theme") || "rgba(255,254,252,1)"
      )
      .file("lineHeight.json", localStorage.getItem("lineHeight") || "1.25")
      .file("readingTime.json", localStorage.getItem("readingTime") || "")
      .file("recentBooks.json", localStorage.getItem("recentBooks") || [])
      .file("shelfList.json", localStorage.getItem("shelfList") || [])
      .file(
        "recordLocation.json",
        localStorage.getItem("recordLocation") || ""
      );

    let year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
      day = new Date().getDate();

    zip
      .generateAsync({ type: "blob" })
      .then(function (blob) {
        FileSaver.saveAs(
          blob,
          `${year}-${month < 9 ? "0" + month : month}-${
            day < 9 ? "0" + day : day
          }.zip`
        );
      })
      .then(() => {
        handleFinish();
      })
      .catch(() => {
        console.log("Error occurs");
      });
  }
}

export default BackupUtil;
