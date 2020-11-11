import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import profileIcon from "../../assets/user.svg";
import { useHistory } from "react-router-dom";

const ProfileMenu = () => {
  let history = useHistory();
  const stateName = useSelector((state) => state.login.users[0].name);
  const dispatch = useDispatch();
  return (
    <Dropdown className="float-right mt-5">
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        <Image src={profileIcon} roundedCircle width="32" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header>{stateName}</Dropdown.Header>
        <Dropdown.Item
          onClick={() => {
            localStorage.removeItem("userAuth");
            dispatch({
              type: "LOGOUT",
            });
            history.push("/login");
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileMenu;
