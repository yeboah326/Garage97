import DeleteButton from './DeleteButton'

const Business = ({name,description,showDelete,id,onClick}) => {

    return (
        <div className="business" id={id} onClick={onClick}>
            <span>{name} <DeleteButton onClick={showDelete}/></span>
            <p>{description}</p>
        </div>
    )
}

export default Business
