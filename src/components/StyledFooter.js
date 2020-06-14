import styled from 'styled-components'
import defaultImg from '../images/bg.jpg'

const StyledFooter = styled.header`
min-height: calc(100vh - 66px);
background: url(${props => props.img ? props.img : defaultImg }) center/cover no-repeat;
background-attachment: fixed;
display: flex;
align-items: center;
justify-content: center;
min-height: 60vh;


`;

export default StyledFooter