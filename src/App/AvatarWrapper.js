import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAvatar } from "../redux/actions/common.action";

const AvatarWrapper = () => {

  const {uid, firstName} = useSelector(state => ({
    uid: state.userEntitlement.user.uid,
    firstName: state.userEntitlement.user.firstName
  }));
  const [imageURL, setImageURL] = useState()
  useEffect(() => {
    getAvatar(uid)
    .then(image => {
      setImageURL("data:image/png;base64,"+image);
    })
  }, []);

  return(
    <Avatar src={imageURL}>{firstName?firstName.charAt(0):""}</Avatar>
  );
}
export default AvatarWrapper;