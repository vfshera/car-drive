import React,{useState , useEffect} from 'react'



const Pagination = ({ inFirstPage ,inLastPage , links ,pagesToShow = 5, getPage ,currentPage, prevPage,nextPage }) =>{


    const pageNumberLimit = pagesToShow || 5;
    const [minPageNumberLimit,setMinLimit] = useState(0);
    const [maxPageNumberLimit,setMaxLimit] = useState(5);




    useEffect(() => {

          const coefficient = Math.ceil((currentPage /5 )) * pageNumberLimit;



        if(currentPage > maxPageNumberLimit){
            setMaxLimit(coefficient)
            setMinLimit(coefficient - pageNumberLimit)
            // setMaxLimit(maxPageNumberLimit + pageNumberLimit)
            // setMinLimit(minPageNumberLimit + pageNumberLimit)
        }

        if(currentPage <= minPageNumberLimit){
            setMaxLimit(coefficient)
            setMinLimit(coefficient - pageNumberLimit)

            //  setMaxLimit(maxPageNumberLimit - pageNumberLimit)
            // setMinLimit(minPageNumberLimit - pageNumberLimit)
            //
            //
        }

        //
        // console.log(`Page ${currentPage} --> ${coefficient}`)
        //
        // console.log(`Max Limit --> ${maxPageNumberLimit}`)
        // console.log(`Min Limit --> ${minPageNumberLimit}`)


    },[currentPage])

    return (
        <section className="pagination car-drive-container">
            <button
                className={inFirstPage && "disabled"}
                onClick={(e) => {
                    e.preventDefault();
                    !inFirstPage &&
                    getPage(prevPage);
                }}
            >
                PREV
            </button>
            <section className="page-numbers">

                {minPageNumberLimit !=0 && (
                    <>

                        <button
                            className="peak-page"
                            onClick={(e) => {
                                e.preventDefault();
                                getPage(links?.[1].url);
                            }}
                        >
                            {links?.[1].label}
                        </button>

                        <button
                            className="showmore disabled"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            [...]
                        </button>


                    </>
                )}


                {links?.map((pageLink , index) => {

                    // if (index != 0 && index != links?.length - 1 ) {
                    if (index != 0 && index != links?.length - 1 && (index <= maxPageNumberLimit  && index > minPageNumberLimit )) {

                        return (
                            <button
                                className={pageLink.label == currentPage && "current-page"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    getPage(pageLink.url);

                                    console.log("Page "+pageLink.label+"-->"+pageLink.url)
                                }}
                                key={index}
                            >
                                 {pageLink.label}
                            </button>
                        );

                    }

                })}


                {!inLastPage && (
                    <>


                        <button
                            className="showmore disabled"
                            onClick={(e) => {
                                e.preventDefault();
                            }}

                        >
                            [...]
                        </button>


                        <button
                            className="peak-page"
                            onClick={(e) => {
                                e.preventDefault();
                                getPage(links?.[links?.length - 2].url);
                            }}

                        >
                            {links?.[links?.length - 2].label ?? "Last"}
                        </button>


                    </>
                )}
            </section>
            <button
                className={inLastPage && "disabled"}
                onClick={(e) => {
                    e.preventDefault();
                    !inLastPage &&
                    getPage(nextPage);
                }}
            >
                NEXT
            </button>
        </section>
    )
}

export default Pagination;
