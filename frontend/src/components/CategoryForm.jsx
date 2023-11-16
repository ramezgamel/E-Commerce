import { useEffect, useState } from "react";
import { useCreateCatsMutation, useUpdateCatMutation } from "../store/catApiSlice";
import { toast } from 'react-toastify';
/* eslint-disable react/prop-types */
function CategoryForm({setShow ,category}) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [createCat] = useCreateCatsMutation();
  const [updateCat] = useUpdateCatMutation();
  useEffect(()=>{
    if(category){
      setName(category.name)
      setImage(category.image)
    }
  }, [category]);
  const submitHandler = async (e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    try {
      if(!category) {
      await createCat(formData).unwrap();
      setShow(false)
      toast.success("Category created")
    } else {
      formData.append('_id', category._id);
      await updateCat(formData).unwrap();
      setShow(false)
      toast.success("Category updated")
    }
    } catch (err) {
      toast.error(err || 'Something went wrong')
    }
  }
  return (
    <form onSubmit={submitHandler}>
      {/* {isLoading && <Loader/>} */}
      <div className="mb-3">
        <label htmlFor="name">Category Name</label>
        <input type="text" placeholder="Category name" value={name} onChange={(e)=> setName(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="image">Image</label>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="text-right">
        <button className="btn" type="submit">{category? "Update":"Create"}</button>
      </div>
    </form>
  )
}

export default CategoryForm
