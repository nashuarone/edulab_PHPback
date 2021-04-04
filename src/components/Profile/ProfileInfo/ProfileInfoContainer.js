import { connect } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {
  updateProfileNameAC,
  addProfileDataAC,
} from "../../../redux/profileReducer";

const mapStateToProps = (state) => {
  return {
    profileData: state.profilePage.profileData,
    newNameText: state.profilePage.newNameText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileData: (newProfileData) => {
      dispatch(updateProfileNameAC(newProfileData));
    },
    addProfileData: () => {
      dispatch(addProfileDataAC());
    },
  };
};

const ProfileInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileInfo);

export default ProfileInfoContainer;
