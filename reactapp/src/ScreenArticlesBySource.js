import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { Card, Icon, Modal, Button } from "antd";
import Nav from "./Nav";

const { Meta } = Card;

// FONCTION COMPOSANT
function ScreenArticlesBySource(props) {
  //GET PARAM ID
  var { id } = useParams();
  console.log("id", id);

  // STATES
  const [articlesList, setArticlesList] = useState([]);
  //modal state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);

  //modal functions
  const showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // REQUEST API FOR ARTICLES
  useEffect(() => {
    async function loadArticles() {
      var rawResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=c54a2e49632748939b269672fa2c2370`
      );
      var response = await rawResponse.json();
      response = response.articles;
      console.log("merde", response);
      setArticlesList(response);
    }
    loadArticles();
  }, []);

  //COMPONENT RETURN
  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {articlesList.map(function (articleCard, i) {
          return (
            <div key={i}>
              <Card
                style={{
                  width: 300,
                  margin: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                cover={<img alt="example" src={articleCard.urlToImage} />}
                actions={[
                  // ICON ACCESS ARTICLE CONTENT

                  <Icon
                    type="read"
                    key="ellipsis2"
                    onClick={() =>
                      showModal(articleCard.title, articleCard.content)
                    }
                  />,

                  // ICON LIKE ARTICLE
                  <Icon
                    type="like"
                    key="ellipsis"
                    onClick={() => {
                      props.addToWishList(articleCard);
                    }}
                  />,
                ]}
              >
                <Meta
                  title={articleCard.title}
                  description={articleCard.description}
                />
              </Card>
            </div>
          );
        })}
        ;{/* MODAL */}
        <Modal
          visible={visible}
          title={title}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" type="danger" onClick={handleOk}>
              Back
            </Button>,
          ]}
        >
          <p>{content}</p>
        </Modal>
      </div>
    </div>
  );
}

// FONCTION CONTENEUR REDUX
function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({ type: "addArticle", likedArticle: article });
    },
  };
}

export default connect(null, mapDispatchToProps)(ScreenArticlesBySource);
