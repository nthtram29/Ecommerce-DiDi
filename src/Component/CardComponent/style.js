import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img{
        height: 200px;
        width: 200px;
    }
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`
export const StyleNameProduct = styled.div`
    font-weight: 500;
    margin-bottom:4px;
    font-size: 12px;
    line-height:16px;
    color: rgb(56, 56, 61);
`

export const WrapperReporText = styled.div`
    font-size:11px;
    color: rgb(128, 128, 137);
    display:flex;
    align-items: center;
`
export const WrapperPriceText = styled.div`
    font-weight: 500;
    color: rgb(255, 66, 78);
    font-size: 16px;
    margin: 6px 0 10px
`
export const WrapperDiscountText = styled.span`
    font-weight: 500;
    color: rgb(255, 66, 78);
    font-size: 12px
`
