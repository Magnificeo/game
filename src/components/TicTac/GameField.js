import Square from "./Square";
import "./GameField.css";

const COL_ELEMENTS = 9;

function GameField(props) {
  const elements = Array.from({ length: COL_ELEMENTS }, (_, i) => (
    <Square key={i} position={i} isChecked={false} tag="" />
  ));
  props.steps.forEach((step) => {
    const checked = elements[step.checkedPosition];
    if (!checked) return;
    elements[step.checkedPosition] = (
      <Square
        key={step.checkedPosition}
        position={step.checkedPosition}
        isChecked={true}
        tag={step.player}
      />
    );
  });

  const handlerOnCheck = (e) => {
    const checkbox = e.target.closest(".square__checkbox");
    if (!checkbox || checkbox.disabled || props.winner) return;
    const square = checkbox.closest(".square");
    const position = square.dataset.position;
    props.onMove(position);
  };

  return (
    <div onChange={handlerOnCheck} className="tic-tac__field">
      {elements}
    </div>
  );
}

export default GameField;
