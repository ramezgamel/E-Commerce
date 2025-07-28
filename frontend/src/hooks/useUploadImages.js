import { useState } from 'react';
import axios from 'axios';

const useImageUpload = () => {
  const [images, setImages] = useState([]); // Stores image previews 
  const [imageFiles, setImageFiles] = useState([]); // Stores the actual file objects
  const [isUploading, setIsUploading] = useState(false); // process status
  const [uploadResponse, setUploadResponse] = useState(null); 
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0)

  
  const handleImageChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files); 
    const newImages = fileArray.map((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file); 
      return file;
    });
    setImageFiles(newImages);
  };


  const handleUpload = async () => {
    if (imageFiles.length === 0) {
      return;
    }
    
    const path = imageFiles.length > 1 ? 'uploadMulti': 'uploadSingle';
    const fieldName = imageFiles.length == 1 ? "image": 'images'
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append(fieldName, file); 
    });
    setIsUploading(true);
    setError(null);
    try {
      const {data:res} = await axios.post(`${import.meta.env.VITE_BASE_URL}api/${path}`,formData,{
      onUploadProgress:({loaded, total})=>{
        setProgress(Math.round((loaded * 100) / total));
      }
    });
      setUploadResponse(res.data);
    } catch (err) {
      setError(err.message || 'Error uploading images');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    images, 
    handleImageChange, 
    handleUpload,
    isUploading, 
    uploadResponse, 
    error, 
    progress
  };
};

export default useImageUpload;
