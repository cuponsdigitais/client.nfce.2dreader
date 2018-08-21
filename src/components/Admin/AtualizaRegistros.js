import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

class AtualizaRegistros extends Component {
    state = {
        status: 'start',
        clients: [
{ id: '00759459401', name: 'VERA LUCIA VALENTIM DA SILVA', phone: '081 9 86139275', address: 'RUA SAO JOSE N69', district: 'VILA FERROVIARIA', city: 'RIBEIRAO - PE', coupons: 10 },
{ id: '00818495596', name: 'MARIA GLAUCIA ALVES DA SILVA', phone: '071 986059306', address: 'RUA ALTO DO MIRANTE N11', district: 'SANTANA', city: 'SALVADOR - BA', coupons: 2 },
{ id: '00895459744', name: 'ADRIANO ROSSI TEIXEIRA', phone: '021 964873996', address: 'RUA DANIEL BARRETO SANTOS N15 CASA 7', district: 'RECREIO DOS BANDEIRANTES', city: 'RIO DE JANEIRO - RJ', coupons: 7 },
{ id: '00982439423', name: 'RICARDO SILVA DOS SANTOS', phone: '081 971122340', address: 'RUA JOAO RODRIGUES ,N 108', district: 'VILA JOSE MARIANO', city: 'RIBEIRAO - PE', coupons: 3 },
{ id: '01264182414', name: 'LUCIVALDA FERREIRA DA SILVA', phone: '081 98558152', address: 'RUA ACRE N 405', district: 'EUDORADO', city: 'RIBEIRAO - PE', coupons: 1 },
{ id: '01537473409', name: 'PEDRO JOSE DA SILVA', phone: '81 9 9330-5167', address: 'ENG AMARAGI, S/N', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 1 },
{ id: '01542827400', name: 'JAILSOM ALVES DA SILVA', phone: '081 988644200', address: 'ENGENHO CACHOEIRA NOVA', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 22 },
{ id: '01931086400', name: 'AMARO EMILIO STEVAM FILHO', phone: '081 982246136', address: 'RUA USINA CAXANGA , N 09', district: 'USINA CAXANGA', city: 'RIBEIRAO - PE', coupons: 12 },
{ id: '02851007424', name: 'ADRIANA FREITAS DA SILVA', phone: '81 9 9750-2866', address: 'ENG BANANAL N 02', district: 'ZONA RURAL', city: 'SERRA AZUL - PE', coupons: 1 },
{ id: '02889148483', name: 'ROBERTO CARLOS MARTINS DA SILVA', phone: '081 993073109', address: 'ENGENHO SANTO ALIAS', district: 'ZONA RURAL', city: 'SIRINHAEM - PE', coupons: 13 },
{ id: '03078845460', name: 'GISLENE FERREIRA VIANA', phone: '11 96459-5116', address: 'RUA BRASILINA FONSECA, 255, APT 34 BL 1', district: 'VILA CAMPESTRE', city: 'SAO PAULO - SP', coupons: 3 },
{ id: '03204462471', name: 'MARIA JOSE DA SILVA SOUZA', phone: '081 989494119', address: 'ENGENHO SANTOS ELIAS SN', district: 'ZONA RURAL', city: 'SIRINHAEM - PE', coupons: 1 },
{ id: '03321402459', name: 'MANOEL AMARANTE DA SILVA FILHO', phone: '81 99780-9926', address: 'ENGENHO CANOINHA', district: 'RURAL', city: 'TAMANDARE - PE', coupons: 5 },
{ id: '03382548461', name: 'MARIA JOSE DA SILVA FILHA', phone: '081 997861815', address: 'ENGENHO MOCA', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 15 },
{ id: '03720714497', name: 'JOSEFA MARIA DA SILVA', phone: '081 982145441', address: 'ENGENHO CUNHANBUCA B', district: 'ZONA RURAL', city: 'GAMELEIRA - PE', coupons: 22 },
{ id: '03835329499', name: 'LEOSVALDO LINS SILVA', phone: '081 991280091', address: 'RUA JULIA BUARQUE ,N 320', district: 'CENTRO', city: 'PORTO CALVO - AL', coupons: 7 },
{ id: '03885297418', name: 'MOISES JOSE AZEVEDO', phone: '081 96983893', address: 'ENGENHO SERRINHA MINA DA PEDRA', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 3 },
{ id: '03926733470', name: 'CATARINE BETIZA ALVES COSTA', phone: '81 9 9694-9428', address: 'RUA TEREZA HELENA, N 618', district: 'SANTA ROSA', city: 'PALMARES - PE', coupons: 1 },
{ id: '03964988413', name: 'MARCIO BARRETO DA SILVA', phone: '11 98887-0902', address: 'RUA FIGUEIRA DA POLINESIA, 16', district: 'ERMELINO MATARAZZO', city: 'SAO PAULO - SP', coupons: 4 },
{ id: '03993494482', name: 'ELIVANIA PATRICIA GOMES', phone: '081 996107908', address: 'RUA JOAO JOSE DA SILVA, N80', district: 'ALTO DOIS IRMAOS', city: 'PAUDALHO - PE', coupons: 1 },
{ id: '04039558405', name: 'ANA LUCIA DA CONCEICAO SOUZA', phone: '81 99853-8174', address: 'RUA PERNAMBUCO, 13 AGROVILA RETIRO', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 21 },
{ id: '04169155408', name: 'ODAIR JOSE DE FRANCA', phone: '081 986956858', address: 'RUA DO BARREIRAO N89', district: 'CAXANGA', city: 'RIBEIRAO - PE', coupons: 10 },
{ id: '04172209440', name: 'ANA LUCIA COSTA DE OLIVEIRA', phone: '081 992312341', address: 'EDGN. SAUE GRANDE N58', district: 'ZONA RURAL', city: 'TAMANDARE - PE', coupons: 7 },
{ id: '04266335474', name: 'CARLOS BONIFACIO BRITO DE MELO', phone: '81 9 8896-4981', address: 'TERCEIRA TRAV SESQUECENTENARIO , N 238', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 17 },
{ id: '04303642452', name: 'EDMILSON CUNHA BARRETO', phone: '081 36712601', address: 'ENG. MINAS NOVAS N138', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 2 },
{ id: '04480303499', name: 'ARIANE MEDEIROS DE MIRANDA CAVALCANTE LUCAS', phone: '81 9 9979-8600', address: 'PRACA ABELARDO SENA N 245', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 9 },
{ id: '04938664429', name: 'AURICEIA MARIA DA SILVA', phone: '081 97082469', address: 'USINA CUCAU , ENGENHO CASTELO', district: 'ZONA RURAL', city: 'RIO FORMOSO - PE', coupons: 1 },
{ id: '04949392492', name: 'SULANITA FRANCELINA ALVES', phone: '81 9 85251018', address: 'RUA ARTHUR VIEIRA DE MELO, 312', district: 'NOVA VILA RICA', city: 'RIBEIRAO - PE', coupons: 11 },
{ id: '05046443430', name: 'FABIANA PATRICIA ALVES DA SILVA', phone: '081 992015258', address: 'AVENIDA MARIO DOMINGOS ,N 1095', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 31 },
{ id: '05204442480', name: 'SAMUEL SILVA DE OLIVEIRA', phone: '81 9 84925505', address: 'RUA SANTA RITA DE CASSIA, 1138', district: 'VILA FERROVIARIA', city: 'RIBEIRAO - PE', coupons: 5 },
{ id: '05241820434', name: 'PAULO SERENO MARCELINO', phone: '081 985223182', address: 'RUA LUIS RODRIGUES DA SILVA ,N 76', district: 'NOVA VILA RICA', city: 'RIBEIRAO - PE', coupons: 6 },
{ id: '05353972406', name: 'PEDRO PAULO DA SILVA', phone: '081 996819054', address: 'RUA PADRE ANTONIO LAGREKA ,N 190', district: 'SANTA LUZIA', city: 'PALMARES - PE', coupons: 4 },
{ id: '05533331433', name: 'MARIA DE FATIMA RODRIGUES DA SILVA', phone: '81 9 9824-3948', address: 'AGROVILA CONCEICAO, S/N', district: 'USINA CUCAU', city: 'RIO FORMOSO - PE', coupons: 37 },
{ id: '05540811488', name: 'JOSE IVANILDO DA SILVA', phone: '081 999835599', address: 'USINA CUCAU', district: 'USINA CUCAU', city: 'RIO FORMOSO - PE', coupons: 11 },
{ id: '05605654454', name: 'PAULA CRISTIANE BEZERRA DA SILVA', phone: '081 999193810', address: 'RUA B N10', district: 'SAO JOSE', city: 'SERRA AZUL - PE', coupons: 8 },
{ id: '05622335477', name: 'CLAUDIANO VICENTE DO NASCIMENTO SILVA', phone: '081 996997039', address: 'ENGENHO CACHOERINHA', district: 'ZONA RURAL', city: 'RIO FORMOSO - PE', coupons: 8 },
{ id: '05655968452', name: 'ALEQUISSANDRO MIGUEL ARCANJO', phone: '081 982756874', address: 'RUA JOAO FELIPE ,N 1179', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 16 },
{ id: '05734508462', name: 'MARLEIDE ALBINO DA SILVA', phone: '81 98469-7749', address: 'RUA FRNACISCO GONCALVES, 67', district: 'COHAB', city: 'RIBEIRAO - PE', coupons: 8 },
{ id: '05900741486', name: 'JOSILMA LIMA REIS', phone: '081 987049105', address: 'RUA ACRE ,N 405 B', district: 'EUDORADO', city: 'RIBEIRAO - PE', coupons: 2 },
{ id: '05992219412', name: 'CRISTINA MARIA DO NASCIMENTO MELO', phone: '81993050504', address: '2 TRAV JULIA BOAQUE ,N 13', district: 'CENTRO', city: 'PORTO CALVO - AL', coupons: 32 },
{ id: '06054724401', name: 'JOELMIR JOSE LOPES DA SILVA', phone: '081 984864718', address: 'RUA SILVA JARDIM , N63', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 1 },
{ id: '06153772463', name: 'RENATA MANUELA DA SILVA', phone: '081 996933897', address: 'RUA PROF AURINO NICEIAS ,N 06', district: 'USINA CUCAU', city: 'RIO FORMOSO - PE', coupons: 22 },
{ id: '06213809465', name: 'EURIDIS MARIA DA CONCEICAO', phone: '081 997000878', address: 'RUA NOVA N1 USINA SERRA AZUL', district: 'ZONA RURAL', city: 'SERRA AZUL - PE', coupons: 6 },
{ id: '06282843499', name: 'MARCOS JOSE DE OLIVEIRA XAVIER', phone: '81 98181-2078', address: 'RUA DO SOL, 500', district: 'VILA SAUE', city: 'TAMANDARE - PE', coupons: 11 },
{ id: '06400422870', name: 'JOSE SILVA', phone: '011 943307207', address: 'AV. NOSSA SENHORA DO O N1360', district: 'LIMAO', city: 'SAO PAULO - SP', coupons: 1 },
{ id: '06507886483', name: 'JOSE LUCIANO DA SILVA', phone: '82 99356-9402', address: 'RUA PAULINO SILVA, 120', district: 'CENTRO', city: 'PORTO CALVO - AL', coupons: 0 },
{ id: '06544136492', name: 'JOSE ROBERTO DOS SANTOS AZEVEDO', phone: '81 9 9718-4660', address: 'ENG SERRINHA N 13', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 3 },
{ id: '06675729888', name: 'ROBERTO CARLOS NUNES DE MENDONCA', phone: '011 9 9116-5992', address: 'RUA GUIDO BONICE N 250', district: 'JARDIM BELEM', city: 'SAO PAULO - SP', coupons: 3 },
{ id: '06889803418', name: 'IRAN ROBERTO DA SILVA', phone: '081 986444349', address: 'RUA COHAB 1', district: 'CENTRO', city: 'TAMANDARE - PE', coupons: 12 },
{ id: '07242558425', name: 'PAILANDRA CARMELIA SANTOS DA SILVA', phone: '081 988246394', address: '1 TRAV FRANCISCO GONCALVES ,N 87', district: 'COHAB', city: 'RIBEIRAO - PE', coupons: 4 },
{ id: '07740660400', name: 'IVANISE AMELIA CANDIDO', phone: '081 982879982', address: 'RUA DA CORUJA SN', district: 'USINA SANTO ANDRE', city: 'TAMANDARE - PE', coupons: 12 },
{ id: '08014347420', name: 'MALQUIAS JOSE DA SILVA', phone: '081 986091496', address: 'RUA WALFRIDO LINS DE MORAES,N 367 APT 312 BLOCO E', district: 'JANGA', city: 'PAULISTA - PE', coupons: 1 },
{ id: '08017414404', name: 'ANA PAULA ALMEIDA DOS SANTOS', phone: '081 997480568', address: 'ENGENHO SANTA CRUZ 1', district: 'ZONA RURAL', city: 'TAMANDARE - PE', coupons: 14 },
{ id: '08023659499', name: 'MARIANA CLAUDIA DE CASTRO SILVA', phone: '081 987939324', address: 'CONDOMINIO MARQUES SAO JOSE ., N108', district: 'GAMEL;EIRA', city: 'SAO JOSE - PE', coupons: 1 },
{ id: '08082683414', name: 'JOSE FRANCISCO DA SILVA', phone: '81971182227', address: 'RUA PROFESSORA ADELFINA BEZERRA', district: 'SANTA LUZIA', city: 'PALMARES - PE', coupons: 11 },
{ id: '08186039414', name: 'EDILEUZA MARIA DA SILVA', phone: '081 96580800', address: 'ENGENHO CACHOEIRA NOVAS', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 37 },
{ id: '08446068478', name: 'MIRONILSON DA SILVA SOBRAL', phone: '81 9 9795-1332', address: 'ENGENHO MOCA', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 5 },
{ id: '08446119480', name: 'MARCOS DE ANDRADE LIMA', phone: '081 981337965', address: 'RUA DO COMERCIO ,N 404', district: 'VILA SANTO ANTONIO', city: 'SANTO ANTONIO - PE', coupons: 3 },
{ id: '08727545881', name: 'WILSON JOSE DE OLIVEIRA', phone: '11 9 83598174', address: 'RUA ORIENTE, 110', district: 'JARDIM SANTO ANDRE', city: 'SAO PAULO - SP', coupons: 5 },
{ id: '08857874478', name: 'FLAVIO JOSE DA SILVA', phone: '065 99747277', address: 'RUA JULIO VITURINO, N21', district: 'MATA DO CAJUEIRO', city: 'SAO JOSE - PE', coupons: 1 },
{ id: '08871904486', name: 'JOSE LEANDRO DOS SANTOS', phone: '081 983358524', address: 'RUA JOSE ALVES DE LIMA N44', district: 'COHAB', city: 'SIRINHAEM - PE', coupons: 1 },
{ id: '08902451429', name: 'ELENILDO SOUZA DA SILVA', phone: '81 99870-8971', address: 'RUA PERNAMBUCO', district: 'AGROVILA RETIRO', city: 'RIBEIRAO - PE', coupons: 2 },
{ id: '09041035443', name: 'GEANDSON FRANCISCO DA SILVA', phone: '081 997079277', address: 'CUCAU', district: 'ZONA RURAL', city: 'RIO FORMOSO - PE', coupons: 17 },
{ id: '09064975400', name: 'SAYONARA LINDOSO DURVAL', phone: '81 9 97508275', address: 'RUA DOS TORROES, 13', district: 'USINA CUCAU', city: 'RIO FORMOSO - PE', coupons: 18 },
{ id: '09090287450', name: 'WELLINGTON FRANCISCO DA SILVA', phone: '81 99624-1191', address: 'ENGENHO PEDRA DE AMOLAR', district: 'ZONA RURAL', city: 'RIO FORMOSO - PE', coupons: 6 },
{ id: '09488884401', name: 'JOSE FLAVIO LEANDRO CELESTINO DE LIMA', phone: '081 939152033', address: 'RUA VILA JOSE MARIANO ,N 07', district: 'CAXANGA', city: 'RIBEIRAO - PE', coupons: 5 },
{ id: '09918427400', name: 'CRISTIANO LUIS DE SOUZA', phone: '081 996205761', address: 'ENGENHOP CAMIVOZINHO ,N 11', district: 'ZONA RURAL', city: 'SERRA AZUL - PE', coupons: 6 },
{ id: '10389009482', name: 'EDILENE MARIA DA SILVA', phone: '081 995487717', address: 'ENGENHO CACHOEIRA', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 16 },
{ id: '10731782429', name: 'MAURICIO VIRGINIO DA SILVA JUNIOR', phone: '81 99880-6296', address: 'RUA DOS TORROES, 17', district: 'USINA CUCAU', city: 'RIO FORMOSO - PE', coupons: 14 },
{ id: '10811357430', name: 'VANDERSON SENA DA SILVA', phone: '081 991669228', address: 'USINA RIBEIRAO N35', district: 'USINA RIBEIRAO', city: 'RIBEIRAO - PE', coupons: 17 },
{ id: '10892238461', name: 'MARIA MARTA DA SILVA MOURA', phone: '081 9', address: 'RUA DO BARREIRAO , S N BR 101', district: 'VILA JOSE MARIANO', city: 'RIBEIRAO - PE', coupons: 5 },
{ id: '11135222401', name: 'DANIELA MARIA DA SILVA', phone: '81 9 81217360', address: 'RUA VILA NOVA, 01', district: 'IBIRATINGA', city: 'SIRINHAEM - PE', coupons: 1 },
{ id: '11392020492', name: 'JOSE WELLINSON DA SILVA NEVES', phone: '081 996957754', address: 'ENGENHO CACHOEIRA NOVAS', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 11 },
{ id: '11511628766', name: 'LIVIO MAGNO ALVES', phone: '027 981881153', address: 'RUA JORGE MAGESTADE ,N 4', district: 'NOVO MEXICO', city: 'VILA VELHA - ES', coupons: 1 },
{ id: '12098042477', name: 'ERIKA MARIA DA SILVA', phone: '081 987302966', address: 'RUA ANTONIO MARQUES DE LIMA ,N 20 RUA 13', district: 'VILA BANDEIRANTES', city: 'RIBEIRAO - PE', coupons: 7 },
{ id: '12653441403', name: 'JONATAS JOSE MENDOCA DA SILVA', phone: '81 9 97774591', address: 'SITIO SAO JOAO', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 13 },
{ id: '13452414450', name: 'DEYCISON JOSE AZEVEDO DE ANDRADE', phone: '081 999388586', address: 'ENGENHO SERRINHA 2', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 10 },
{ id: '13452445410', name: 'DOLGLAS AZEVEDO DE ANDRADE', phone: '081 996214249', address: 'ENGENHO SERRINHA 2', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 15 },
{ id: '16881257449', name: 'MARIA MONICA MELO CAVALCANTI', phone: '081 991680294', address: 'AV AGAMENON MAGALHOES ,N 304', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 3 },
{ id: '18094058404', name: 'JOE ADEMAR DA SILVA', phone: '081 998214334', address: 'AGROVILA CONCEICAO', district: 'VILA', city: 'RIO FORMOSO - PE', coupons: 14 },
{ id: '21769630406', name: 'JEDALVA CORREIA DE LIMA', phone: '81 98281-4576', address: 'RUA DO SOL, 6', district: 'VILA SAUE', city: 'TAMANDARE - PE', coupons: 15 },
{ id: '22485058415', name: 'CARLOS AUGUSTO VELOSO DA SILVA', phone: '81 9 9239-0576', address: 'RUA JOSE FERREIRA DA SILVA N 33', district: 'ALTO DA FE', city: 'RIBEIRAO - PE', coupons: 5 },
{ id: '24703362449', name: 'REGINALDO DA SILVA', phone: '81 99253-2093', address: 'PA COCALZINHO', district: 'RURAL', city: 'TAMANDARE - PE', coupons: 24 },
{ id: '25246925404', name: 'KARIN ALVES PIRES', phone: '081 985314928', address: 'QUARTA TRAV AGMENON MAGALHAES ,N 81', district: 'SITIO FRAGOSO', city: 'PAULISTA - PE', coupons: 5 },
{ id: '26429497453', name: 'LOURINALDO PAULO DA SILVA', phone: '081 998062651', address: 'AV. CONSTANTINO PONTUAL GOMES FERREIRA N195', district: 'ANA CRISTINA', city: 'SAO JOSE DA COROA GRANDE - PE', coupons: 1 },
{ id: '26661772468', name: 'GIVANILDO JOSE DAS NEVES', phone: '81 98888-9929', address: 'AV CONSTANTINO PONTUAL GOMES FERREIRA, 73', district: 'CENTRO', city: 'SAO JOSE DA COROA GRANDE - PE', coupons: 8 },
{ id: '29524865491', name: 'WILSON JOSE CAETANO DA SILVA', phone: '81 9 8426-3589', address: 'TERCEIRA TRAV DA RUA A, N 33', district: 'ALTO DO PADRE CICERO', city: 'RIBEIRAO - PE', coupons: 1 },
{ id: '30666198420', name: 'MARLUCE DE BRITO DE MELO', phone: '81 3671-1131', address: 'RUA FRUCTUOSO DIAS N 161', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 13 },
{ id: '31456324420', name: 'VALDENICE DA SILVA BATISTA', phone: '081 97043368', address: 'RUA FRANCISCO GONCALVES ,N 03', district: 'COHAB', city: 'RIBEIRAO - PE', coupons: 43 },
{ id: '31967035415', name: 'JOSE TAVARES FILHO', phone: '81 98676-7396', address: 'RUA CLETO CAMPELO, 166', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 32 },
{ id: '32977245871', name: 'WILLIAN BISPO MATOS', phone: '11 972215798', address: 'RUA LEONILDA ,N 354', district: 'VILA CAMILOPULES', city: 'SAO PAULO - SP', coupons: 2 },
{ id: '39001709400', name: 'JOSE DOS SANTOS DA ROCHA', phone: '021 970023397', address: 'RUA SENADOR BERNARDO MONTEIRO ,N184', district: 'BEM FICA', city: 'RIO DE JANEIRO - RJ', coupons: 35 },
{ id: '40077276434', name: 'JOSE ZITO BATISTA', phone: '81 99907-8622', address: 'AV AMARO DOMINGOS, 1356', district: 'COHAB', city: 'RIBEIRAO - PE', coupons: 6 },
{ id: '42116821487', name: 'CELIO JOSE DE SOUSA FIGUEREDO', phone: '087 999980521', address: 'AVENIDA CEAPE ,N61', district: 'KM 02', city: 'PETROLINA - PE', coupons: 1 },
{ id: '42175224449', name: 'ANTONIO LEONARDO MARTINS', phone: '081 984834990', address: 'FRUTUOSO DIAS ,N 132 A', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 4 },
{ id: '43757545400', name: 'ISAIAS DE CARVALHO SOUSA', phone: '81 9 9285-6703', address: 'RUA FORTUNATO LUIZ DE ASSIS N 338', district: 'CENTRO', city: 'QUIPAPA - PE', coupons: 2 },
{ id: '43930310406', name: 'MARIA TEREZA DE LIMA', phone: '81 99427-3331', address: 'PC CAETANO ALVES DE AQUINO, 15', district: 'CENTRO', city: 'SAO BENEDITO DO SUL - PE', coupons: 22 },
{ id: '45320756453', name: 'RAMATES DA SILVA SANTOS', phone: '81 98827-0558', address: 'LOT COHAB', district: 'CENTRO', city: 'TAMANDARE - PE', coupons: 9 },
{ id: '45893144449', name: 'LUIZ FERNANDO GOMES', phone: '081 999828892', address: 'AVEINDA MARIO DOMINGOS ,N 50 4 TRAVESSA', district: 'COHAB', city: 'RIBEIRAO - PE', coupons: 7 },
{ id: '46058257468', name: 'JOSE JURANDIR DA SILVA', phone: '81 99241-1538', address: 'RUA DA MATA, 3', district: 'VILA 31 DE MARCO', city: 'SERINHAEM - PE', coupons: 2 },
{ id: '46294945453', name: 'PEDRO PAULO DA SILVA', phone: '081 996700719', address: 'RUA SANTOS DRUMONT ,N 165', district: 'SAO PEDRO', city: 'PALMARES - PE', coupons: 2 },
{ id: '47329130400', name: 'KILDARE GUEDES DOS ANJOS', phone: '81 9 87018524', address: 'RUA JOAO SEBASTIAO DE MELO, 100', district: 'VILA RICA', city: 'RIBEIRAO - PE', coupons: 14 },
{ id: '50746766491', name: 'BEROALDO BUARQUE DA SILVA', phone: '81 9 92476555', address: 'RUA DA ESCOLA', district: 'ENG AMARAJI', city: 'RIBEIRAO - PE', coupons: 34 },
{ id: '50766830497', name: 'NAIZIDE ELIODORIO DAVINO', phone: '081 986482853', address: 'RUA PRESIDENTE COSTA E SILVA ,N 462', district: 'SANTA ROSA', city: 'PALMARES - PE', coupons: 3 },
{ id: '52197654420', name: 'ROMILDO LEMOS DOS SANTOS', phone: '081 988808757', address: 'RUA ANTONIO MENDES ,N 925', district: 'CENTRO', city: 'SAO JOSE DA COROA GRANDE - PE', coupons: 2 },
{ id: '59260912415', name: 'TEREZINHA DE JESUS DA SILVA', phone: '081 999963918', address: 'RUA ARLINDO JIOSE DA SILVA , N336', district: 'VILA BANDEIRANTES', city: 'RIBEIRAO - PE', coupons: 2 },
{ id: '60683198491', name: 'MARCOS DA SILVA BRASIL', phone: '011 977072190', address: 'RUA ILHA MEXICANA ,N 25', district: 'JARDIM PEROLA 3', city: 'SAO PAULO - SP', coupons: 2 },
{ id: '61432610406', name: 'ELIANA ALVES DAMASCENO', phone: '87 9 9911-1963', address: 'RUA POETA LEVINO NETO , N 1093', district: 'NOSSA SENHORA APARECIDA', city: 'SALGUEIRO - PE', coupons: 2 },
{ id: '61788350430', name: 'VALMIR BARBOSA DE FARIAS', phone: '081 999411036', address: 'AVENIDA MARIO DOMINGUES ,N 1815', district: 'COHAB', city: 'RIBEIRAO - PE', coupons: 25 },
{ id: '65842634449', name: 'SANDRA MARIA DE ARAUJO MOREIRA', phone: 'S N', address: 'RUA GUARARAPES ,N 313 A', district: 'ALTO DA DEIA', city: 'RIBEIRAO - PE', coupons: 1 },
{ id: '66695546487', name: 'TEREZINHA DE JESUS PEREIRA', phone: '011 9 8297-0304', address: 'RUA NELZA DIAS DE SOUSA N 40', district: 'SITIO DAS MADRES 2', city: 'SAO PAULO - SP', coupons: 11 },
{ id: '69369178449', name: 'LUIZ CARLOS GOMES ANAMIRA', phone: '064 9 9836373', address: 'AV FEIJAO BATISTA N166 A', district: 'CENTRO', city: 'QUIRINOPOLIS - GO', coupons: 1 },
{ id: '69388148487', name: 'EDIVALDO FIRMINO DA SILVA', phone: '011 992117364', address: 'AV CARLOS DRUMOND DE ANDRADE , N 74 CASA 01', district: 'SANTA MARIA', city: 'SAO PAULO - SP', coupons: 7 },
{ id: '69878986420', name: 'IVANI RODRIGUES DA SILVA FARIAS', phone: '081 982663801', address: 'RUA JOSE MARIANO ,N 03', district: 'VILA JOSE MARIANO', city: 'RIBEIRAO - PE', coupons: 4 },
{ id: '70599685476', name: 'CICERA MARIA DA SILVA', phone: '081 96495766', address: 'ENEGENHO CACHOEIRA', district: 'ZONA RURAL', city: 'RIBEIRAO - PE', coupons: 9 },
{ id: '72509503472', name: 'GENIVAL MARIANO DA SILVA', phone: '081 993094152', address: 'ACENTAMENTO MATA VERDE , S N', district: 'ZONA RURAL', city: 'TAMANDARE - PE', coupons: 1 },
{ id: '72513624491', name: 'ELIANE ALMEIDA SANTOS DE FRANCA', phone: '082 991064926', address: 'POVOADO MANGANZALA', district: 'CENTRO', city: 'PORTO CALVO - AL', coupons: 12 },
{ id: '72529016453', name: 'JOSUEL BISPO DA SILVA', phone: '082 991185007', address: 'CONJUTO HABITACIONAL MANGANZALA', district: 'CENTRO', city: 'PORTO CALVO - AL', coupons: 2 },
{ id: '73135739449', name: 'PEDRO JOSE GOMES BISNETO', phone: '81985303025', address: 'RUA SEQUESCENTENARIO ,292', district: 'CENTRO', city: 'RIBEIRAO - PE', coupons: 1 },
{ id: '73173088468', name: 'IVANILSON MARIA DA SILVA', phone: '81 996552019', address: 'VILA CONCEICAO', district: 'USINA CUCAU', city: 'RIO FORMOSO - PE', coupons: 13 },
{ id: '76934365453', name: 'ALEXANDRE DA SILVA FRANCA', phone: '081 9983045319', address: 'RUA A ,N 7', district: 'REDENCAO', city: 'VITORIA DE SANTO ANTAO - BA', coupons: 1 },
{ id: '79336841491', name: 'ILTON LEODEGARIO DE OLIVEIRA', phone: '81 9 9487-9389', address: 'RUA DR JOSE MARIANO, N 159', district: 'CENTRO', city: 'SAO BENEDITO DO SUL - PE', coupons: 7 },
{ id: '79636527415', name: 'JOSE ANDRE DOS SANTOS FILHO', phone: '081 992874147', address: 'RUA PROFR NIVALDO MAURICIO SANROS ,N 77', district: 'CENTRO', city: 'QUIPAPA - PE', coupons: 5 },
{ id: '79928331472', name: 'MARIA LUISA DE ARAUJO RAMOS', phone: '081 997630448', address: 'RUA VANDERBIG DIAS BEZERRA ,N 620', district: 'SAO MIGUEL', city: 'SANTA CRUZ DO CAPIBARIBE - PE', coupons: 8 },
{ id: '80834353415', name: 'MARIA LUZINETE DOS SANTOS', phone: '81 9 91882850', address: 'RUA DO CEMITERIO, S/N', district: 'SANTO AMARO', city: 'SIRINHAEM - PE', coupons: 1 },
{ id: '81070004472', name: 'CLAUDIO JOSE DA SILVA', phone: '081 982180552', address: 'ENGENHO SAUEZINHO', district: 'ZONA RURAL', city: 'TAMANDARE - PE', coupons: 11 },
{ id: '82360715453', name: 'ILDO PEDRO CAVALCANTI JUNIOR', phone: '081 985973899', address: 'RUA MANOEL BRAGA , 126', district: 'SANTA LUZIA', city: 'PALMARES - PE', coupons: 15 },
{ id: '82448850410', name: 'MARIA VALQUIRIA DA SILVA MELO', phone: '081 9 85392293', address: '3 TRAV MARIO DOMINGOS N30', district: 'COHAB', city: 'RIBEIRAO - PE', coupons: 13 },
{ id: '86374249453', name: 'ROSA MARIA DA SILVA', phone: '81 9 95103158', address: 'RUA GETULIO VARGAS, 145', district: 'COHAB', city: 'RIBEIRAO - PE', coupons: 1 },
{ id: '90016432487', name: 'DEURENI ANIBAL DA SILVA', phone: '81998981769', address: 'RUA PADRE JOSE LEAO, 24', district: 'JOAO MURILO', city: 'PRIMAVERA - PE', coupons: 1 },
{ id: '97284416491', name: 'NEDJA MARIA NICOLAU DA SILVA', phone: '81 9 9698-5152', address: 'RUA JOSE EVANGELISTA DE SOUSA, N 660', district: 'CENTRO', city: 'RIO FORMOSO - PE', coupons: 3 },
{ id: '97490784468', name: 'JOSE DE ARAUJO BARROS', phone: '8,10983E+11', address: 'RUA DA FLORESTA .N 43', district: 'VILA SAUE', city: 'TAMANDARE - PE', coupons: 11 },
{ id: '99882981453', name: 'CICERO PEDRO SILVA DE LIMA', phone: '81 9 82868533', address: 'RUA MARIA LEOPOLDINA, 36', district: 'VILA JOSE MARIANO', city: 'RIBEIRAO - PE', coupons: 40 },
        ]
    }

    componentWillMount() {
        this.refCli = firebase.database().ref('clients')

        let updates = {}

        for(let client of this.state.clients) {
            updates[client.id] = client
        }

        // gravar no firebase
        this.refCli.update(updates);

        this.setState({ status: 'finish' })
    }

    render() {
        return (
            <div>{this.state.status}</div>
        )
    }
}

export default AtualizaRegistros