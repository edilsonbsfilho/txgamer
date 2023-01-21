export const traduzir = (texto) => {

    var textoLimpo = texto.state.game.description_raw.split(' ');
    var normalizado = textoLimpo.join(' ');
    console.log(normalizado.replace(/[^a-zA-Z\s]/g, ""));

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'c32b078e65msh5c3a11ed82c78e2p174ea1jsn739035eb4444',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: '[{"Text":"'+normalizado.replace(/[^a-zA-Z\s]/g, "")+'"}]'
    };
    
    fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=pt-BR&api-version=3.0&profanityAction=NoAction&textType=plain', options)
        .then(response => response.json())
        .then(response => response[0])
        .then(response2 => response2.translations)
        .then(response3 => response3[0])
        .then(response4 => texto.setState({ gameDescription: response4.text}))
        .catch(err => console.error('errooo: ' + err));

    return texto.state.gameDescription;
}