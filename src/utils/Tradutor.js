export const traduzir = async (texto, obj) => {
    obj.setState({ removeLoading: false });
    const arrayTexto = texto.split('.');
    const textoTraduzido = [];
    const promises = arrayTexto.map(obter);

    try {
        const responses = await Promise.all(promises);
        responses.map(async response => {
            const promise = await response.json();
            if (promise[0] !== undefined) {
                textoTraduzido.push(promise[0].translations[0].text);
                obj.setState({ gameDescription: textoTraduzido.join(' ') }, () => { obj.setState({ removeLoading: true }); });
            }
        });
    } catch (err) {
        console.error('Erro response: ' + err);
    }

    return obj.state.gameDescription;
};

const obter = (text)  => {
    
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'c32b078e65msh5c3a11ed82c78e2p174ea1jsn739035eb4444',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: '[{"Text":"'+text.replace(/[^a-zA-Z\s]/g, "")+'"}]'
    };

    return fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=pt-BR&api-version=3.0&profanityAction=NoAction&textType=plain', options)
}