import Logotipo from '../assets/logotipo.png'
import LogoNobre from '../assets/logo.jpg'

const config = {
    atacarejo3irmaos: {
        company: {
            name: 'Atacarejo 3Irmaos',
            cnpj: '12833270000162',
            couponValue: 50,
            printServer: 'localhost',
            logotipo: Logotipo,
        },
        firebase: {
            apiKey: "AIzaSyBU_Lli9FuvT7jB8OKH1aUP-_hNwGJBnd8",
            authDomain: "nfce-atacarejo3irmaos.firebaseapp.com",
            databaseURL: "https://nfce-atacarejo3irmaos.firebaseio.com",
            projectId: "nfce-atacarejo3irmaos",
            storageBucket: "nfce-atacarejo3irmaos.appspot.com",
            messagingSenderId: "154558138668"
        },
        app: {
            title: 'Atacarejo 3Irmaos',
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
            accumulated: false,
        },
    },
    nobre: {
        company: {
            name: 'Nobre Supermercados',
            cnpj: '02722330000116',
            couponValue: 49.9,
            printServer: 'localhost',
            logotipo: LogoNobre,
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
            accumulated: true,
        }
    },
    
}

export default config