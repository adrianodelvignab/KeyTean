import { connect } from "react-redux";
import {
  handleSortCode,
  handleSortDisplay,
  handleSort,
} from "../../redux/actions/manager";
import { stateType } from "../../redux/store";
import { withNamespaces } from "react-i18next";
import SortDialog from "./component";

const mapStateToProps = (state: stateType) => {
  return {
    sortCode: state.manager.sortCode,
    isSortDisplay: state.manager.isSortDisplay,
  };
};
const actionCreator = {
  handleSortCode,
  handleSortDisplay,
  handleSort
};
export default connect(
  mapStateToProps,
  actionCreator
)(withNamespaces()(SortDialog as any));
