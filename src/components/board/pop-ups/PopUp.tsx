import React, { SetStateAction } from "react";
import { gwentStore } from "../../../stores/GameStore";
import { useNavigate } from "react-router-dom";
import "./popup.css";

interface PopUpProps {
  setPopUpHidden: React.Dispatch<SetStateAction<string>>;
}

export const PopUp: React.FC<PopUpProps> = ({ setPopUpHidden }) => {
  const navigate = useNavigate();

  const isGameWon =
    gwentStore.gameBoard.opponent.roundsWon === 2
      ? "Opponet won the game"
      : gwentStore.gameBoard.player.roundsWon === 2
      ? `You won the game!`
      : false;

  const whoWonRound =
    gwentStore.gameBoard.opponent.roundScore >
    gwentStore.gameBoard.player.roundScore
      ? "Opponent won the round"
      : gwentStore.gameBoard.opponent.roundScore <
        gwentStore.gameBoard.player.roundScore
      ? `You won the round`
      : "Draw!";

  const onClickPopUp = React.useCallback(() => {
    if (
      gwentStore.gameBoard.opponent.roundsWon === 2 ||
      gwentStore.gameBoard.player.roundsWon === 2
    ) {
      gwentStore.resetTheGame();
      setPopUpHidden("pop-up-hidden");
      navigate("/", { replace: false });
    } else {
      gwentStore.startNewRound();
      setPopUpHidden("pop-up-hidden");
    }
  }, [navigate, setPopUpHidden]);

  return (
    <div className="pop-up">
      <h2>{isGameWon || whoWonRound}</h2>
      <div className="round-scoring">
        <h3>Opponent : {gwentStore.gameBoard.opponent.roundsWon}</h3>
        <h3>Player : {gwentStore.gameBoard.player.roundsWon}</h3>
        <h3>Round score : {gwentStore.gameBoard.opponent.roundScore}</h3>
        <h3>Round score : {gwentStore.gameBoard.player.roundScore}</h3>
      </div>
      <div className="btns">
        <button className="btn btn-main" onClick={onClickPopUp}>
          Continue
        </button>
      </div>
    </div>
  );
};
