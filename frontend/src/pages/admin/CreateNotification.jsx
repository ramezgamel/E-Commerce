import { useState } from "react";
import {useGetUsersQuery} from "../../store/userApiSlice";
import Loader from "../../components/Loader";
import { publishNotification } from "../../socket";
import { Selector } from "../../components/Selector";

function CreateNotification() {
  const [content, setContent] = useState('');
  const [to, setTo] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {data:users, isLoading} = useGetUsersQuery({});

  const createNotification = (e) => {
    e.preventDefault();
    const notification = {
      to, selectedUsers, content
    }
    publishNotification(notification)
  };
  
  const values = users?.data.map(user => {return {label:user.email, value:user._id}});
  return (
    <div className="p-4 items-center flex flex-col">
      <h1 className="text-main text-2xl font-bold mb-6 text-center">Notifications</h1>
      <form className="text-main border p-4 w-11/12 max-w-lg rounded-md bd shadow-md" onSubmit={createNotification}>
        <label htmlFor="to">To</label>
        <select name="to" id="to" value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="all">All</option>
          <option value="specific">Send by email</option>
        </select>
        {to === 'specific' && (<>
          <label htmlFor="user">User Email</label>
          {isLoading && <Loader/>}
          <Selector options={values} onChange={setSelectedUsers}/>
        </>)}
        <label htmlFor="content">Content</label>
        <textarea onChange={(e)=>setContent(e.target.value)} value={content} id='content' required></textarea>
        <button type="submit" className="btn mt-3">Send</button>
      </form>
    </div>
  )
}

export default CreateNotification
