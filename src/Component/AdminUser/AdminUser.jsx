import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined  } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import Loading from '../LoadingComponent/Loading'
import InputComponent from '../InputComponent/InputComponent'
import * as message from '../../Component/Message/Message'
import * as UserService from '../../service/UserService'
import { getBase64 } from '../../utils'
import { useMutationHooks} from '../../hooks/useMutationHooks'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'



const AdminUser = () => {
    
    const [rowSelected , setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
 
    const [stateUserDetails, setStateUserDetails] = useState({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
      address: '',
      avatar: ''
    })
    const [form] = Form.useForm();
  

    const mutationUpdate = useMutationHooks(
      (data) => {
        const {
        id,
        token,
        ...rests
        } = data
        const res = UserService.updateUser(
          id,
          {...rests},
          token,
          
        )
        return res
      }
    )

    const mutationDeleted = useMutationHooks(
      (data) => {
        const {
        id,
        token
        } = data
        const res = UserService.deleteUser(
          id,
          token
        )
        return res
      }
    )
    const mutationDeletedMany = useMutationHooks(
      (data) => {
        const {
         token, ...ids
        } = data
        const res = UserService.deleteManyUser(
          ids,
          token
        )
        return res
      }
    )
    

    const getAllUsers = async () =>{
      const res = await UserService.getAllUser(user?.access_token)
      return res
    }
    const fetchGetDetailsUser = async (rowSelected) =>{
      const res = await UserService.getDetailsUser(rowSelected)
      if(res?.data){
        setStateUserDetails({
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone,
          isAdmin: res?.data?.isAdmin,
          address: res?.data?.address,
          avatar: res?.data?.avatar
        })
      }
      setIsLoadingUpdate(false)
    }

    useEffect(()=>{
      form.setFieldsValue(stateUserDetails)
    },[form, stateUserDetails])

    useEffect(()=>{
      if(rowSelected && isOpenDrawer){
        setIsLoadingUpdate(true)
        fetchGetDetailsUser(rowSelected)
      }
    },[rowSelected, isOpenDrawer])

    const handleDetailsProduct = () =>{
      setIsOpenDrawer(true)
    }

    const handleDeleteManyUsers = (ids) =>{
      mutationDeletedMany.mutate({
        ids: ids, token: user?.access_token
      },{
      onSettled: () =>{
        queryUser.refetch()
      }
    })
    }
   
    const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated}  = mutationUpdate
    const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted}  = mutationDeleted
    const {data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany}  = mutationDeletedMany



    const queryUser = useQuery({queryKey: ['products'], queryFn: getAllUsers})
    const {isLoading: isLoadingUsers, data: users} = queryUser
    const renderAction = () =>{
      return(
        <div>
          <DeleteOutlined style={{color: 'red', fontSize: '30px', cursor: 'pointer'}} onClick= { () => setIsModalOpenDelete(true)}/>
          <EditOutlined style={{color: 'orange', fontSize: '30px', cursor: 'pointer'}} onClick={handleDetailsProduct}/>
        </div>
      )
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <InputComponent
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
          
            
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      
    });

    const columns = [
      {
          title: 'Name',
          dataIndex: 'name',
          sorter: (a,b) => a.name.length - b.name.length,
          ...getColumnSearchProps('name')
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a,b) => a.email.length - b.email.length,
        ...getColumnSearchProps('email')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
    
      ...getColumnSearchProps('address')
    },
      {
          title: 'IsAdmin',
          dataIndex: 'isAdmin',
          filters: [
            {
              text: 'TRUE',
              value: true,
            },
            {
              text: 'FALSE',
              value: false,
            },
            
          ],
          // record.name.startsWith(value)
          // onFilter: (value, record) =>{
          //   if(value === true){
          //     return record.isAdmin === true
          //   }
          //   return record.isAdmin === false
          // } ,
          // width: '30%',
      },
      {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
      },
  ];
  const dataTable = users?.data?.length && users?.data?.map((user) =>{
      return {...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE'}
  })

  useEffect(() =>{
    if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK'){
      message.success()
    }else if(isErrorDeletedMany){
      message.error()
    }
  }, [isSuccessDeletedMany])

    useEffect(() =>{
      if(isSuccessDeleted && dataDeleted?.status === 'OK'){
        message.success()
        hanldeCancelDelete()
      }else if(isErrorDeleted){
        message.error()
      }
    }, [isSuccessDeleted, isErrorDeleted])

    const hanldeCloseDrawer = () =>{
      setIsOpenDrawer(false);
      setStateUserDetails({
        name: '',
        email: '',
        phone: '',
        isAdmin: false
      })
      form.resetFields()
    };

    useEffect(() =>{
      if(isSuccessUpdated && dataUpdated?.status === 'OK'){
        message.success()
        hanldeCloseDrawer()
      }else if(isErrorUpdated){
        message.error()
      }
    }, [isSuccessUpdated])

    const hanldeCancelDelete =() =>{
      setIsModalOpenDelete(false)
    }
    const handleDeleteProduct =() =>{
      mutationDeleted.mutate({id: rowSelected, token: user?.access_token},{
        onSettled: () =>{
          queryUser.refetch()
        }
      })
    }

  
   
   
    const handleOnChangeDetails = (e) =>{
      setStateUserDetails({
        ...stateUserDetails,
        [e.target.name]: e.target.value
      })
    
    }
  //   const handleOnchangeAvatar = async ({fileList}) => {
  //     const file = fileList[0]
  //     if (!file.url && !file.preview) {
  //         file.preview = await getBase64(file.originFileObj );
  //     }
  //     setStateUser({
  //       ...stateUser,
  //       image: file.preview
  //     })
    
  // }
  const handleOnchangeAvatarDetails = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview
    })

  }

  const onUpdateUser = () =>{
    mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
      onSettled: () =>{
        queryUser.refetch()
      }
    })
  }
  return (
    <div>
        <WrapperHeader>Quản lý Nguời dùng</WrapperHeader>
        
        <div style={{marginTop: '20px'}}> 
            <TableComponent handleDeleteMany={handleDeleteManyUsers} columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow ={(record, rowIndex) =>{
               return{
                onClick: event => {
                  setRowSelected(record._id)
                }

              };
            }}
             
            />
        </div>
       
        <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width ='70%'>
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onUpdateUser}
              autoComplete="on"
              form = {form} 
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateUserDetails.name} onChange={handleOnChangeDetails} name='name'/>
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email"/>
              </Form.Item>

              <Form.Item
                label="phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone"/>
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
              >
                <InputComponent style={{border: '1px solid #ccc'}} value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address"/>
              </Form.Item>

              <Form.Item
                label="Avatar"
                name="avatar"
                rules={[
                  {
                    required: true,
                    message: 'Please input your avatar!',
                  },
                ]}
              >
                 <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button style={{marginRight: '20px'}}>Select File</Button>
                        
                        {stateUserDetails?.avatar && (
                            <img src={stateUserDetails?.avatar} style={{
                                height: '60px',
                                width: '60px',
                               
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
                    </WrapperUploadFile>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 20,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
          </Form>
          </Loading>

        </DrawerComponent>

        <ModalComponent title='Xóa người dùng' open={isModalOpenDelete} onCancel={hanldeCancelDelete} onOk = {handleDeleteProduct}>
                <Loading isLoading={isLoadingDeleted}>
                  <div>Bạn có chắc muốn xóa người dùng này không?</div>
                </Loading>
        </ModalComponent>
    </div>
  )
}

export default AdminUser