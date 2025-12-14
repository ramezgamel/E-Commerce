import axios from "axios";
import { useState } from "react";

function getFormData(data){
  const formKey = data['length'] > 1 ? 'images': 'image'
  const formData = new FormData();
  Object.keys(data).map((key)=>{
    formData.append(formKey, data[key])
  })
  return formData
}

async function readImage(image, arr){
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () =>  arr.push(reader.result)
}

function getPreview(data){
  const preview = []; 
  Object.keys(data).map(async (key)=>{
    readImage(data[key],preview);
  })
  return preview
}


async function uploadImage(data, setProgress, setImages, setErr){
  const path = data['length'] > 1 ? 'upload/multi': 'upload/single'
  const formData = getFormData(data);
  setErr(null)
  try {
    const {data:res} = await axios.post(`${import.meta.env.VITE_BASE_URL}api/${path}`,formData,{
      onUploadProgress:({loaded, total})=>{
        setProgress(Math.round((loaded * 100) / total));
      }
    });
    console.log(res);
    setImages(res)
  } catch (err) {
    console.log(err);
    setErr(err.response.data);
  }
}
export default function useUpload(){
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded]= useState(false);
  const [preview, setPreview] = useState();
  const [images, setImages] = useState();
  const [error, setError] = useState();
  async function uploadData (data) {
    setPreview(getPreview(data));
    await uploadImage(data,setProgress, setImages, setError)
    setIsUploaded(true);
  }
  return {images, error,preview, progress, isUploaded, uploadData}
}