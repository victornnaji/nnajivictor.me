import styled from "styled-components";
import { media } from '@styles';

const ShowOnDesktop = styled.div`
    display: block;
    ${media.thone`display: none`};
`;

export default ShowOnDesktop;