import React, {useCallback, useState, useRef} from 'react'
import {useDropzone} from 'react-dropzone'
import { db, storage } from '../firebase'
import { addDoc, arrayUnion, collection,doc,serverTimestamp, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const Dropzone = () => {
  const [SelectImage, setSelectImage] = useState([])
  const publicar = useRef(null)
  const subirArchivos = async () => {
    const docRef = await addDoc(collection(db,'publicaciones'),{
      descripcion: publicar.current.value,
      timestamp: serverTimestamp()
    })
    await Promise.all(
      SelectImage.map(image => {
        const imageRef = ref(storage, `publicaciones/${docRef.id}/${image.path}`)
        uploadBytes(imageRef, image,'data_url').then(async () => {
          const downloadURL = await getDownloadURL(imageRef)
          await updateDoc(doc(db,'publicaciones',docRef.id),{
            images:arrayUnion(downloadURL)
          })
        })
      })
    )
    publicar.current.value=''
    setSelectImage([])
  }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setSelectImage(acceptedFiles.map(
      file => Object.assign(file,{
        preview:URL.createObjectURL(file)
      })
    ))
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})


  return (
    <>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop file </p>
    </div>
    <input ref={publicar} type="text" placeholder='descripcion'
    className='border rounded focus:ring-0 w-full text-xs p-3 y-4 mt-3'/>
    <button className="border rounded bg-blue-400 p-3 my-5 w-full" onClick={subirArchivos}>publicar</button>
    <p> Vista previa imagenes</p>
    {
        SelectImage?.map(file => (
          <img
            src={file.preview}
            alt="Picture of the author"
            width={200}
            height={200}
        />
        ))
    }
    </>
  )
}

export default Dropzone