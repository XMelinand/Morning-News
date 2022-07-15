import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { List, Avatar } from "antd";
import { connect } from "react-redux";
import Nav from "./Nav";

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    var language = "fr";
    var country = "fr";
    if (props.setLang == "en") {
      language = "en";
      country = "us";
    }
    if (props.setLang == "es") {
      language = "es";
      country = "es";
    }

    console.log("props", props.setLang);

    async function loadData() {
      var rawResponse = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?apiKey=c54a2e49632748939b269672fa2c2370&language=${language}&country=${country}`
      );
      var response = await rawResponse.json();
      response = response.sources;
      var newSource = response.map(function (sources) {
        return {
          id: `/articles-by-source/${sources.id}`,
          title: sources.name,
          description: sources.description,
          img: `./images/${sources.category}.png`,
        };
      });
      setSourceList(newSource);
    }
    loadData();
  }, [props.setLang]);
  console.log("caca", sourceList);

  return (
    <div>
      <Nav />

      <div className="Banner">
        <div>
          <img
            onClick={() => props.changeLanguage("fr")}
            className="flag"
            src="./images/FR.png"
          />
          <img
            onClick={() => props.changeLanguage("en")}
            className="flag"
            src="./images/US.png"
          />
          <img
            onClick={() => props.changeLanguage("es")}
            className="flag"
            src="./images/ES.png"
          />
        </div>
      </div>

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.img} />}
                title={<Link to={item.id}>{item.title}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    changeLanguage: function (lang) {
      dispatch({ type: "setLanguage", selectedLanguage: lang });
    },
  };
}

function mapStateToProps(state) {
  return { setLang: state.setLang };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
