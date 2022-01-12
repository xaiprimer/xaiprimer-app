import * as React from "react";
import PrimerNavbar from "../components/primer-navbar/PrimerNavbar";
import PrimerFooter from "../components/primer-footer/PrimerFooter";

import { Row, Col } from "react-bootstrap";

import components from "../images/components.svg";
import meth from "../images/meth.svg";
import letterA from "../images/letters/letterA.svg";
import letterB from "../images/letters/letterB.svg";
import letterC from "../images/letters/letterC.svg";
import letterD from "../images/letters/letterD.svg";

// markup
const IndexPage = () => {
  return (
    <>
      <PrimerNavbar />
      <title>The XAI Primer</title>
      <body>
        <main>
          <section className="about">
            {/* intro */}
            <Row>
              <Col></Col>
              <Col xs={6}>
                <div className="floatingSquare"></div>
                <h1 className="foreText" style={{textShadow : '0 0 4px var(--cognac-primer)', color:'white'}}>
                  We propose an exploratory interface depicting both XAI
                  strategies and applications to support designers
                  conceptualizing and developing new projects.
                </h1>
                <br></br>
                <Row></Row>
                <div>
                  <h2 className="intro" >
                    Explainable Artificial Intelligence (XAI) processes
                    typically combine various explanation and verification
                    strategies to support the analysis in different domains. Due
                    to the increasing number of techniques and the variety of
                    XAI methods deployed, deriving a comprehensive overview
                    framework of different strategy combinations remains
                    challenging.
                    <br></br>
                    The paper presents a proposal for a digital ideation space
                    in which designers of XAI processes can derive inspiration
                    and investigate existing works. The XAI Primer is designed
                    based on the metaphor of a museum. Users can explore the
                    presented ideation space as if they were artists visiting an
                    art gallery. We enable serendipitous and guided
                    explorations, allowing them to investigate and probe the
                    state-of-the-art as a source of inspiration.{" "}
                  </h2>
                </div>
              </Col>
              <Col></Col>
            </Row>
            
            {/* components */}
            <Row>
            <Col></Col>
            <Col xs={6}>
            <br></br>
              <h2 className="intro">
              The <strong>exploration modes panel <span className="move"><img src={letterA}></img></span></strong> allows for jumping across layers and guided tours; the <strong>collection panel <span><img src={letterB}></img></span></strong> enables visitors collecting items during the navigation; the <strong>minimap<span><img src={letterC}></img></span></strong>  helps in orienting users in digitalspace; the <strong>search bar<span><img src={letterD}></img></span></strong>, accessible by typing ctrl+c enables experts users to look for specific items or authors.
              </h2>
              </Col>
            <Col></Col>
          </Row>

            <Row>
              <Col xs={12}>
                <img
                  className="d-block w-100"
                  src={components}
                  alt="components"
                />
              </Col>
            </Row>
            <Row>
            <Col></Col>
            <Col xs={6}>
            <h4 style={{color:'var(--cognac-primer)'}}>Figure 1: the figure depicts a diagrammatic representation of the components of the interface. 
            Exploration modes allow visitors to dig into thhe space and reveal new layers of information.</h4>
            </Col>
            <Col></Col>
            </Row>
            
            <br></br>

            {/* methodology */}
            <Row>
              <Col></Col>
              <Col xs={6}>
                <h2 className="intro">
                  The XAI Primer currently includes a collection of 71
                  Explainable Artificial Intelligence projects gathered from
                  theVISxAI Workshop, Distill, Google Arts Experiments, IEEVIS
                  Art Program, as well as independent artworks from the fields of
                  art, media studies, communication design and data activism. We
                  deliberately decided to focus on aselection of XAI projects
                  from various research fields to open up a discussion of
                  different approaches to XAI, including communication and
                  explanation strategies across different disciplines.
                </h2>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col xs={12}>
                <img className="d-block w-100" src={meth} alt="methodology" />
              </Col>
            </Row>
            <Row>
            <Col></Col>
            <Col xs={6}>
            <h4 style={{color:'var(--cognac-primer)'}}>Figure 2: the design process we followed from the data collection to the implementation and study.</h4>
            </Col>
            <Col></Col>
            </Row>

            <br></br>
            <Row>
            <Col xs={3}></Col>
              <Col xs={6}>
                <h2 className="intro">
                  Projects have been classified according to the Building Blocks
                  Framework, previously defined by El-Assady et al. <span style={{color:'var(--cognac-primer)'}}>[1]</span> in
                  2019 and tailored to the XAI Primer by
                 Gobbo et El-Assady al. <span style={{color:'var(--cognac-primer)'}}>[2]</span> in 2021. Items have been
                  positioned in the layered space, then encoded as gliphs and
                  enriched with additional materials. Guided tours have been
                  defined by critically reading items' positioning and
                  relationship. Before conducting the final qualitative study
                  the system has been implementd as an interactive application
                  built on top of React.js and D3.js.
                </h2>
              </Col>
              <Col xs={2}>
              <ol className="foreText" style={{color:'var(--cognac-primer)'}}>
                    <li>
                      <p>
                        Mennatallah El-Assady, Wolfgang Jentner,
                        Rebecca Kehlbeck, Udo Schlegel, Rita Sevastjanova,
                        Fabian Sperrle, Thilo Spinner, and Daniel Keim. 2019.
                        <em><u><a target='_blank' href={'https://www.researchgate.net/publication/332802468_Towards_XAI_Structuring_the_Processes_of_Explanations'}> Towards XAI : Structuring the Processes of
                          Explanations.</a>
                        </u></em>
                        In Proceedings of ACM CHI Workshop on Human-Centered Machine
                        Learning
                      </p>
                    </li>
                    <br></br>
                    <li>
                      <p>
                      Beatrice Gobbo, Mennatallah El-Assady. 2021.
                        <em><u>
                        <a target='_blank' href={'https://re.public.polimi.it/handle/11311/1193817#.Yd80LVjMLzc'}>
                          The XAI Primer : A Digital Ideation Space for Explainable Artificial Intelligence Strategies
                        </a></u></em> In Proceedings of ACM CHI Workshop on Human-Centered Explainable Artificial Intelligence.
                      </p>
                    </li>
                  </ol>
                  </Col>
                  <Col></Col>
            </Row>
          </section>
        </main>
        <PrimerFooter />
      </body>
    </>
  );
};

export default IndexPage;
