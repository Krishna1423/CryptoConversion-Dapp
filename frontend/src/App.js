import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import {
  Form,
  Button,
  Card,
  Image,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function App() {
  const [storedPrice, setStoredPrice] = useState("");
  const [item, setItem] = useState({ pairs: "" });

  const { pairs } = item;

  const contractAddress = "0xD914830e17d213e6De5E67Eb2fD86E0ADD39306a";
  const ABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "feedId",
          type: "uint256",
        },
      ],
      name: "getChainLinkDataFeedLatestAnswer",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  const getPair = async () => {
    const feedIdMap = {
      "BTC/USD": 1,
      "ETH/USD": 2,
      "LINK/USD": 3,
      "BTC/ETH": 4,
    };
    const feedId = feedIdMap[pairs];
    console.log(pairs);
    const contractPrice = await contract.getChainLinkDataFeedLatestAnswer(
      feedId
    );
    if (feedId === 4)
      setStoredPrice(parseInt(contractPrice) / 1000000000000000000 + "  ETH");
    else setStoredPrice("$" + parseInt(contractPrice) / 100000000);
  };

  const handleChange = (e) => {
    setStoredPrice("");
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="mt-5">
      {/* Centered Image */}
      <Row className="justify-content-center">
        <Col xs="auto">
          <Image
            src="https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png"
            width={150}
            height={150}
            fluid
            className="d-block mx-auto"
          />
        </Col>
      </Row>

      {/* Conversion Pair Card */}
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow">
            <Card.Header as="h5" className="text-center">
              Conversion Pair
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="pairs">
                  <Form.Check
                    value="BTC/USD"
                    type="radio"
                    label="BTC/USD"
                    onChange={handleChange}
                    checked={pairs === "BTC/USD"}
                  />
                  <Form.Check
                    value="ETH/USD"
                    type="radio"
                    label="ETH/USD"
                    onChange={handleChange}
                    checked={pairs === "ETH/USD"}
                  />
                  <Form.Check
                    value="LINK/USD"
                    type="radio"
                    label="LINK/USD"
                    onChange={handleChange}
                    checked={pairs === "LINK/USD"}
                  />
                  <Form.Check
                    value="BTC/ETH"
                    type="radio"
                    label="BTC/ETH"
                    onChange={handleChange}
                    checked={pairs === "BTC/ETH"}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={getPair}
                  >
                    Get Conversion From Price Oracle
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Result Card */}
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow">
            <Card.Header as="h5" className="text-center">
              Result
            </Card.Header>
            <Card.Body className="text-center">
              <h5>
                {pairs} ➡ {storedPrice}
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
