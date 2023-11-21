import React from 'react';

import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText } from './style';
import {StarFilled  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';


const CardComponent = (props) => {
  const {countInStock,description, image, name, price, rating, type, discount, selled, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct =(id) =>{
    navigate(`/product-detail/${id}`)
  }
  return (
    <>
        <WrapperCardStyle
        hoverable
        headStyle={{width: '200px', height: '200px'}}
        style={{ width: 200 }}
        bodyStyle={{padding: '10px'}}
        cover={<img alt="example" src={image} />}
        onClick={()=>  handleDetailsProduct(id)}
    >
       <StyleNameProduct>{name}</StyleNameProduct>
       <WrapperReporText>
        <span style={{marginRight: '4px'}}>
           <span>{rating}</span>
            <StarFilled  style={{fontSize: '12px', color: 'lightsalmon'}}/>
            </span>
        <span>| Đã bán {selled || 1000} + </span>
        </WrapperReporText>
        <WrapperPriceText> 
           {convertPrice(price)} 
           <WrapperDiscountText> - {discount || 0}%</WrapperDiscountText>
        </WrapperPriceText>

       
       
    </WrapperCardStyle>
    </>
  )
}

export default CardComponent
