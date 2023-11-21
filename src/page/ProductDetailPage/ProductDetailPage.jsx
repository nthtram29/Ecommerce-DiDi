import React from 'react'
import ProductDetailComponent from '../../Component/ProductDetailComponent/ProductDetailComponent'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{ height: '100%', background: '#efefef', width:'100%'}}>
       {/* padding: '0 120px', background: '#efefef', height:'1000px' */}
    <div style={{ width: '1100px', margin: '0 auto', height:'100%'}}>
      <h5 style={{margin: '0', padding: '20px 0'}}><span style={{cursor: 'pointer', fontWeight:'bold'}} onClick={()=> {navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</h5>
      
        <ProductDetailComponent idProduct={id}/>
     
    </div>
    </div>
  )
}

export default ProductDetailPage