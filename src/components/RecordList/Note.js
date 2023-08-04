import Button from "../UI/Button/Button";
function Note(props) {
  return (
    <li className="note" data-index={props.index}>
      <Button className="note__button">{props.text}</Button>
    </li>
  );
}

export default Note;
