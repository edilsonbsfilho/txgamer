import React from "react";
import { formatDateISO } from "../utils/DateUtils";
import Card from 'react-bootstrap/Card';
import { joinPlatforms } from "../utils/ArrayUtils";
import Loading from "../layout/Loading";
import BarraPesquisa from "./BarraPesquisa"
import Paginate from "./Paginate"
import estilo from "./Games.module.css";

class Games extends React.Component {

    index = 0;
    limit = 10;

    constructor(props) {  
        super(props);
        this.state = {
            games: {
                results: []
            },
            removeLoading: false,
            pagina: 1,
            params: {},
            name: ''
        }
        this.gamesClassRef = React.createRef();
    }

    componentDidMount() {        
        this.setState({ params: {page: this.state.pagina, page_size:10} }, () => this.navegar(this.state.params))        
    }

    navegar(params) {
        this.setState({ removeLoading: false })
        
        var paramsIni = {key:'8d9a455ce43f45deab81052d6ed96521'} 
        Object.assign(paramsIni, params)

        var url = new URL('https://rawg-video-games-database.p.rapidapi.com/games')
        url.search = new URLSearchParams(paramsIni).toString();

        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'edaf18dab8msh77b170c8c684a7cp161d4bjsn24b010800b19',
              'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
            }
          };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {       
                this.index = 0;     
                this.setState({ games : json }, () => {
                    //console.log(json)
                    this.setState({ removeLoading: true }); 
                })
            })
            .catch(err => console.error('error:' + err));
    }

    detalharGame(game) {
        //console.log(game.id)
        window.location = "/game-detail?id=" + game.id
    }

    buscarGame(name) {
        //console.log('click: ' + name)
        this.setState({ name: name })
        this.setState({ pagina: 1 }, () => {
            if (name !== '') {
                this.setState({ params: {page:this.state.pagina, page_size:10, search:name} }, () => this.navegar(this.state.params))           
            }   
        })            
              
    }

    render() {
        return (
            <div className={estilo.div_container}>   
            { 
                !this.state.removeLoading ? <Loading /> :  
                <div className={estilo.div_topo}>
                <BarraPesquisa ref={this.gamesClassRef} owner={this} /> 
                    {
                    this.state.games.count > 0 ?
                    <Paginate                         
                        limit={this.limit} 
                        total={this.state.games.count}
                        pagina={this.state.pagina}
                        pai={this} />
                    : 
                    <div></div>
                    }
                </div>
            }
                <div className={estilo.div_body}>
                { 
                    this.state.removeLoading ? this.state.games.results.map((game, index) => 
                    
                    <div key={index} className={estilo.div_game}>                        
                        <Card onClick={() => this.detalharGame(game)} bg="dark" text="white" border="light" className={estilo.cards} >
                            <Card.Header><span className={estilo.titulo_game}>{game.name}</span></Card.Header>
                            <Card.Img variant="top" src={game.background_image} className={ estilo.img_game } />
                            <Card.Body>
                                <Card.Text className={ estilo.cards_text }>
                                Lançamento: {formatDateISO(game.released, 'dd/MM/yyyy')} <br />
                                Plataformas: {joinPlatforms(game.parent_platforms)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                ) : 
                    <div></div>
                }
                </div>    
            </div>
        )
    }
}

export default Games;