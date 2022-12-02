import React, { useState } from "react";
import css from './Paginator.module.css'
import cn from 'classnames'

const PaginatorButton = (disabledArrow, setPortionNumber, nextPortionNumber, text) => (
    <div >
        <button
            className={cn(css.arrow, { [css.disabled]: disabledArrow })}
            disabled={disabledArrow}
            onClick={() => { setPortionNumber(nextPortionNumber) }}
        >{text}</button>
    </div>
)


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
        {PaginatorButton((portionNumber < 2 && true), setPortionNumber, 1, "\u21E4")}
        {PaginatorButton((portionNumber < 2 && true), setPortionNumber, portionNumber - 1, "\u2BEC")}

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
        {PaginatorButton(((portionNumber + 1) > portionCount && true), setPortionNumber, portionNumber + 1, "\u2BEE")}
        {PaginatorButton(((portionNumber + 1) > portionCount && true), setPortionNumber, portionCount, "\u21E5")}

    </div>
}

export default Paginator

