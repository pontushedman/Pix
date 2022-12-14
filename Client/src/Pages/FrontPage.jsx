import CategoryTitle from "../Components/CategoryTitle";
import styles from './Styles/FrontPage.module.css'

function FrontPage(props) {
  return (
    <div className={styles.mainContainer}>
      <CategoryTitle
        noAdd={true}
        small={false}
        category="albums"
        title="Albums"
        image="albums"
        showModal={props.showModal}
        cap={10}
      />
      <CategoryTitle
        noAdd={true}
        small={true}
        category="images"
        title="Images"
        image="images"
        showModal={props.showModal}
        cap={28}
      />
      <CategoryTitle
        noAdd={false}
        small={true}
        category="favorites"
        title="Favorites"
        image="favorites"
        showModal={props.showModal}
        expand={false}
      />
    </div>
  )
}

export default FrontPage