import { useState } from "react";
import "./App.css";
import GameField from "./components/TicTac/GameField";
import RecordList from "./components/RecordList/RecordList";

const PLAYERS = ["X", "O"];

function App() {
  /* STATE-DATA STEPS */
  const [steps, setSteps] = useState([
    {
      index: 0,
      status: "Go to game start",
      player: "",
      nextPlayer: PLAYERS[0],
      checkedPosition: "",
    },
  ]);
  /* STATE-DATA CURRENT STEP */
  let [currentStep, setCurrentStep] = useState(steps[0]);
  /* WINNER VARIABLE */
  let winner = "";

  /* POINTS LOGIC */
  const checkWinner = () => {
    const userSteps = steps
      .slice(0, currentStep.index + 1)
      .filter((step) => step.player === currentStep.player);
    const points = {
      topHorizonatal: 0,
      middleHorizonatal: 0,
      bottomHorizonatal: 0,
      leftVertical: 0,
      middleVertical: 0,
      rightVertical: 0,
      topLeftParallel: 0,
      bottomLeftParallel: 0,
    };
    userSteps.forEach((step) => {
      const i = Number.parseFloat(step.checkedPosition);
      if (i === 0 || i === 1 || i === 2) points.topHorizonatal++;
      if (i === 3 || i === 4 || i === 5) points.middleHorizonatal++;
      if (i === 6 || i === 7 || i === 8) points.bottomHorizonatal++;
      if (i === 0 || i === 3 || i === 6) points.leftVertical++;
      if (i === 1 || i === 4 || i === 7) points.middleVertical++;
      if (i === 2 || i === 5 || i === 8) points.rightVertical++;
      if (i === 0 || i === 4 || i === 8) points.topLeftParallel++;
      if (i === 6 || i === 4 || i === 2) points.bottomLeftParallel++;
    });
    if (Object.values(points).some((position) => position === 3)) {
      winner = currentStep.player;
    }
  };
  /* CHECK WINNER EVERY STEP TOGGLE */
  checkWinner();
  /* MOVE NEXT LOGIC */
  const moveNext = (position) => {
    const makedStep = {
      index: currentStep.index + 1,
      status: `Go to move #${currentStep.index + 1}`,
      player: currentStep.nextPlayer,
      nextPlayer:
        currentStep.nextPlayer === PLAYERS[0] ? PLAYERS[1] : PLAYERS[0],
      checkedPosition: position,
    };
    setSteps((previousState) => [
      ...previousState.slice(0, currentStep.index + 1),
      makedStep,
    ]);
    setCurrentStep(makedStep);
  };
  /* MOVE BACK LOGIC */
  const moveBack = (index) => {
    setCurrentStep(steps[index]);
  };
  return (
    <div className="App">
      <div>
        {winner && (
          <div className="App__next-player-label">{`Winner: ${currentStep.player}`}</div>
        )}
        {!winner && steps.slice(0, currentStep.index + 1).length < 9 + 1 && (
          <div className="App__next-player-label">
            {`Next player: ${currentStep.nextPlayer}`}
          </div>
        )}
        {!winner && steps.slice(0, currentStep.index + 1).length === 9 + 1 && (
          <div className="App__next-player-label">{`Draw`}</div>
        )}

        <GameField
          steps={steps.slice(0, currentStep.index + 1)}
          onMove={moveNext}
          winner={winner}
        />
      </div>

      <div>
        <RecordList steps={steps} onMoveBack={moveBack} />
      </div>
    </div>
  );
}

export default App;
