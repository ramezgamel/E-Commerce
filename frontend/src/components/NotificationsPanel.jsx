/* eslint-disable no-extra-boolean-cast */
import { useEffect, useMemo, useState } from "react";
import { useGetNotificationQuery, useMarkAsReadMutation } from "../store/userApiSlice";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { AiOutlineBell } from "react-icons/ai";
import { toast } from "react-toastify";
import { getNotification } from "../socket";

function NotificationsPanel() {
  const [markAsRead] = useMarkAsReadMutation();
  // const [notifications, setNotifications] = useState([]);
  const [unreadNotification, setUnreadNotification] = useState([]);
  const {data, isLoading, refetch} = useGetNotificationQuery();
  const notificationsMemo = useMemo(()=> data?.notifications, [data?.notifications]);
  const dataMemo = useMemo(()=> data, [data]);
useEffect(()=>{
    if(!isLoading && dataMemo?.notifications){
      // setNotifications([...dataMemo.notifications].reverse());
    const unRead = dataMemo.notifications.filter(n => n.isRead == false);
    setUnreadNotification([...unRead]);
  }
  },[dataMemo,isLoading]);  
  useEffect(()=>{
    if(!isLoading){
      getNotification((res)=> {
        // setNotifications([res,...data.notifications])
        setUnreadNotification([...unreadNotification, res]);
        toast.success(res.content);
      }); 
  }
  },[notificationsMemo]);
  
  const markRead = async (id) => {
    try{
      await markAsRead(id).unwrap();
      refetch()
    }catch(err){
      toast.error(err.message| "Something went wrong")
    }
  };
  
  return (
    <Menu as="div" className="relative">
                <Menu.Button className="relative flex rounded-full bg-back text-main focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <AiOutlineBell 
                  onClick={()=>setUnreadNotification([])}
                  className="h-7 w-7 cursor-pointer hover:text-violet-600" aria-hidden="true" />
                  {unreadNotification?.length > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-slate-50 rounded-full -top-2 -right-1 dark:border-gray-800">{unreadNotification?.length}</div>
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
                  <Menu.Items as="ul" className="absolute right-0 top-3 z-10 mt-2 w-60 origin-top-right rounded-md p-1 bg-slate-50 dark:bg-gray-700 max-h-48 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto">
                    {isLoading && <Loader/>}
                    {!Boolean(data?.notifications?.length)&& <div className="alert m-2 p-2">No Notifications</div> }
                    {data?.notifications?.length > 0 && data?.notifications?.map((notification, index) => 
                      <Link key={index} to={`${notification?.refId != undefined ? `order/${notification?.refId}`:"" }`}>
                      <Menu.Item as="li"
                        onClick={()=>markRead(notification?._id)}
                        className={`${notification?.isRead ? "":"bg-blue-500"} cursor-pointer text-main hover:bg-clicked px-2 py-1 rounded-md grid grid-cols-8 items-center gap-1 mb-1`}>
                          {data?.sender && ( 
                            <div className="col-span-2">
                              <img 
                              className='rounded-full w-10 h-10'
                              src={data?.sender?.image} alt={data.sender?.name}
                            />
                            </div>
                          )}
                        <div className={data?.sender?"col-span-6": "col-span-8"}>
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
  )
}

export default NotificationsPanel
