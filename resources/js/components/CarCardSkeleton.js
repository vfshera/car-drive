import React,{useEffect , useState} from "react";


const CarCardSkeleton = () => {

    const[show,setShow] = useState(false)
    
    useEffect(() => {
       setTimeout(() =>{
        setShow(true)
       },100)
    }, [])

    return (<>

      { (show) && (
        <div
        className="car-card skeleton"
    >
        <div className="caption-wrapper">
            <div className="caption">

                <div className="title">
                  
                </div>

                <div className="description">
                    
                </div>

            </div>
        </div>
    </div>
      ) }

   </> );
};

export default CarCardSkeleton;
