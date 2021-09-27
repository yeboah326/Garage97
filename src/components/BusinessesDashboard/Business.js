import DeleteButton from "./DeleteButton";

const Business = ({ name, description, showDelete, id, onClick }) => {
  return (
    <div className="business" id={id}>
      <p className="header">
        <span onClick={onClick}>{name}</span>
        <DeleteButton onClick={showDelete} />
      </p>
      <p onClick={onClick}>{description}</p>
    </div>
  );
};

export default Business;
