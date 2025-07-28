import { useRef } from "react";
import { useCreateCatsMutation, useUpdateCatMutation } from "../../store/catApiSlice";
import { toast } from 'sonner';
import Progress from "../Progress";
import useUpload from "../../hooks/useUpload";
/* eslint-disable react/prop-types */
function CategoryForm({ setShow, category }) {
  const nameInput = useRef();
  const [createCat] = useCreateCatsMutation();
  const [updateCat] = useUpdateCatMutation();
  const { images, error: uploadErr, preview, progress, isUploaded, uploadData } = useUpload();
  const submitHandler = async (e) => {
    e.preventDefault();
    const cat = {
      name: nameInput.current.value,
      image: images ? images : category.image
    };

    try {
      if (category) {
        cat._id = category._id;
        await updateCat(cat).unwrap();
        toast.success("Category updated");
      } else {
        await createCat(cat).unwrap();
        toast.success("Category created");
      }
    } catch (err) {
      toast.error(err || 'Something went wrong');
    } finally {
      setShow(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="name">Category Name</label>
        <input type="text" placeholder="Category name" defaultValue={category && category.name} ref={nameInput} />
      </div>
      <div className="mb-3">
        <label htmlFor="image">Image</label>
        {uploadErr ? <div className="alert">{uploadErr.message || "Upload Failed"}</div> : preview && <div className="py-2 flex justify-center  ">
          <img className="w-24 h-24 rounded-lg " src={preview[0]} />
        </div>}
        <input type="file" onChange={(e) => uploadData(e.target.files)} />
        {(Boolean(progress) && !isUploaded) && <Progress progress={progress} />}
      </div>
      <div className="text-right">
        <button disabled={!isUploaded && !category.image} className="btn" type="submit">{category ? "Update" : "Create"}</button>
      </div>
    </form>
  );
}

export default CategoryForm;
