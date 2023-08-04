import Note from "./Note";
function RecordList(props) {
  const notes = props.steps.map((step) => (
    <Note text={step.status} key={step.index} index={step.index} />
  ));
  const handlerOnClick = (e) => {
    const btn = e.target.closest(".note__button");
    if (!btn) return;
    const note = btn.closest(".note");
    const index = note.dataset.index;
    props.onMoveBack(index);
  };
  return <ol onClick={handlerOnClick}>{notes}</ol>;
}

export default RecordList;
