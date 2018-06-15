const config = {
    company: {
        name: 'Nobre Supermercados',
        cnpj: '02722330000116',
        couponValue: 50,
        printServer: 'localhost',
        logotipo: '../assets/logo.jpg',
    },
    firebase: {
        apiKey: "AIzaSyA9MKhrNrA1AlriKA-xJnVgXkMlP8gGEmo",
        authDomain: "nfce-cupom-nobre-supermercado.firebaseapp.com",
        databaseURL: "https://nfce-cupom-nobre-supermercado.firebaseio.com",
        projectId: "nfce-cupom-nobre-supermercado",
        storageBucket: "nfce-cupom-nobre-supermercado.appspot.com",
        messagingSenderId: "794338613913"
    },
    app: {
        title: 'Nobre Atacarejo - Promoção Torcida Nobre',
        primaryColor: 'blue darken-3',
        secondaryColor: 'amber darken-4',
        cancelColor: 'red',
        qrCodeReader: {
            size: '192',
            fgColor: '#000000',
            bgColor: '#ffffff',
            level: 'L',
            renderAs: 'svg',
            result: 'Aguardando leitura do cupom',
        },
        firebaseMethodLoad: 1,
    }
    
}

export default config