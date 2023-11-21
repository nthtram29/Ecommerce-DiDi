import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../Component/NavbarComponent/NavbarComponent'
import CardComponent from '../../Component/CardComponent/CardComponent'
import {  Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../service/ProductService'
import Loading from '../../Component/LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const {state} = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState([])
    const [paingate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1
    })

    const fetchProductType = async (type, page, limit) =>{
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        if(res?.status == 'OK'){
            setLoading(false)
            setProducts(res?.data)
            setPanigate({...paingate, total: res?.totalPage})
        }else{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(state){
            fetchProductType(state, paingate.page, paingate.limit)
        }
    }, [state, paingate.page, paingate.limit])
    const onChange = (current,pageSize ) => {
        setPanigate({...paingate, page: current - 1, limit: pageSize})
    }
  return (
    <Loading isLoading={loading}>
    <div style={{width: '100%', background: '#efefef', height: 'calc(100vh - 60px)'}}>
    <div style={{width: '1100px',margin: '0 auto', background: '#efefef', height: '100%'}}>
        <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100vh - 70px)'}} >
            <WrapperNavbar span={4} >
                <NavbarComponent />
            </WrapperNavbar>
            <Col span={20} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <WrapperProducts >
                {products?.filter((pro)=>{
                    if(searchDebounce === ''){
                        return pro
                    }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLocaleLowerCase())){
                        return pro
                    }
                })?.map((product)=>{
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
            <Pagination defaultCurrent={paingate.page +1 } total={paingate?.total} onChange={onChange} style={{textAlign: 'center', marginTop: '10px'}} />
            </Col>
        </Row>
        </div>
        </div>
    </Loading>
  )
}

export default TypeProductPage