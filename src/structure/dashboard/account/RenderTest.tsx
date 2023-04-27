import React, { useEffect } from 'react'
import { userState } from '../../../store/userState';

export default function RenderTest() {
  const [userData, setUserData] = userState((state) => [state.userData, state.setUserData]);

useEffect(() => {
  console.log(userData)


}, [userData])


  console.log("Render test rendered")
  return (
    <div>n</div>
  )
}
