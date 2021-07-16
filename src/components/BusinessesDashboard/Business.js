import DeleteButton from './DeleteButton'

const Business = ({name,description,showDelete,id}) => {
    const onClick = (event) => {
        console.log(event.target.id)
    }
    return (
        <div className="business" id={id} onClick={onClick}>
            <span>{name} <DeleteButton onClick={showDelete}/></span>
            <p>{description}</p>
        </div>
    )
}

export default Business
