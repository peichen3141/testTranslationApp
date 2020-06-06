import React from 'react';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Jumbotron from 'react-bootstrap/Jumbotron';

const url = 'https://fierce-beyond-09623.herokuapp.com';

function App() {
  const [panel, setPanel] = useState('Welcome');
  const [translation, setTranslation] = useState('');
  // const [characters, setCharacters] = useState('');
  const inputRefSim2Tra = useRef<HTMLTextAreaElement>(null);
  const inputRefTra2Sim = useRef<HTMLTextAreaElement>(null);

  const content = getContent(panel);

  function getContent(panel: string) {
    switch (panel) {
      case 'Sim2Tra':
        return getSim2TraContent();
      case 'Tra2Sim':
        return getTra2SimContent();
      case 'Welcome':
      default:
        return 'Welcome';
    }
  }

  function getSim2TraContent() {
    return (
      <div>
        <InputGroup key="sim2tra">
          <InputGroup.Prepend>
            <InputGroup.Text>Please type in simplified characters</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="Sim2Tra" as="textarea" aria-label="Sim2Tra" ref={inputRefSim2Tra} />
        </InputGroup>
        <Button
          variant="primary"
          onClick={() => {
            const current = inputRefSim2Tra.current;
            if (current == null) return;
            const value = current.value;
            fetch(`${url}/api/conversion/sim2tra`, {
              method: 'post',
              body: JSON.stringify({
                text: value,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                const res = response;
                if (res.status === 200) {
                  return res.text().then((data: string) => {
                    setTranslation(data);
                  });
                } else {
                  setTranslation('Error!!!');
                }
              })
              .catch((err) => {
                setTranslation(`Error: ${err}`);
              });
          }}
        >
          Convert
        </Button>
        {translation !== '' ? (
          <Jumbotron fluid>
            <Container>
              <p>{translation}</p>
            </Container>
          </Jumbotron>
        ) : null}
      </div>
    );
  }

  function getTra2SimContent() {
    return (
      <div>
        <InputGroup key="tra2sim">
          <InputGroup.Prepend>
            <InputGroup.Text>Please type in traditional characters</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl as="textarea" aria-label="Tra2Sim" ref={inputRefTra2Sim} />
        </InputGroup>
        <Button
          variant="primary"
          onClick={() => {
            const current = inputRefTra2Sim.current;
            if (current == null) return;
            const value = current.value;
            fetch(`${url}/api/conversion/tra2sim`, {
              method: 'post',
              body: JSON.stringify({
                text: value,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                const res = response;
                if (res.status === 200) {
                  return res.text().then((data: string) => {
                    setTranslation(data);
                  });
                } else {
                  setTranslation('Error!!!');
                }
              })
              .catch((err) => {
                setTranslation(`Error: ${err}`);
              });
          }}
        >
          Convert
        </Button>
        {translation !== '' ? (
          <Jumbotron fluid>
            <Container>
              <p>{translation}</p>
            </Container>
          </Jumbotron>
        ) : null}
      </div>
    );
  }

  return (
    <Container fluid="lg">
      <Card body>
        <Row>
          <Col>
            <Card
              body
              onClick={() => {
                setPanel('Welcome');
              }}
            >
              Welcome
            </Card>
          </Col>
          <Col>
            <Card
              body
              onClick={() => {
                setPanel('Sim2Tra');
              }}
            >
              Simplified to Traditional
            </Card>
          </Col>
          <Col>
            <Card
              body
              onClick={() => {
                setPanel('Tra2Sim');
              }}
            >
              Traditional to Simplified
            </Card>
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col>{content}</Col>
        </Row>
      </Card>
    </Container>
  );
}

export default App;
