import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputFormComponent from '../../Component/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../Component/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import logoImage from '../../assets/images/DiDii.jpg'
import { useNavigate } from 'react-router-dom'
import {EyeFilled, EyeInvisibleFilled  } from '@ant-design/icons';
import * as UserService from '../../service/UserService'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import Loading from '../../Component/LoadingComponent/Loading'
import * as message from '../../Component/Message/Message'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isShowPassword]  = useState(false)

  const navigate = useNavigate()
  const handleOnChangeEmail =(value) =>{
    setEmail(value)
  }
  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
  )
  const {data, isLoading, isSuccess, isError} = mutation
  useEffect(()=>{
    if(isSuccess){
      message.success()
      handleNavigateSignIn()
    }else if(isError){
      message.error()
    }
  }, [isSuccess, isError]);

  const handleOnChangePassword =(value) =>{
    setPassword(value)
  }
  const handleOnChangeConfirmPassword =(value) =>{
    setConfirmPassword(value)
  }
  const handleSignUp = () =>{
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
    console.log('sign-up', email, password, confirmPassword)
  }
  const handleNavigateSignIn =() =>{
    navigate('/sign-in')
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}>
    <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
      <WrapperContainerLeft>
        <h1>Xin chào</h1>
        <p>Đăng nhập hoặc Tạo tài khoản </p>
        <InputFormComponent style={{marginBottom: '10px'}} placeholder= 'abc@gmail.com' value={email} onChange={handleOnChangeEmail}/>
       
           <div style={{position: 'relative', marginTop: '10px'}}>
            <span
              style={{
                // zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >
              {isShowPassword ? (
                <EyeFilled />
               ) : (
                <EyeInvisibleFilled />
              )}
            </span>
            <InputFormComponent placeholder="password" type ={isShowPassword ? 'text':'password'} value={password} onChange={handleOnChangePassword} />
          </div>
        {/* <InputFormComponent placeholder="password" type ={isShowPassword ? 'text':'password'} value={password} onChange={handleOnChangePassword} /> */}
        <div style={{position: 'relative', marginTop: '10px'}}>
            <span
              style={{
                // zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >
              {isShowPassword ? (
                <EyeFilled />
               ) : (
                <EyeInvisibleFilled />
              )}
            </span>
            <InputFormComponent  placeholder="confirm-password" type ={isShowPassword ? 'text':'password'} value={confirmPassword} onChange={handleOnChangeConfirmPassword}/>

          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}

          <Loading isLoading={isLoading}>
        <ButtonComponent 
          disabled = {!email.length || !password.length || !confirmPassword.length}
         onClick={handleSignUp}
          
          size={40}
          styleButton={{
             
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
          }}
          textButton={'Đăng ký'}
          styleTextButton ={{color:'#fff', fontSize:'15px', fontWeight: '700'}} 
        />

       </Loading>
        <p>Chưa đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={logoImage} preview={false} alt='image-logo' height='203px' width='203px' />
        <h4> Mua sắm tại DIDIJIN</h4>
      </WrapperContainerRight>

    </div>

  </div>
  )
}

export default SignUpPage