import axios from 'axios';
import React,{useEffect , useState} from 'react'

const Home = () => {

    const[carData,setCarData] = useState([]);
    const[pagination,setPagination] = useState();

const homeImages = [
    "car-one.jpg",
    "car-two.jpg",
    "car-three.jpg"
];

    useEffect(() =>{

        axios.get('/cars')
        .then(res => {

            const { data , ...pagination} = res.data;

            setCarData(data);
            setPagination(pagination);

            
        })
        .catch(err => {
            console.log(err);
        })

    },[])



    return (
        <div className="home-page">
            
            <section 
            className="hero" 
            style={{
                 backgroundImage: `url(/storage/images/${homeImages[Math.floor(Math.random() * 2) + 1]})`,
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundAttachment: 'fixed',
                 }}>
            
            
            
            </section>

            <section className="car-list car-drive-container">            

                {(carData.length != 0) && (<>
                
                    {carData.map((car , index) => (
                        <div className="car-card" key={index} style={{ background: `url(${ 'https://picsum.photos' }) no-repeat cover`}}>
                            
                            <h1>{car.make}</h1>
                            <h3>{car.model}</h3>
                            <h5>{car.year}</h5>
                        </div>
                    ))}
                
                </>)}

            </section>



        </div>
    )
}

export default Home
