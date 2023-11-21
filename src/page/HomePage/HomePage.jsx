import React, { useEffect, useRef, useState } from 'react'
import TypeProduts from '../../Component/TypeProducts/TypeProduts';
import {  WrapperButtonMore, WrapperProducts, WrapperTypeProduct} from './style';
import SliderComponent from '../../Component/SliderComponent/SliderComponent';
import slide1 from '../../assets/images/slide1.webp';
import slide2 from '../../assets/images/slide2.webp';
import slide3 from '../../assets/images/slide3.webp';
import CardComponent from '../../Component/CardComponent/CardComponent';
import * as ProductService from '../../service/ProductService'
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Loading from '../../Component/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
const HomePage = () => {
    const searchProduct = useSelector((state) =>  state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    // const refSearch = useRef()
    const [loading, setLoading] = useState(false)
    const [typeProducts, setTypeProducts] = useState([])
    const [limit, setLimit] = useState(6)
    

    const fetchProductAll = async (context) =>{
      
      const limit = context?.queryKey && context?.queryKey[1]
      const search = context?.queryKey && context?.queryKey[2]

      const res = await ProductService.getAllProduct(search, limit)
        return res
      
    }
    const fetchAllTypeProduct = async () =>{
      const res = await ProductService.getAllTypeProduct()
      if(res?.status === 'OK'){
        setTypeProducts(res?.data)
      } 
    }

  const {isLoading, data: products, isPreviousData} = useQuery(['products', limit, searchDebounce], fetchProductAll, {retry: 3, retryDelay: 1000, keepPreviousData: true})
  
  useEffect(()=>{
    fetchAllTypeProduct()
  },[])
  
  return (
    <Loading isLoading={isLoading || loading}>
    <div style={{padding: '0 120px'}}>
        <WrapperTypeProduct>
        {typeProducts.map((item)=>{
            return(
                <TypeProduts name = {item} key={item} />
            )
        })}
       </WrapperTypeProduct>
       </div>
       <div className='body' style={{ backgroundColor: '#efefed'}}>
       <div id='container' style={{width: '1100px', margin: '0 auto',backgroundColor: '#efefef',  height: '1000px'}}>
            <SliderComponent arrImages={[slide1, slide2, slide3]}/>
       <WrapperProducts style={{justifyContent: 'space-between'}}>
        {products?.data?.map((product)=>{
          return(
            <CardComponent 
              key={product._id}
              countInStock={product.countInStock}
              description={product.description}
              image={product.image}
              name={product.name}
              price ={product.price}
              rating={product.rating}
              type={product.type}
              discount={product.discount}
              selled={product.selled}
              id={product._id}
            />
          )
        })}
            
            
       </WrapperProducts>
       
       <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
       <WrapperButtonMore 
        textButton={isPreviousData ? 'Load more' : 'Xem thêm'} 
        type='outline' 
        disabled={products?.total === products?.data?.length || products?.totalPage === 1}
        styleButton={{border: '1px solid rgb(11,116, 229)', color: `${products?.total === products?.data?.length ? '#blue' : 'rgb(11,116, 229)'}` , width: '240px', height:'38px', borderRadius: '4px'}}
        onClick={()=> setLimit((prev)=> prev +6)}
        ></WrapperButtonMore>
       </div>
       {/* <NavbarComponent /> */}
    </div>
    </div>
    </Loading>
    
  )
}

export default HomePage