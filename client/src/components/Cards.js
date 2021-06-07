import React from 'react';
import './cards.css';
import CardItem from './CardItem';

const cardItem = (fileName) => {
    console.log("Generating cardItem");
    console.log(fileName)
    let fileShortName = fileName.split('10.')[0];
    return (
        <CardItem
            src={fileName}
            text='Explore the hidden waterfall deep inside the Amazon Jungle'
            label='Early Stage'
            path={{
                pathname: '/slides',
                aboutSlides:{
                    name: fileShortName
                }
            }}
      />
    )
}

function Cards() {
    const [data, setData] = React.useState();

    const getData = () => {
        fetch("/api/files", 
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
        getData();     // TODO: reference Slideshow component parameter later
    }, []);


  return (
    <div className='cards'>
      <h1>Invest in these Unicorn Companies!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {/* {cardItem('YCseeddecktemplate10.jpg')} */}
            {data && data.length>0 && data.map((name)=>cardItem(name))}
            {/* {cardItem('slide10.jpg')} */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;