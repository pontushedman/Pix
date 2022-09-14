import style from "./Styles/AddPicture.module.css";
import React from "react";
import { useState, useEffect } from "react";

//This component is being used to fill the modal when modalstate === addPicturess
function AddPicture() {

  //State used to rerender component
  const [selectedFiles, setSelectedFiles] = useState()

  //We have to use useEffect here to access the submit button after render.

  //**When code is inside the useEffect hook, it only executes after component is rendered**
  useEffect(() => {
    const button = document.getElementById("submit")
    button.addEventListener("click", ((event) => {
      event.preventDefault()
      logLocalStorage()
    }))

    const inputs = document.getElementsByClassName(style.choice);
    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index];
      element.addEventListener("change", (e) => {
        const value = e.target.value
        const key = element.getAttribute('data-key')
        const field = element.getAttribute('data-field')
        updateLocalStorage(key, field, value)
      })
    }
  }, [selectedFiles])

  //Function to populate Localstorage
  function setToLocalStorage(key, value) {
    try {
      localStorage.setItem(key, value);
      console.log("Saved item to storage")
    } catch (error) {
      console.log("Couldnt save item to storage")
    }
    setSelectedFiles(localStorage.length)
  }

  function updateLocalStorage(inputKey, inputField, inputValue) {
    const storageItem = JSON.parse(localStorage.getItem(inputKey))
    let storageItemKeys = [...Object.entries(storageItem)]

    for (let index = 0; index < storageItemKeys.length; index++) {
      let key = storageItemKeys[index][0]

      if (key === inputField) {
        storageItemKeys[index][1] = inputValue
      }
    }

    const newObj = JSON.stringify(Object.fromEntries(storageItemKeys))
    setToLocalStorage(inputKey, newObj)
  }


  //Component that shows the "Add Picture" area and handles all the adding
  function FormAdd() {
    return (
      <div className={style.largeAdd}>
        <div className={style.smalladd}>
          <p>Add</p>
        </div>
        <div className={style.chooseDiv}>
          <button className={style.uploadButton}></button>

          {/*This inputs onChange triggers when you have chosen an image, 
          //That image is being used as input in the callback function, (image) in this case
          //We read that image in the filereader and converts it to a dataURL(file in textformat???).
          //We store the file in a canvas that we resize, we then access the data in the canvas and converts it to a dataURL
          //That is how we save two pictures in two different sizes.*/}
          <input
            onChange={(image) => {
              const file = image.target.files[0]
              var reader = new FileReader()
              reader.readAsDataURL(file)
              reader.addEventListener("load", () => {
                //Create Image
                const img = document.createElement("img")
                //Convert image
                img.onload = (() => {
                  const canvas = document.createElement("canvas")
                  const ctx = canvas.getContext("2d")

                  const convertedHeight = img.height * 0.5
                  const convertedWidth = img.width * 0.5

                  canvas.width = convertedWidth
                  canvas.height = convertedHeight

                  ctx.drawImage(img, 0, 0, convertedWidth, convertedHeight)
                  const resizedImage = canvas.toDataURL(file.type);
                  //Store images and empty properties in Localstorage.
                  setToLocalStorage(file.size, JSON.stringify({ hires_image: reader.result, lowres_image: resizedImage, title: "", comment: "", albums: [] }))
                  //Rerender component to reflect changes in Localstorage.
                  setSelectedFiles(localStorage.length)
                })
                //Populate image element with original image.
                //This is to trigger the img.onload function.  
                img.src = reader.result
              })
            }}
            className={style.chooseFile} type="file" name="picture"
          />
        </div>
      </div>)
  }

  //Loop through localstorage and show what's returned in input and image tags
  function ChosenPictures() {
    console.log("Localstorage length" + localStorage.length)
    let pictureContainer = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      let value = JSON.parse(localStorage.getItem(key))

      pictureContainer.push(
        <div className={style.chosenPictureContainer}>
          <div className={style.chosenPictureBoundary}>
            <img className={style.chosenPicture} src={value.hires_image} />
          </div>
          <input id="choiceTitle" className={style.choice} data-key={key} data-field="title" name={key + "_Title"} placeholder={value.title} type="text" />
          <input id="choiceComment" className={style.choice} data-key={key} data-field="comment" name={key + "_Comment"} placeholder={value.comment} type="text" />
          <select data-key={key} data-field="album" name={key + "_Album"} className={style.choice}>
            <option>Album 1</option>
            <option>Album 2</option>
          </select>
        </div>
      )
    }
    return pictureContainer
  }

  //Push the objects in localstorage to a singleobjects that's supposed to be sent in a POST request
  function logLocalStorage() {
    let images = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      let value = JSON.parse(localStorage.getItem(key))
      images.push(value)
    }
    const storageObjects = { ...images }
    console.log(storageObjects)
  }

  return (
    <div className={style.container}>
      <div className={style.formcontainer}>
        <div className={style.top}>
          <p className={style.title}>Add Pictures</p>
          <FormAdd />
        </div>

        <form method="post" className={style.formx}>
          <div className={style.collection}>
            <ChosenPictures />
          </div>
          <div id="submit" className={style.choosebtn}>Upload</div>
        </form>

      </div>
    </div>
  );
}

export default AddPicture;
