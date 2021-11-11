//备份和恢复页面
import {
  handleBackupDialog,
  handleTokenDialog,
} from "../../redux/actions/backupPage";
import { connect } from "react-redux";
import { handleMessageBox, handleMessage } from "../../redux/actions/manager";

import { stateType } from "../../redux/store";
import { withNamespaces } from "react-i18next";
import BackupPage from "./component";
const mapStateToProps = (state: stateType) => {
  return {
    books: state.manager.books,
    bookmarks: state.reader.bookmarks,
    notes: state.reader.notes,
    digests: state.reader.digests,
    isOpenTokenDialog:state.backupPage.isOpenTokenDialog,
    highlighters: state.reader.highlighters,
  };
};
const actionCreator = {
  handleBackupDialog,
  handleMessageBox,
  handleMessage,
  handleTokenDialog,
};
export default connect(
  mapStateToProps,
  actionCreator
)(withNamespaces()(BackupPage as any));
