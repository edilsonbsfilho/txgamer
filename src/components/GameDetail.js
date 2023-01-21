import React from "react";
import Loading from "../layout/Loading";
import styles from "./Games.module.css";

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
                console.log(json)
                this.setState({ game : json }, () => {
                    this.setState({ removeLoading: true }); 
                })
            })
            .catch(err => console.error('error:' + err));
    }

    render() {
        return(
            <div>
                { !this.state.removeLoading ? <Loading /> :  
                <div className={styles.div_container}>
                    <div className={styles.div_game_img}>
                        <img src={this.state.game.background_image} className={styles.img_game} />                                            
                    </div>    
                    <div className={styles.div_game_detail}>
                        <div className={styles.div_game_description}>
                            <span><h2>{this.state.game.name}</h2></span>
                            {this.state.game.description_raw}
                        </div>
                    </div> 
                    <div className={styles.div_voltar}>
                        <button onClick={() => window.location = '/games'} className={styles.botao_voltar}>VOLTAR</button>
                    </div>           
                </div>
                }
            </div>
        )
    }
}

export default GameDetail;