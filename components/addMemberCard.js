"use client"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Avatar, { genConfig } from 'react-nice-avatar'
function AddMemberCard({user,session,eventName}) {
    // const config = genConfig(AvatarConfig)

    function handleInvite(userId) {
      console.log("userid",userId);
      console.log("gg",user._id)
      eventName=eventName.toLowerCase();
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/addMember/${userId}`, {
        method: 'POST',
  
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data.error?.errorCode) {
            toast.error(`${data.message}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
          toast('Invite Sent Successfully')
          console.log("invite sent")
        })
    }
  return (
    
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
    <div class="flex flex-col items-center pb-10">
        <div class="w-24 h-24 mb-3 rounded-full shadow-lg">
        {/* <Avatar className="w-32 h-32" {...config} /> */}
        </div>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
            <button  onClick={(e) => handleInvite(user?._id)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send invite</button>
        </div>
    </div>
</div>

  )
}

export default AddMemberCard