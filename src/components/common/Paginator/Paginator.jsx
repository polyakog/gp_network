import React from "react";
import css from './Paginator.module.css'


 const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => {
            return <span key={p} className={currentPage === p ? css.sectedPage : ""}
                onClick={() => { onPageChanged(p); }}>{p}  </span>
        })
        }
    </div>
}

export default Paginator

