import { useState, Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Button,
  Media,
  Box,
  Content,
  Image,
  Message,
} from "react-bulma-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function UpdatePost() {
  const userConnected = JSON.parse(localStorage.getItem("userConnected"));
  const token = `Bearer ${userConnected.token}`;
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const onMessageChange = (e) => setMessage(e.target.value);
  const onImageChange = (e) => setImage(e.target.files[0]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("message", message);
    data.append("image", image);
    const options = {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: data,
    };

    fetch(`http://localhost:3307/api/posts/${id}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          navigate(`/post/${id}`);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://localhost:3307/api/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.log(error));
  }, [id, token]);
  return (
    <Fragment>
      {userConnected.userId === data.userId ? (
        <Fragment>
          {" "}
          <Box>
            <Media>
              <Media.Item renderAs="article" align="left">
                {data.User && (
                  <Image size={64} alt="64x64" src={data.User.image} />
                )}
              </Media.Item>
              <Media.Item>
                <Content>
                  <p className="pJustify">
                    {data.User && <b>{data.User.firstname}</b>}{" "}
                    <small>
                      - Le {moment(data.created).format("DD/MM/YYYY à HH:mm")}
                    </small>
                    <br />
                    {data.message}
                    <br />
                    {data.image ? (
                      <img src={data.image} alt={`${data.image}`} />
                    ) : null}
                  </p>
                </Content>
              </Media.Item>
            </Media>
          </Box>
          <Box>
            <form onSubmit={handleSubmit}>
              <Media renderAs="article">
                <Media.Item align="center">
                  <Form.Field>
                    <Form.Control>
                      <Form.Textarea
                        className="textarea"
                        size="small"
                        type="text"
                        placeholder={`Que voulez vous dire ?`}
                        value={message}
                        onChange={onMessageChange}
                        name="message"
                        required
                        disabled={!userConnected}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Form.InputFile
                        color="link"
                        type="file"
                        onChange={onImageChange}
                        name="image"
                        filename={image.name}
                        icon={<FontAwesomeIcon icon={faUpload} />}
                        label="Choisir un fichier"
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Button color="link" disabled={!userConnected}>
                        Envoyer
                      </Button>
                    </Form.Control>
                  </Form.Field>
                </Media.Item>
              </Media>
            </form>
            <Form.Help align="center" textSize="6" color="danger">
              {error}
            </Form.Help>
          </Box>{" "}
        </Fragment>
      ) : (
        <Message color="danger">
          <Message.Header>
            <span>Erreur</span>
          </Message.Header>
          <Message.Body>Accès non autorisé</Message.Body>
        </Message>
      )}
    </Fragment>
  );
}