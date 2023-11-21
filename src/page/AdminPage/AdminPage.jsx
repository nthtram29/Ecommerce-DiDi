import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined ,AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import HeaderComponent from '../../Component/HeaderComponent/HeaderComponent';
import AdminUser from '../../Component/AdminUser/AdminUser';
import AdminProduct from '../../Component/AdminProduct/AdminProduct';
import * as OrderService from '../../service/OrderService'
import OrderAdmin from '../../Component/OrderAdmin/OrderAdmin';
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const user = useSelector((state) => state?.user)
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
  ];
  
  
  const [keySelected, setKeySelected] = useState('')
  // const [keySelected, setKeySelected] = useState('');
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return {data: res?.data, key: 'orders'}
  }

  
  const renderPage = (key) => {
    switch(key){
      case 'user':
        return(
          <AdminUser />
        )
        case 'product':
          return(
            <AdminProduct />
          )
          case 'orders':
            return (
              <OrderAdmin />
            )
          default:
            return <></>
    }
  }
  
  const handleOnClick = ({key}) =>{
    setKeySelected(key)
  }
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart></HeaderComponent>
      <div style={{display: 'flex'}}>
      <Menu
        mode="inline"
        style={{
          width: 256,
          boxShadow: '1px 1px 2px #ccc',
          // height: '100vh'
        }}
        items={items}
        onClick={handleOnClick}
      />  
      <div style={{flex: 1, padding: '15px'}}>
        {renderPage(keySelected)}

      </div>
      </div>
    </>
  )
}

export default AdminPage