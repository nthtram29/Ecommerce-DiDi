import React, { Fragment, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {routes}  from './routes'
import DefautComponent from './Component/DefautComponent/DefautComponent';
import { isJsonString } from './utils';
import jwt_decode from 'jwt-decode';
import * as UserService from './service/UserService'
import { resetUser, updateUser } from './app/slide/userSlide';
// import { updateUser } from './features/UserSlice.spec';
import {useDispatch, useSelector} from 'react-redux'
import Loading from './Component/LoadingComponent/Loading';


function App() {
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)
  useEffect(()=>{
    setIsLoading(true)
    const {storageData, decoded} = handleDecoded()
    // console.log('decoded', decoded?.id)
      if(decoded?.id){
        handleGetDetailUser(decoded?.id, storageData)
      }
      setIsLoading(false)
    
  }, [])
  const handleDecoded = () =>{
    // let storageData = localStorage.getItem('access_token')
    let storageData = user?.access_token || localStorage.getItem('access_token')
  
    let decoded = {}
    if(storageData && isJsonString(storageData) && !user?.access_token){
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
     
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const {decoded}  = handleDecoded()
    const storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken = jwt_decode(refreshToken)
    if(decoded?.exp < currentTime.getTime() / 1000){
      if(decodedRefreshToken?.exp > currentTime.getTime()/1000){
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      }else{
        dispatch(resetUser())
      }
    }
    return config;
  },  (err) => {
    return Promise.reject(err);
  });
  // }, function (error) {
  //   return Promise.reject(error);
  // });

  const handleGetDetailUser = async (id, token) =>{
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token, refreshToken: refreshToken}))
  }
  
  return (
 
    <>
    <Loading isLoading={isLoading}>
   <Router>
    <Routes>
      {routes.map((route)=>{
        const Page = route.page;
        // const ischeckAuth = !route.isPrivate || user.isAdmin
       
        const Layout = route.isShowHeader ? DefautComponent : Fragment
        return(
          <Route key={route.path} path={route.path} element={
            
            <Layout>
              <Page />
            </Layout>
          } />
        )
      })}
    </Routes>
   </Router>
   </Loading>
    </>
  );
}

export default App;
