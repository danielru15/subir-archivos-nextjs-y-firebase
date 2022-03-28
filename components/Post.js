import React, {useEffect, useState} from 'react'
import { db} from '../firebase'
import { collection,onSnapshot, orderBy, query} from "firebase/firestore";
import Image from 'next/image';

const Post = () => {
    let fechahoy = new Intl.DateTimeFormat('es-CO',{
        hour:'2-digit',
        minute:'2-digit',
        second:'numeric',
        hour12:true
    })
    const [Publicaciones, setPublicaciones] = useState([])
    useEffect(() => {
      const collectionRef = collection(db, 'publicaciones') 
      const Query = query(collectionRef,orderBy('timestamp','desc'))
      const listen = onSnapshot(Query, (querySnapshot) => {
          setPublicaciones(querySnapshot.docs.map(
              doc => ({
                  ...doc.data(), 
                  id:doc.id,
                  timestamp: doc.data().timestamp?.toDate().getTime(),
              })
          ))
      })
    
      return listen
    }, [])
    
  return (
    <div>
        {Publicaciones.map( publicacion => <div className="bg-white rounded-lg shadow-xl 
        p-8 w-1/2 m-auto mb-4" key={publicacion.id}>
            <div className='text-lg'>{publicacion.descripcion}</div> 
            <div className='flex space-x-3'>
                {publicacion.images?.map( file => (
                    <div className='relative w-full h-96'>
                        <Image
                            src={file}
                            layout='fill'
                            objectFit='contain'
                        />
                    </div>
                ))}
            </div>
            <p className='text-right text-gray-400'>{fechahoy.format(publicacion.timestamp)}</p>
        </div>)}
    </div>
  )
}

export default Post