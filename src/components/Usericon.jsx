import React from "react";
export function getInitials(name) {
  const words = name.split(" ");
  if (words.length === 1) {
    return name.slice(0, 2).toUpperCase();
  } else {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
}

export function getColor(name) {
  const charCodes = name
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce((acc, val) => acc + val, 0);
  const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"];
  return colors[charCodes % colors.length];
}

function UserIcon(props) {
  // const userInitials = getInitials(props.name);
  // const userColor = getColor(props.name);
  const dotcolor = props.userstatus ? "#e9b603" : "#9da0a5";
  return (
    <span
      className="user-icon"
      style={{ 
        // backgroundColor: userColor, 
        color: "black" }}
    >
      {props.name}
      {/* {userInitials} */}
      <div className="status-dot" style={{ backgroundColor: dotcolor }}></div>
    </span>
  );
}
export default UserIcon;
