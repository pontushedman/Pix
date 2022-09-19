import styles from "./Styles/ShowAlbum.module.css"
import { useContext, useState} from "react"
import JSONContext from "../Store/JSONContext"
import FormAdd from "./FormAdd"

function ShowAlbum(props) {
  const JSONCtx = useContext(JSONContext)
  const albums = JSONCtx.AlbumsList

  console.log("Showalbum rendered")

  const [chosenImage, setChosenImage] = useState({ index: 0, image: getAlbumFromId(albums, props.id).pictures[0] })

  const album = getAlbumFromId(albums, props.id)

  function switchImageInc() {
    const plus = chosenImage.index + 1
    if (plus > album.pictures.length - 1) {
      setChosenImage({ index: chosenImage.index, image: album.pictures[chosenImage.index] })
    } else {
      setChosenImage({ index: plus, image: album.pictures[plus] })
    }
  }

  function switchImageDec() {
    let minus = chosenImage.index - 1
    minus < 0 ? minus = 0 :
      setChosenImage({ index: minus, image: album.pictures[minus] })
  }

  function switchImageFromId(e) {
    console.log(e.target)
    const imageId = e.target.dataset.id
    for (let index = 0; index < album.pictures.length; index++) {
      const img = album.pictures[index];
      if (img.id === imageId) {
        setChosenImage({index: index, image:img});
      } 
    }
  }

  function getAlbumFromId(list, value) {
    let albumx = {}
    list.map(album => {
      if (album.id === value) {
        albumx = album
      }
    })
    return albumx
  }

  return (
    <div className={styles.showAlbumContainer}>
      <div className={styles.top}>
        <p className={styles.title}>{album.title}</p>
        <p className={styles.comment}>{album.comment}</p>
        <div className={styles.formAdd}>
           <FormAdd/>
        </div>
      </div>
      <div className={styles.imageTitle}>
        <p>{chosenImage.image.title}</p>
      </div>
      <div className={styles.slideshow}>
        <div className={styles.left}>
          <img src="./src/assets/arrow-circle-left.svg" data-action="decrease" onClick={switchImageDec} id="minus" className={styles.button} />
        </div>
        <div className={styles.middle}>
          <div className={styles.imageContainer}>
            <div
              className={styles.image}
              style={{ backgroundImage: "url(http://localhost:3000/" + album.path + "/" + chosenImage.image.imgLoRes.replace(/ /g, '%20') + ")" }}
            >
              <div className={styles.imageCommentContainer}>
                <p className={styles.imageComment}>{chosenImage.image.comment}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img src="./src/assets/arrow-circle-right.svg" data-action="increase" onClick={switchImageInc} id="plus" className={styles.button} />
        </div>
      </div>
      <div className={styles.albumImages}>
        {
          album.pictures.map(image => {
            return (
              <div className={styles.albumImage}
                style={{ backgroundImage: "url(http://localhost:3000/" + album.path + "/" + image.imgLoRes.replace(/ /g, '%20') + ")" }}
                data-id={image.id}
                onClick={((e) => {switchImageFromId(e)})}
              />
            )
          })
        }
      </div>
      <div className={styles.actions}>
        <div className={styles.albumDelete + " " +  styles.albumAction}>
          <img src="src/assets/trash.svg"/>
          <p>Delete</p>
        </div>
        <div className={styles.albumDownload + " " +  styles.albumAction}>
          <img src="src/assets/download.svg"/>
          <p>Download</p>
        </div>
        <div className={styles.albumEdit + " " +  styles.albumAction} >
          <img src="src/assets/pencil.svg"/>
          <p>Edit</p>
        </div>
      </div>
    </div>
  )
}

export default ShowAlbum