import DeleteButton from './DeleteButton'

const Business = ({name,description,showDelete,id,onClick}) => {

    return (
        <div className="business" id={id}  onClick={onClick}>
            <p className='header'><span>{name}</span><DeleteButton onClick={showDelete}/></p>
            <p >{description}</p>
        </div>
    )
}

export default Business
