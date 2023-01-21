import React from "react";
import { Table, Figure } from "react-bootstrap";
import { formatDateISO } from "../utils/DateUtils";

class Games extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: {
                results: []
            }
        }
    }

    componentDidMount() {
        var url = new URL('https://rawg-video-games-database.p.rapidapi.com/games')

        var params = {key:'8d9a455ce43f45deab81052d6ed96521', page:1, page_size:10} 

        url.search = new URLSearchParams(params).toString();

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
                this.setState({ games : json }, () => console.log(this.state.games))
            })
            .catch(err => console.error('error:' + err));        
    }

    render() {
        return (
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Lançamento</th>
                    <th>Imagem</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.games.results.map((game) =>
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.name}</td>
                                <td>{formatDateISO(game.released, 'dd/MM/yyyy')}</td>
                                <td>
                                    <Figure>
                                        <Figure.Image
                                            width={171}
                                            height={180}
                                            alt="171x180"
                                            src={game.background_image}
                                        />
                                        <Figure.Caption>
                                            Nulla vitae elit libero, a pharetra augue mollis interdum.
                                        </Figure.Caption>
                                    </Figure>                                    
                                </td>
                            </tr>
                        )
                    }                                        
                </tbody>
            </Table>
        )
    }

}

export default Games;