import "./Square.css";
function Square(props) {
  return (
    <label className="square" data-position={props.position}>
      {props.isChecked && (
        <input type="checkbox" className="square__checkbox" disabled></input>
      )}
      {props.isChecked === false && (
        <input type="checkbox" className="square__checkbox"></input>
      )}
      <span className="square__tag">{props.tag}</span>
    </label>
  );
}

export default Square;
