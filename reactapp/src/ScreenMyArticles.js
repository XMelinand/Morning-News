import React from "react";
import "./App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {
  var empty = "";
  if (props.myArticles.length < 1) {
    empty = {
      msg: "...No articles found...",
      img: "https://media.giphy.com/media/tvGOBZKNEX0ac/giphy-downsized-large.gif",
    };
  }
  return (
    <div>
      <Nav />

      <div className="Banner" />
      <div className="Card">
        <div style={{ color: 'red', marginTop:'50px', fontSize: '14px', textAlign: 'center' }}>
      <p>{empty.msg}</p>
       <img style={{borderRadius: '10px'}}src={empty.img}/>
      </div>
          {props.myArticles.map(function (likedArticle, i) {
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
                  cover={<img alt="example" src={likedArticle.urlToImage} />}
                  actions={[
                    <Icon type="read" key="ellipsis2" />,
                    <Icon
                      type="delete"
                      key="ellipsis"
                      onClick={() => {
                        props.deleteToWishList(likedArticle.title);
                      }}
                    />,
                  ]}
                >
                  <Meta
                    title={likedArticle.title}
                    description={likedArticle.description}
                  />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
  );
}

//STATE-PROPS
function mapStateToProps(state) {
  return { myArticles: state.wishList };
}
//DISPATCH-PROPS
function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (title) {
      dispatch({ type: "deleteArticle", articleToDelete: title });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
