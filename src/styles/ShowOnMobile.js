import styled from "styled-components";
import { media } from '@styles';

const ShowOnMobile = styled.div`
    display: none;
    ${media.thone`display: block`};
`;

export default ShowOnMobile;