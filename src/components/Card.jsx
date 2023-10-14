import { useEffect, useState } from "react";
import UserIcon from "./Usericon";
//functions

function Card(props) {
  const obj = props.jsondata;
  console.log(obj);
  const [displayicon, setdisplayicon] = useState("");
  const [colorclass, setcolorclass] = useState("");
  useEffect(() => {
    if (obj.status === "Todo") {
      setdisplayicon("circle");
      setcolorclass("color-grey");
    } else if (obj.status === "In progress") {
      setdisplayicon("radio_button_partial");
      setcolorclass("color-yellow");
    } else if (obj.status === "Done") {
      setdisplayicon("check_circle");
      setcolorclass("color-blue");
    } else if (obj.status === "Backlog") {
      setdisplayicon("cancel");
    }
  }, [obj.status]);
  return (
    <div className="card">
      <div>
        <span className="color-grey">{obj.id}</span>
        <UserIcon name={props.name} userstatus={props.userstatus} />
      </div>
      <div>
        <span className={colorclass}>
          <i class="material-symbols-outlined ">{displayicon}</i>
        </span>
        <span>{obj.title}</span>
      </div>
      <div>
        <div></div>
        <span>Feature Request</span>
      </div>
    </div>
  );
}
export default Card;
