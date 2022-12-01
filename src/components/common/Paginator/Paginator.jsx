import React, { useState } from "react";
import css from './Paginator.module.css'
import cn from 'classnames'



const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
    let leftProtionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightProtionPageNumber = (portionNumber) * portionSize

    //  useEffect(() => setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);



    return <div className={css.paginator}>

        <div>
            <button
                className={cn(css.arrow, { [css.disabledArrow]: portionNumber < 2 })}
                disabled={portionNumber < 2}
                onClick={() => { setPortionNumber(1) }}
            >&#8676;</button>
        </div>
        <div >
            <button
                className={cn(css.arrow, { [css.disabledArrow]: portionNumber < 2 })}
                disabled={portionNumber < 2}
                onClick={() => { setPortionNumber(portionNumber - 1) }}
            >&#11244;</button>
        </div>


        {pages
            .filter(p => p >= leftProtionPageNumber && p <= rightProtionPageNumber)
            .map(p => {
                return <span key={p}
                    // className={currentPage === p ? css.sectedPage : ""}
                    className={cn(css.pageNumber, { [css.sectedPage]: currentPage === p })}
                    onClick={(e) => {
                        setPortionNumber(portionNumber)
                        onPageChanged(p);

                    }}>{p}  </span>
            })
        }

        <div >
            <button
                className={cn(css.arrow, { [css.disabledArrow]: portionNumber + 1 > portionCount })}
                disabled={portionNumber + 1 > portionCount}
                onClick={() => { setPortionNumber(portionNumber + 1) }}
            >&#11246;</button>
        </div>
        <div>
            <button
                className={cn(css.arrow, { [css.disabledArrow]: portionNumber + 1 > portionCount })}
                disabled={portionNumber + 1 > portionCount}
                onClick={() => { setPortionNumber(portionCount) }}
            >&#8677;</button>
        </div>





        {/* {pages.map(p => {
            return <span key={p} className={currentPage === p ? css.sectedPage : ""}
                onClick={() => { onPageChanged(p); }}>{p}  </span>
        })
        } */}
    </div>
}

export default Paginator

