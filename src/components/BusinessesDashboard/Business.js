import DeleteButton from './DeleteButton'

const Business = ({name,description,showDelete,id,onClick}) => {

    return (
        <div className="business" id={id} /**/>
            <span>{name} <DeleteButton onClick={showDelete}/></span>
            <p onClick={onClick}>{description}</p>
        </div>
    )
}

export default Business
