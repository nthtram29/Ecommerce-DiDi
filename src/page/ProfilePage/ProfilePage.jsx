import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputFormComponent from '../../Component/InputFormComponent/InputFormComponent'
import ButtonComponent from '../../Component/ButtonComponent/ButtonComponent'
import Loading from '../../Component/LoadingComponent/Loading'
import * as UserService from '../../service/UserService'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import * as message from '../../Component/Message/Message'
import { updateUser } from '../../app/slide/userSlide'
// import { updateUser } from '../../features/UserSlice.spec'
import { UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../utils'
import { Button } from 'antd'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const {id, access_token, ...rests} = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const dispatch = useDispatch()
    const {data, isLoading, isSuccess, isError} = mutation
    useEffect(()=>{
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])
    useEffect(()=>{
        if(isSuccess){
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        }else if(isError){
            message.error()
        }
    },[isSuccess, isError])
    // const getDetailsUser = async (id, token) =>{
    //     await UserService.getDetailsUser(id, token)
    // }
    const handleGetDetailsUser = async (id, token) =>{
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
        // getDetailsUser(id, token)
      }
      

    
    const handleOnchangeEmail = (value) =>{
        setEmail(value)
    }
    const handleOnchangeName = (value) =>{
        setName(value)
    }
    const handleOnchangePhone = (value) =>{
        setPhone(value)
    }
    const handleOnchangeAddress = (value) =>{
        setAddress(value)
    }
    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setAvatar(file.preview)
    }
    const handleUpdate = () =>{
        mutation.mutate({id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token})
    }
  return (
    <div style={{width: '1270px', margin: '0 auto', height: '500px'}}>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <Loading isLoading={isLoading}>
        <WrapperContentProfile>
            <WrapperInput>
                <WrapperLabel htmlFor='name'> Name </WrapperLabel>
                <InputFormComponent style={{width: '300px'}} id="name"  value={name} onChange={handleOnchangeName}/>
                <ButtonComponent 
                   
                    onClick={handleUpdate}
                        
                        size={40}
                        styleButton={{
                            // background: 'rgb(255, 57, 69)',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            margin: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton ={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight: '700'}} 
                />
                
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='email'> Email</WrapperLabel>
                <InputFormComponent style={{width: '300px'}} id="email"  value={email} onChange={handleOnchangeEmail}/>
                <ButtonComponent 
                   
                    onClick={handleUpdate}
                        
                        size={40}
                        styleButton={{
                            // background: 'rgb(255, 57, 69)',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            margin: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton ={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight: '700'}} 
                />
                
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='phone'> Phone </WrapperLabel>
                <InputFormComponent style={{width: '300px'}} id="phone"  value={phone} onChange={handleOnchangePhone}/>
                <ButtonComponent 
                   
                    onClick={handleUpdate}
                        
                        size={40}
                        styleButton={{
                            // background: 'rgb(255, 57, 69)',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            margin: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton ={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight: '700'}} 
                />
                
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='address'> Address </WrapperLabel>
                <InputFormComponent style={{width: '300px'}} id="address"  value={address} onChange={handleOnchangeAddress}/>
                <ButtonComponent 
                   
                    onClick={handleUpdate}
                        
                        size={40}
                        styleButton={{
                            // background: 'rgb(255, 57, 69)',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            margin: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton ={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight: '700'}} 
                />
                
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='avatar'> Avatar </WrapperLabel>
                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
                {/* <InputFormComponent style={{width: '300px'}} id="avatar"  value={avatar} onChange={handleOnchangeAvatar}/> */}
                <ButtonComponent 
                   
                    onClick={handleUpdate}
                        
                        size={40}
                        styleButton={{
                            // background: 'rgb(255, 57, 69)',
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            margin: '2px 6px 6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton ={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight: '700'}} 
                />
                
            </WrapperInput>

            
        </WrapperContentProfile>
        </Loading>
    </div>
  )
}

export default ProfilePage