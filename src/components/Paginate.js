import React from "react";
import paginate from "./Paginate.module.css";
import Pagination from 'react-bootstrap/Pagination';

const Paginate = ({ limit, total, pagina, pai }) => {

    const pages = Math.ceil(total / limit);
    var MAX_ITEMS;
    var MAX_LEFT;
    var first;
    var primeiraPagina = 1;

    //console.log('limit '+limit);
    //console.log('total '+ typeof total);
    //console.log('pagina '+pagina);

    if (pagina > 999) {
        MAX_ITEMS = 3;        
    } else if (pagina > 96) {
        MAX_ITEMS = 5
    } else {
        MAX_ITEMS = 7;
    }

    MAX_LEFT = (MAX_ITEMS - 1) / 2;
    first = Math.max(pagina - MAX_LEFT, 1);

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