import React, { useState, useEffect } from "react";
import UserIcon from "./Usericon";
function finduserstatus(customid, users) {
  const user = users.find((user) => user.name === customid);
  return user ? user.available : null;
}
function Head(props) {
  var name = props.name;
  var key = props.keys;
  const [displayname, setdisplayname] = useState("");
  const [displayicon, setdisplayicon] = useState("");
  const [colorclass, setcolorclass] = useState("color-grey");
  useEffect(() => {
    if (props.name === "ByPriority") {
      console.log("we are in priority mode");
      console.log(props.keys);
      if (props.keys === "0") {
        console.log("we are inside priority mode");
        setdisplayname("No Priority");
        setdisplayicon("more_horiz");
        setcolorclass("color-grey");
      } else if (key === "1") {
        setdisplayname("Low");
        setdisplayicon("signal_cellular_1_bar");
      } else if (key === "2") {
        setdisplayname("Medium");
        setdisplayicon("signal_cellular_3_bar");
      } else if (key === "3") {
        setdisplayname("High");
        setdisplayicon("signal_cellular_4_bar");
      } else if (key === "4") {
        setdisplayname("Urgent");
        setdisplayicon("priority_high");
        setcolorclass("color-orange");
      } else {
        setdisplayname("None");
      }
    } else if (name === "ByUser") {
      setdisplayname(props.keys);
      setdisplayicon("account_circle");
    } else if (name === "ByStatus") {
      setdisplayname(props.keys);
      if (key === "Todo") {
        setdisplayicon("circle");
        setcolorclass("color-grey");
      } else if (key === "In progress") {
        setdisplayicon("radio_button_partial");
        setcolorclass("color-yellow");
      } else if (key === "Backlog") {
        setdisplayicon("cancel");
      } else if (key === "Done") {
        setdisplayicon("check_circle");
        setcolorclass("color-blue");
      }
    }
  }, [props.name, props.key]);
  return (
    <div>
      <div className="headdiv">
        <div>
          {props.name === "ByUser" ? (
            <UserIcon
              name={displayname}
              userstatus={finduserstatus(displayname, props.userjson)}
            />
          ) : (
            <span className={colorclass}>
              <i class="material-symbols-outlined `${colorclass}`">
                {displayicon}
              </i>
            </span>
          )}
          <p>{displayname}</p>
          <p className="color-grey">{props.size}</p>
        </div>
        <div>
          <i class="material-symbols-outlined color-grey ">add</i>
          <i class="material-symbols-outlined color-grey">more_horiz</i>
        </div>
      </div>
    </div>
  );
}
export default Head;
