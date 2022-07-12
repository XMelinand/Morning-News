import React,{useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { List, Avatar} from 'antd';
import Nav from './Nav'

function ScreenSource() {

const [sourceList, setSourceList] = useState([]);

useEffect(() => {
  async function loadData() {
    var rawResponse = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=c54a2e49632748939b269672fa2c2370&language=fr&country=fr');
    var response = await rawResponse.json();
    response = response.sources;
    var newSource = response.map(function(sources){
      return ({
        id : `/articles-by-source/${sources.id}`,
        title : sources.name, 
        description : sources.description, 
        img : `./images/${sources.category}.png`});
    });
    setSourceList(newSource);

  }
  loadData();
},[]);
console.log('caca', sourceList)

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
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

export default ScreenSource;
