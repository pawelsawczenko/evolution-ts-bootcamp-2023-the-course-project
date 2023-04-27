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

  // TODO: all on click (useCallback, useMemo)?
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
  }, []);

  return (
    <div className="pop-up">
      <h2>{isGameWon || whoWonRound}</h2>
      <h3>
        opponent - {gwentStore.gameBoard.opponent.roundsWon} round score -{" "}
        {gwentStore.gameBoard.opponent.roundScore}
      </h3>
      <h3>
        player - {gwentStore.gameBoard.player.roundsWon} round score -{" "}
        {gwentStore.gameBoard.player.roundScore}
      </h3>
      <button onClick={onClickPopUp}>close pop up</button>
    </div>
  );
};
