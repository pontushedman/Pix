import styles from './Styles/AddCategory.module.css'

function AddCategory(props) {
    const content = (() => {
        if(props.noAdd === true) {
            return <div className={styles.AddCategory}><img className={styles.Plus} src="./src/assets/plus.png"/><p className={styles.Text}>Add {props.category}</p></div>
        } else {
            return <div/>
        }
    })

/*     const ny = (() => {
        return "apa"
    }); */
    
    return (
        content()
    )
}

export default AddCategory

// hej