import { Steps } from "antd";
import styled from "styled-components";
const { Step } = Steps;


export const CustomStep = styled(Step)`
  .ant-steps-item-process .ant-steps-item-container .ant-steps-item-icon {
    background: powderblue
  }
  .ant-steps .ant-steps-item-finish .ant-steps-item-icon{
    background: powderblue
  }
`