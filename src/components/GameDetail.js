import React from "react";
import Loading from "../layout/Loading";
import details from "./Details.module.css";
import { traduzir } from "../utils/Tradutor";

class GameDetail extends React.Component {

    constructor(props) {  
        super(props);
        this.state = {
            id: 0,
            removeLoading: false,
            game: {},
            gameDescription: ''
        }
    }

    componentDidMount() {
        const searchP = new URLSearchParams(document.location.search);        
        this.setState({ id: searchP.get('id') }, () => this.navegar(this.state.id));
    }

    navegar(id) {
        //console.log(id)
        var paramsIni = {key:'8d9a455ce43f45deab81052d6ed96521'};
        var url = new URL('https://rawg-video-games-database.p.rapidapi.com/games/' + id);
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
                //console.log(json)
                this.setState({ game : json }, () => {
                    this.setState({ removeLoading: true }); 
                    this.setState({ gameDescription: traduzir(this.state.game.description_raw, this) }); 
                })
            })
            .catch(err => console.error('error:' + err));
    }

    render() {
        return(
            <div>
                { !this.state.removeLoading ? <Loading /> :                  
                <div className={details.div_container}>
                    <div className={details.div_cabecalho}>TXGamer</div>
                    <div className={details.div_game_img}>
                        <img alt={this.state.game.name} src={this.state.game.background_image} className={details.img_game} />                                            
                    </div>    
                    <div className={details.div_game_detail}>
                        <div className={details.div_game_description}>
                            <span><h2>{this.state.game.name}</h2></span>
                            {this.state.gameDescription}
                        </div>
                    </div> 
                    <div className={details.div_voltar}>
                        <button onClick={() => window.location = '/games'} className={details.botao_voltar}>VOLTAR</button>
                    </div>           
                </div>
                }
            </div>
        )
    }
}

export default GameDetail;