import React, { useEffect, useContext } from 'react'
import AddCategory from './AddCategory'
import styles from './Styles/CategoryTitle.module.css'
import ContentAmount from './ContentAmount'
import { Link } from 'react-router-dom'
import ImgContext from '../store/img'


function CategoryTitle(props) {
  const JSONContext = useContext(ImgContext)
  const albums = JSONContext.AlbumsList

  useEffect(() => {
    console.log("CategoryTitle rendered")
  })

  function getAlbumFromId(id) {
    let album
    albums.map(a => {
      a.id === id ? album = a : null
    })
    return album
  }

  function openImage(e) {
    const imageId = e.target.dataset.id
    const obj = { show: true, mode: "image", id: imageId }
        props.showModal(obj)
  }

  function openAlbum(e) {
    const albumId = e.target.dataset.id
    const obj = { show: true, mode: "album", id: albumId }
    props.showModal(obj)
  }

  const albumCount = albums.length
  const imageCount = (() => {
    let count = 0
    albums.map(album => { count += album.pictures.length})
    return count
  })

  const availableCategories = ["albums", "images", "favorites"]
  const category = props.category
  let categoryCheck = false

  availableCategories.map(x => { x === category ? categoryCheck = true : null })

  if (categoryCheck === false) {
    console.debug("Invalid category input")
    return (<div />)
  }

  const image = "./src/assets/" + props.image + ".png"
  let categoryImage = props.small ? styles.categoryImageSmall : styles.categoryImageLarge

  const ContentCount = (() => {
    if (category === "albums") return albumCount
    if (category === "images") return imageCount()
    return ""
  })

  function Top() {
    return (
      <div className={styles.CategoryTitle}>
        <img className={categoryImage} src={image} />
        <p className={styles.Title}>{props.title}</p>
        <AddCategory showModal={props.showModal} noAdd={props.noAdd} category={props.category} />
        <ContentAmount suffix={category} count={ContentCount()} className={styles.Count} />
      </div>
    )
  }

  function Bottom() {
    return (
      <div className={styles.ViewAll}>
        <Link className={styles.categoryLink} to={"./" + props.title}> View all {props.title}</Link>
      </div>
    )
  }

  function Albums() {
    if (albums === undefined) {
      return "Loading";
    }
    return (
      <div className={styles.Albums}>
        {albums.map(x =>
          <div 
            onClick={(e => {
              openAlbum(e)
            })}
            key={x.id + 1} 
            className={styles.Album}
            data-id={x.id}
            >
            
            <img key={x.id + 2}
              className={styles.AlbumHeaderImage}
              data-id={x.id}
              src={"http://localhost:3000/" + x.headerImage}
            />
            <p key={x.id + 3} className={styles.AlbumTitle}>{x.title}</p>
            <p key={x.id + 4} className={styles.AlbumImageCount}>{x.pictures.length} Pictures</p>
          </div>)}
      </div>
    )
  }

  function Images() {
    if (albums === undefined) {
      return "Loading";
    }
    return (
      <div className={styles.Images}>
        {
          albums.map(x =>
            x.pictures.map(y =>
              <div 
                key={y.id} 
                className={styles.Image}
                data-id={y.id}
                onClick={(e => {openImage(e)})}
              >
                <img key={y.id + 1}
                  className={styles.PictureImage}
                  data-id={y.id}
                  src={"http://localhost:3000/" + x.path + "/" + y.imgLoRes} />
              </div>
            )
          )
        }
      </div>
    )
  }

  let cat = (() => {
    if (category === "albums") {
      return <Albums />
    } else if (category === "images") {
      return <Images />
    } else if (category === "favorites") {
      return <div />
    }
  })

  return (
    <div className={styles.CategoryContainer}>
      <Top />
      {cat()}
      <Bottom />
    </div>
  )
}

export default CategoryTitle