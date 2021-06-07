import React from 'react';
import Navbar from './components/Navbar';
import UploadPage from './content/UploadPage/UploadPage';
import Projects from './content/Projects/Projects';
import SlideShow from './content/SlideShow/SlideShow';
import { Route, Switch } from 'react-router-dom';
import { Content } from 'carbon-components-react';
import './app.scss';


function App () {

  return (
    <>
      <Navbar/>
      <Content id="main-content">
        <Switch>
          <Route exact path="/" component={UploadPage} />
          <Route path="/projects" component={Projects} />
          <Route path="/slides" component={SlideShow} />
        </Switch>
      </Content>
    </>
  );
}

export default App;
