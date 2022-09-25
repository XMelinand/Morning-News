import React,{useEffect, useState} from "react";
import "./App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [dbWishlist, setDbWishList] = useState([]);
  const [logged, setLogged] = useState([])

// LOAD DB LIKED ARTICLES 
  useEffect(() => {
    async function loadArticles() {
      var rawResponse = await fetch('/loadArticles',{
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `userToken=${props.userToken}`,
      }
      );
      var response = await rawResponse.json();
      if (response.success) {
      setDbWishList(response.wishList);}
      if(!response.logged){
        setDbWishList(props.myArticles)
        setLogged(false)
      }
    }
    loadArticles();
  }, []);


// CHECK Before mapping & error msgs
  var empty = "";
  if (!logged) {
    empty = {
      msg: "...You need to be logged in...",
      img: "https://i.giphy.com/media/jOpLbiGmHR9S0/giphy.webp",
    };
  }
  if (logged && dbWishlist.length < 1) {
    empty = {
      msg: "...No articles found...",
      img: "https://media.giphy.com/media/tvGOBZKNEX0ac/giphy-downsized-large.gif",
    };
  }

  // DELETE FUNCTION
  async function deleteOnDbWishlist (position, token, title){
    await fetch('/deleteArticles',{
      method: 'DELETE',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `position=${position}&userToken=${token}`,
    });
  setDbWishList(dbWishlist.filter((e) => e.title !== title))

  }
  

  // RETURN COMPONENT
  return (
    <div>
      <Nav />

      <div className="Banner" />
      <div className="Card">
        <div style={{ color: 'red', marginTop:'50px', fontSize: '14px', textAlign: 'center' }}>
      <p>{empty.msg}</p>
       <img style={{borderRadius: '10px'}}src={empty.img}/>
      </div>
          {dbWishlist.map(function (likedArticle, i) {
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
                        deleteOnDbWishlist(i, props.userToken, likedArticle.title);
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
  return { myArticles: state.wishList, userToken : state.userToken };
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
