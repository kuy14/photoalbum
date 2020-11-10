import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import requiredAuth from "../../../requiredAuth/requiredAuth";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const PhotoPage = () => {
  const stateName = useSelector((state) => state.login.users[0].name);
  const userId = useSelector((state) => state.login.users[0].id);
  const [photoState, setPhotoState] = useState([]);
  let { id } = useParams();
  const getPhotoAsync = () => {
    const endpoint =
      "https://jsonplaceholder.typicode.com/photos?albumId=" + id;
    return axios
      .get(endpoint)
      .then((res) => {
        setPhotoState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    //     return
    // });
  };
  useEffect(() => {
    getPhotoAsync();
  }, []);
  const itemPhoto = photoState ?? [];

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <h4 className="text-center mt-5">Photo's</h4>
        </Col>
        <Col md={12} className="mt-5 text-center">
          {itemPhoto.map((item) => (
            <Card
              className="ml-2 mb-2"
              style={{ width: "14rem", display: "inline-block" }}
              key={item.id}
              onClick={() => {
                console.log("clicked");
              }}
            >
              <Card.Img
                variant="top"
                src="https://dummyimage.com/600x400/000/fff"
              />
              <Card.Title
                className="text-truncate p-3"
                style={{ fontSize: "14px" }}
              >
                {item.title}
              </Card.Title>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default requiredAuth(PhotoPage);
