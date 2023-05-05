import React, { useContext, useEffect, useState } from 'react';
import img from '../../../accests/images/back-img.jpg'
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../../../Config/Firebase';
import { AuthContext } from '../../../Context/AuthContext';

export default function AllImages() {

  const {user} = useContext(AuthContext)

  const [document, setDocument] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {imagesData, setImagesData} = useState({})
  const {isProcessing, setIsProcessing} = useState(true)

  console.log(document)

  const fetchData = async () => {

    let array = []

   const q = query(collection(firestore, "imagesData"));

   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
   //   console.log(doc.id, " => ", doc.data());
         let data = doc.data()
       //   console.log('data', data)
         array.push(data)
   })
   setDocument(array)
   setIsLoading(false)
   }
 
   
 useEffect(()=>{
   fetchData()
   }, [user])



  return (
    <>
     
     <section className='my-5 mx-3'>
        <div className="container-fluid my-5">
             {!isProcessing ?
            <div className="row g-4">
               {document.map((imagesData, i)=>{
               return <div key={i} className=" col-lg-4 col-md-6 cl-sm-12 box  ">
                <div className='card border-0 img-home' style={{overflow:'hidden'}}>
                 <img src={imagesData.photoURL} alt="" className='img-fluid w-75'/>
                  <div className='icons m-3 bg-dark p-1 rounded-4'>
                  <i class="bi bi-person-circle text-warning fs-4 me-2"></i>
                 <span className='fw-bold  mt-3 text-light data' style={{fontSize: 10}}>{user.displayName}</span>
                  <i class="bi bi-balloon-heart text-danger fs-4 me-3 ms-3"></i><i class="bi bi-collection text-info fs-4 mb-2"></i>
                  </div>
                             
                </div>
              </div>
               })}
            </div>
          : <div className='border-spinner text-center'></div>}
        </div>
     </section>

    </>
  )
}
