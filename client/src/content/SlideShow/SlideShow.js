import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


const slideItem = (fileName) => {
    console.log(fileName)
    return (
        <Carousel.Item>
            <img 
              className="d-block w-100" 
              src={require('../../assets/'+fileName).default}
              alt="First" 
              style={{ height: "100vh"}}
            />
            <Carousel.Caption>
              <h3>First Slide Label</h3>
              <p>Slide 1</p>
            </Carousel.Caption>
        </Carousel.Item>
    )
}

const SlideShow = (props) => {
    const [data, setData] = React.useState();

    const getData = (filename) => {
      fetch("/api/files/"+filename, 
      {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((myJson) => {
        console.log(myJson);
        // setData(prevData => ([...prevData, ...myJson]));
        setData(myJson);
        console.log(data);    
      });
    }

    React.useEffect(() => {
      console.log("aboutSlides");
      console.log(props.location.aboutSlides.name);
      getData(props.location.aboutSlides.name);     // TODO: reference Slideshow component parameter later
    }, []);

    return (
      <>
        <Carousel>
          {data && data.length>0 && data.map((name)=>slideItem(name))}
        </Carousel>
        {/* <div className="Upload">
          {data && data.length>0 && data.map((name)=><p key={name}>{name}</p>)}
        </div> */}
      </>
    )
}

export default SlideShow;