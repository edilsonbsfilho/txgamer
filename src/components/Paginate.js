import React from "react";
import paginate from "./Paginate.module.css";
import Pagination from 'react-bootstrap/Pagination';

const Paginate = ({ limit, total, pagina, pai }) => {

    const pages = Math.ceil(total / limit);
    const MAX_ITEMS = pagina > 999 ? 3 : pagina > 96 ? 5 : 7;
    const MAX_LEFT = (MAX_ITEMS - 1) / 2;
    const first = Math.max(pagina - MAX_LEFT, 1);
    var primeiraPagina = 1;

    const onclick = (page) => {
        pagina = page;
        if (page === 0) { page = 1 }

        pai.setState({ pagina: page }, () => {
            const params = { page: pai.state.pagina, page_size: 10 };
            pai.state.name !== '' && Object.assign(params, { search: pai.state.name });            
            pai.fetchGames(params); 
        })
    };

    return(
        <Pagination className={paginate.paginate}>
                <Pagination.First onClick={() => onclick(primeiraPagina)} />
                <Pagination.Prev  onClick={() => onclick(pagina - 1)} />
            {                                
                Array.from({ length: Math.min(MAX_ITEMS, pages) })
                    .map((_, index) => index + first)
                    .map((page) => (
                        (page <= pages) ? 
                        <Pagination.Item color="grey" onClick={() => onclick(page) } key={page} active={page === pagina}>
                        {page}
                        </Pagination.Item>
                        : <div></div>                        
                    ))
            }
                <Pagination.Next onClick={() => onclick(pagina + 1)} />
                <Pagination.Last onClick={() => onclick(pages)} />
        </Pagination>
    )
}

export default Paginate;