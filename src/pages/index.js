import React from "react"
import Layout from "../components/layout"
import { Main } from '@styles';
import styled from "styled-components";
import {Hero} from "@components";

const IndexPage = ({location}) => {
  return (
    <Layout location={location}>
      <StyledMainContainer>
        <Hero />
      </StyledMainContainer>
    </Layout>
  )
}

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

export default IndexPage
