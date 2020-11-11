import React, { useEffect, useState } from "react";
import requiredAuth from "../../../requiredAuth/requiredAuth";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfileMenu from "../../../components/profile/ProfileMenu";

const PhotoPage = () => {
  const [photoState, setPhotoState] = useState([]);

  // add new photo form state
  const [albumId, setAlbumId] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [title, setTitle] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoThumbnailUrl, setPhotoThumbnailUrl] = useState("");

  // modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // api get photo function
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
  };

  // add new photo module object
  let photoModule = {
    id: photoId,
    albumId: albumId,
    title: title,
    url: photoUrl,
    thumbnailUrl: photoThumbnailUrl,
  };

  // api add photo function
  const addPhotoAsync = () => {
    const endpoint = "https://jsonplaceholder.typicode.com/photos";
    return axios.post(endpoint, photoModule).then((res) => {
      setPhotoState([...photoState, res.data]);
    });
  };

  // handle a submit action when add new photo
  const handleSubmit = (event) => {
    addPhotoAsync();
    handleClose();
    event.preventDefault();
  };

  // add photo modal component
  const AddPhotoModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicAlbum">
              <Form.Label>Album Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Album Id"
                value={albumId}
                onChange={(event) => {
                  setAlbumId(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhotoId">
              <Form.Label>Photo Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Photo Id"
                value={photoId}
                onChange={(event) => {
                  setPhotoId(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicUrl">
              <Form.Label>Photo Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Photo Url"
                value={photoUrl}
                onChange={(event) => {
                  setPhotoUrl(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicThumbnailUrl">
              <Form.Label>Photo Thumbnail Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Photo Thumbnail Url"
                value={photoThumbnailUrl}
                onChange={(event) => {
                  setPhotoThumbnailUrl(event.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="float-right">
              Post New Photo
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  useEffect(() => {
    getPhotoAsync();
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <h4 className="mt-5 d-inline-block mr-3">Photo's</h4>
          <Button variant="outline-dark" onClick={handleShow}>
            + New Photo
          </Button>
          {AddPhotoModal()}
          <ProfileMenu />
        </Col>
        <Col md={12} className="mt-5 text-center">
          {photoState.map((item) => (
            <Card
              className="ml-2 mb-2"
              style={{ width: "14rem", display: "inline-block" }}
              key={item.id}
              onClick={() => {
                console.log("clicked");
              }}
            >
              <Card.Img variant="top" src={item.thumbnailUrl} />
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
