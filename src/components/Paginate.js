import React from "react";
import styles from "./Games.module.css";
import Pagination from 'react-bootstrap/Pagination';

const MAX_ITEMS = 7;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Paginate = ({ limit, total, pagina, pai }) => {

    const pages = Math.ceil(total / limit);
    const first = Math.max(pagina - MAX_LEFT, 1);

    //console.log('limit '+limit);
    //console.log('total '+total);
    //console.log('pagina '+pagina);

    const onclick = (page) => {
        pagina = page;
        //console.log(page)
        if (page === 0) { page = 1 }

        pai.setState({ pagina: page }, () => {
            var params = { page: pai.state.pagina, page_size: 10 }
            if (pai.state.name !== '') {
                Object.assign(params, { search: pai.state.name })
            }
            pai.setState({ params: params }, () => 
                pai.navegar(pai.state.params)) 
        })
    };

    return(
        <Pagination className={styles.paginate}>
                <Pagination.First onClick={() => onclick(first)} />
                <Pagination.Prev  onClick={() => onclick(pagina - 1)} />
            {                                
                Array.from({ length: Math.min(MAX_ITEMS, pages) })
                    .map((_, index) => index + first)
                    .map((page) => (
                        <Pagination.Item color="grey" onClick={() => onclick(page) } key={page} active={page === pagina}>
                        {page}
                        </Pagination.Item>                        
                    ))
            }
                <Pagination.Next onClick={() => onclick(pagina + 1)} />
                <Pagination.Last onClick={() => onclick(pages)} />
        </Pagination>
    )
}

export default Paginate;