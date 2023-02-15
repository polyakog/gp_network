import React, { FC, useState } from "react";
import cn from 'classnames'
import css from './Paginator.module.css'

const PaginatorButton = (disabledArrow: boolean, setPortionNumber: (nextPortionNumber: number) => void, nextPortionNumber: number, name: string, text: string) => (
    <div >
        <button
            className={cn(css.arrow, { [css.disabled]: disabledArrow })}
            disabled={disabledArrow}
            onClick={() => { setPortionNumber(nextPortionNumber) }}
            name={name}
        >{text}</button>
    </div>
)

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged?: (pages: number) => void
    portionSize?: number
}

const Paginator: FC<PaginatorPropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChanged = x => x, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
    let leftProtionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightProtionPageNumber = (portionNumber) * portionSize

    //  useEffect(() => setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);



    return <div className={css.paginator}>
        {PaginatorButton((portionNumber < 2 && true), setPortionNumber, 1, "start", "First")}
        {PaginatorButton((portionNumber < 2 && true), setPortionNumber, portionNumber - 1, "before", "<<")}

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
        {PaginatorButton(((portionNumber + 1) > portionCount && true), setPortionNumber, portionNumber + 1, "next", ">>")}
        {PaginatorButton(((portionNumber + 1) > portionCount && true), setPortionNumber, portionCount, "end", "Last")}

    </div>
}

export default Paginator

