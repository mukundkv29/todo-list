import React, { useState, useEffect } from "react";
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
        
        setcolorclass("color-grey");
      } else if (key === "1") {
        setdisplayname("Low");
        
      } else if (key === "2") {
        setdisplayname("Medium");
        
      } else if (key === "3") {
        setdisplayname("High");
        
      } else if (key === "4") {
        setdisplayname("Urgent");
        
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
        
        setcolorclass("color-grey");
      } else if (key === "In progress") {
        
        setcolorclass("color-yellow");
      } else if (key === "Backlog") {
        
      } else if (key === "Done") {
        
        setcolorclass("color-blue");
      }
    }
  }, [props.name, props.key]);
  return (
    <div>
      <div className="headdiv">
        <div>
          
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
