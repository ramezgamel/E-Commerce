/* eslint-disable no-extra-boolean-cast */
import { useGetNotificationQuery, useMarkAsReadMutation } from "../store/userApiSlice";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { AiOutlineBell } from "react-icons/ai";
import { toast } from "react-toastify";
import { getNotification, setUser, socket } from "../socket";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function NotificationsPanel() {
  const [markAsRead] = useMarkAsReadMutation();
  const { data, isLoading, refetch } = useGetNotificationQuery();
  const {userInfo} =  useSelector(state=>state.auth);
  useEffect(()=>{
    if(userInfo){
      socket.connect();
      setUser(userInfo)
    }
    return ()=> {
      socket.disconnect();
    }
  }, [ userInfo]);

  getNotification(async ()=> await refetch());
  
  const markRead = async (id) => {
    try {
      await markAsRead(id).unwrap();
      refetch();
    } catch (err) {
      toast.error(err.message | "Something went wrong");
    }
  };
  return (
    userInfo &&
    <Menu as="div" className="relative z-10">
      <Menu.Button className="relative flex rounded-full text-main focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <AiOutlineBell
          className="h-7 w-7 cursor-pointer hover:text-violet-600" aria-hidden="true" />
        {!isLoading && data?.notifications.filter(n => n.isRead == false)?.length > 0 && (
          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800">{data?.notifications.filter(n => n.isRead == false)?.length}</div>
        )}
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items as="ul" className="absolute no-scrollbar right-0 top-3 mt-2 w-60 origin-top-right rounded-md p-2 bg-slate-50 dark:bg-gray-700 max-h-48 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto">
          {isLoading && <Loader />}
          {!Boolean(data?.notifications?.length) && <div className="alert m-2 p-2">No Notifications</div>}
          {data?.notifications?.length > 0 && data?.notifications?.map((notification, index) =>
            <Link key={index} to={`${notification?.refId != undefined ? `order/${notification?.refId}` : ""}`}>
              <Menu.Item as="li"
                onClick={() => markRead(notification?._id)}
                className={`${notification?.isRead ? "bg-back" : "bg-blue-500"} cursor-pointer text-main hover:bg-clicked px-2 py-1 rounded-md grid grid-cols-8 items-center gap-1 mb-1`}>
                {data?.sender && (
                  <div className="col-span-2">
                    <img
                      className='rounded-full w-10 h-10'
                      src={data?.sender?.image} alt={data?.sender?.name}
                    />
                  </div>
                )}
                <div className={data?.notifications.senderId ? "col-span-6" : "col-span-8"}>
                  <p className="m-0 text-sm">{notification?.content}</p>
                  <p className="text-gray-400 m-0 text-xs text-right">
                    {new Date(notification?.date).toLocaleTimeString("en-EG")}
                  </p>
                </div>
              </Menu.Item>
            </Link>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default NotificationsPanel;
