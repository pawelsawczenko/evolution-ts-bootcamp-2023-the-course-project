import { observer } from "mobx-react-lite";
import React from "react";
import { gwentStore } from "../../../stores/GameStore";
import { PopUp } from "./PopUp";

import "./popup.css";

const PopUpContainer: React.FC = () => {
  const [popUpHidden, setPopUpHidden] = React.useState("pop-up-hidden");

  React.useEffect(() => {
    if (gwentStore.isOpponentPass && gwentStore.isPlayerPass) {
      // setTimeout(() => {
      //   setPopUpHidden("");
      // }, 1500);
      setPopUpHidden("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwentStore.isOpponentPass, gwentStore.isPlayerPass]);

  return (
    <div className={`pop-up-container ${popUpHidden}`}>
      <div className="pop-up-wrapper">
        <PopUp setPopUpHidden={setPopUpHidden}></PopUp>
      </div>
    </div>
  );
};

export const PopUpContainerObserver = observer(PopUpContainer);
