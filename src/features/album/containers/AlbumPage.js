import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import requiredAuth from "../../../requiredAuth/requiredAuth";
import { Container, Row, Col, Card, Image, Dropdown } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ProfileMenu from "../../../components/profile/ProfileMenu";

const AlbumPage = () => {
  let history = useHistory();
  const stateName = useSelector((state) => state.login.users[0].name);
  const userId = useSelector((state) => state.login.users[0].id);
  const [albumState, setAlbumState] = useState([]);
  const getAlbumAsync = () => {
    const endpoint =
      "https://jsonplaceholder.typicode.com/albums?userId=" + userId;
    return axios
      .get(endpoint)
      .then((res) => {
        setAlbumState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    //     return
    // });
  };
  useEffect(() => {
    getAlbumAsync();
  }, []);
  const itemAlbum = albumState ?? [];

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <h4 className="mt-5 d-inline-block">{stateName}'s Photo Album</h4>
          <ProfileMenu />
        </Col>
        <Col md={12} className="mt-5 text-center">
          {itemAlbum.map((item) => (
            <Link to={`/photo/${item.id}`} key={item.id}>
              <Card
                className="ml-2 mb-2"
                style={{ width: "14rem", display: "inline-block" }}
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
            </Link>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default requiredAuth(AlbumPage);
