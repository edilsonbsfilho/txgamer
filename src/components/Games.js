import React from "react";
import { formatDateISO } from "../utils/DateUtils";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { joinPlatforms } from "../utils/ArrayUtils";
import Loading from "../layout/Loading";
import styles from "./Games.module.css";
import BarraPesquisa from "./BarraPesquisa"
import Paginate from "./Paginate"

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

    renderRow(game, indice) {
        return (
            <Col>
                <Card onClick={() => this.detalharGame(game)} bg="dark" text="white" border="light" 
                            className={ styles.cards }>
                    <Card.Header as="h6">{game.name}</Card.Header>
                    <Card.Img variant="top" src={game.background_image} className={ styles.cards_img } />
                    <Card.Body>
                        <Card.Text className={ styles.cards_text }>
                        Lançamento: {formatDateISO(game.released, 'dd/MM/yyyy')} <br />
                        Plataformas: {joinPlatforms(game.parent_platforms)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    render() {
        return (
            <div id="games" className={styles.principal}>   
                { !this.state.removeLoading ? <Loading /> :  <BarraPesquisa ref={this.gamesClassRef} owner={this} /> }
                
                <div className={styles.pagination}>
                    { 
                    this.state.games.count > 0 && this.state.removeLoading ?
                        <Paginate                         
                            limit={this.limit} 
                            total={this.state.games.count}
                            pagina={this.state.pagina}
                            pai={this} />
                    : 
                        <div></div>
                    }
                </div>

                <div className={styles.div_games}>
                    <Container fluid>
                        <Row style={{ marginBottom: '5px' }} lg={5} md={3} sm={1}>
                            { this.state.removeLoading ? this.state.games.results.map((game, index) => this.renderRow(game, index)) : <div></div> }
                        </Row> 
                    </Container>    
                </div>                
            </div>
        )
    }
}

export default Games;