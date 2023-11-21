import { Row } from "antd";
import { Link } from "react-router-dom";
import styled  from "styled-components"

export const WrapperHeader = styled(Row)`
    padding: 10px 10px;
    background-color: #086c18;
   //  gap: 16px;
    flex-wrap: nowrap;
    width: 1100px;
    margin: 0 auto
  

`
export const WrapperHeaderLogo = styled(Link)`
   font-size: 25px;
   color: #fff;
   font-weight: bold;
   text-align: left;
   align-items: center

`
export const WrapperHeaderAccount = styled.div`
   display: flex;
   align-items: center;
   color: #fff;
   gap: 10px;
   font-size: 14px

`
export const WrapperHeaderCart = styled.div`
display: flex;
align-items: center;
color: #fff;
gap: 10px;
font-size: 14px

`
export const WrapperContentPopup = styled.p`
   cursor: pointer;
   &:hover{
      background: #086c18;
      color: #fff
   }

`
