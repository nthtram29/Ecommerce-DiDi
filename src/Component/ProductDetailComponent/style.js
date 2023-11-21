import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex
`
export const WrapperStyleNameProduct = styled.h1`
    font-size: 25px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 10px;
`
export const WrapperStyleDescriptionProduct = styled.h1`
    color: #7a7a7a;
     font-size: 14px;
     font-weight: 300;
     line-height:24px;
     word-break: break-word
`

export const WrapperStyleTextSell = styled.span`
    font-size: 13px;
    line-heiht: 24px;
    color: rgb(120, 120, 120)
`
export const WrapperPriceProduct = styled.div`
    background:#fff;
    font-size: 22px;
    font-weight: 400;
`

export const WrapperPriceTextProduct = styled.h1`
font-size: 22px;
font-weight: 400;
`
export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl
    };
    span.change-address{
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500
    }
`
export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border: 1px solid #ccc;
    border-radius: 4px
`
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm{
        width: 60px;
        border-top: none;
        border-bottom: none;
        &.ant-input-number-handler-wrap{
            display: none
        }
    };
`