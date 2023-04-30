import React, { useState } from "react";
// import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { gwentStore } from "../../stores/GameStore";

import BlackChip from "../../assets/BlackChip.svg";
import RedChip from "../../assets/RedChip.svg";

import "./coinflip.css";

export const CoinFlip: React.FC = () => {
  const [coinAnimation, setCoinAnimation] = useState({});
  const [btnFlipHidden, setBtnFlipHidden] = useState("");
  const [btnContinueHidden, setBtnContinueHidden] = useState("btn-hidden");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [text, setText] = useState("Flip the coin to continue.");

  const navigate = useNavigate();

  const flipTheCoin = () => {
    setCoinAnimation({ animation: "none" });
    setBtnFlipHidden("btn-hidden");
    setBtnContinueHidden("");
    setText("Flipping the coin...");

    if (gwentStore.isPlayerMoveFirst) {
      setCoinAnimation({ animation: "spin-tails 3s forwards" });
    } else {
      setCoinAnimation({ animation: "spin-heads 3s forwards" });
    }

    setTimeout(() => {
      setText(
        gwentStore.isPlayerMoveFirst
          ? "Red. You go first!"
          : "Black. Opponent goes first."
      );
      setBtnDisabled(false);
    }, 3200);
  };

  const startGame = () => {
    navigate("/gameboard", { replace: false });
  };

  return (
    <div className="pop-up-container">
      <div className="wrapper">
        <div className="coin-wrapper">
          <h2 className="text">{text}</h2>
          <div className="coin" id="coin" style={coinAnimation}>
            {/* <div className="heads">
            <img src={RedChip} alt="red poker chip" />
          </div>
          <div className="tails">
            <img src={BlackChip} alt="black poker chip" />
          </div> */}
            <div className="heads">
              <img src={RedChip} alt="red poker chip" />
            </div>
            <div className="middle"></div>
            <div className="middle"></div>
            <div className="middle"></div>
            <div className="middle"></div>
            <div className="middle"></div>
            <div className="middle"></div>
            <div className="middle"></div>
            <div className="middle"></div>
            <div className="middle"></div>
            <div className="tails">
              <img src={BlackChip} alt="black poker chip" />
            </div>
          </div>
          <div className="btns">
            <button
              className={`btn btn-main ${btnFlipHidden}`}
              id="btn-flip"
              onClick={flipTheCoin}
            >
              Flip Coin
            </button>
            <button
              className={`btn btn-main ${btnContinueHidden}`}
              id="btn-continue"
              disabled={btnDisabled}
              onClick={startGame}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
