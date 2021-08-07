import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    height: "100%",
    width: "100%"
  },
  page: {},
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 2
  },
  movieContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5
  },
  movieDetails: {
    display: "flex",
    marginLeft: 5
  },
  movieTitle: {
    fontSize: 15,
    marginBottom: 10
  },
  movieOverview: {
    fontSize: 10
  },

  image: {
    height: 200,
    width: 150
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12
  },
  vote: {
    display: "flex",
    flexDirection: "row"
  },
  rating: {
    height: 10,
    width: 10
  },
  vote_text: {
    fontSize: 10
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    color: "#fff"
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4
  },
  overviewContainer: {
    minHeight: 100
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "row"
  },
  lang: {
    fontSize: 8,
    fontWeight: 700
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: "bold"
  },

  pacienteContainer: {
    display: "flex",
    flexDirection: "row"
  },
  pacienteNome: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingTop: 30,
    paddingLeft: 30,
    width: 240
  },
  pacienteData: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingTop: 30,
    paddingLeft: 80
  },
  pacienteCPF: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingLeft: 30,
    width: 240
  },
  pacienteSolicitante: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingLeft: 80,
    paddingTop: 5
  },
  pacienteIdade: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingLeft: 30,
    paddingTop: 5,
    width: 240
  },
  pacienteProtocolo: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingLeft: 80,
    paddingTop: 5
  },
  pacienteFone: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingLeft: 30,
    width: 240,
    paddingTop: 7
  },
  pacienteLabel: {
    fontWeight: "bold",
    fontSize: 16,
    width: 80
  },
  pacienteValue: {
    paddingLeft: 5,
    fontSize: 13
  },
  firstSpace: {
    padding: 30,
    paddingTop: 120
  },
  divider: {
    margin: 20,
    borderTop: "3pt solid #bbb"
  },
  divider2: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderTop: "3pt solid #bbb"
  },

  exameContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#d3dde9",
    margin: 30,
    marginTop: 0,
    marginBottom: 0
  },
  exameCabecalho: {
    margin: 10,
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingTop: 5,
    width: 255
  },
  exameCabecalho2: {
    margin: 10,
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingTop: 5
  },
  exameLabel: {
    fontWeight: "bold",
    fontSize: 16,
    width: 80
  },
  exameValue: {
    fontSize: 13
  },
  exameValue2: {
    fontSize: 13,
    width: 400
  },
  exameTecnicoContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#d3dde9",
    margin: 30,
    marginTop: 0,
    marginBottom: 0,
    padding: 0
  },
  exameTecnicoCabecalho: {
    margin: 10
  },
  exameTecnicoLabel: {
    fontWeight: "bold",
    fontSize: 16
  },
  exameTecnicoValue: {
    fontSize: 13
  },
  valorReferenciaContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#e4e9f0",
    margin: 30,
    marginTop: 0,
    marginBottom: 0
  },
  valorReferenciaContainer2: {
    display: "flex",
    flexDirection: "row",
    margin: 30,
    marginTop: 0,
    marginBottom: 0
  },
  valorReferenciaLabel: {
    fontSize: 15,
    paddingTop: 3,
    paddingBottom: 3
  },
  valorReferenciaLabel2: {
    fontSize: 13,
    paddingTop: 4
  },
  valorReferenciaValue: {
    fontSize: 11
  },
  gestacaoContainer: {
    display: "flex",
    flexDirection: "row"
  },
  gestacaoLabel: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingTop: 5,
    width: 100,
    fontSize: 11
  },
  gestacaoValue: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "start",
    paddingTop: 5,
    fontSize: 11
  }
});

export function BetaHCGPdf(props) {
  console.log("pdf props", props.data);
  const data = props.data;
  const paciente = data.paciente;
  
  const exame = data.exame;
  const gestacao = exame.gestacao ? exame.gestacao : {};

  return (
    <Document>
      <Page style={styles.page}>
        
        <Image
        src="https://i.imgur.com/iy5I9cb.png"
        // src="./logo.png"
          style={styles.pageBackground}
        />

        <View style={styles.firstSpace} />

        <View style={styles.pacienteContainer}>
          <View style={styles.pacienteNome}>
            <Text style={styles.pacienteLabel}>Paciente:</Text>
            <Text style={styles.pacienteValue}> {paciente.nome || ""} </Text>
          </View>
          <View style={styles.pacienteData}>
            <Text style={styles.pacienteLabel}>Data:</Text>
            <Text style={styles.pacienteValue}>
              {moment(moment(), "YYYY-MM-DD").format("DD/MM/YYYY, HH:mm")}
            </Text>
          </View>
        </View>

        <View style={styles.pacienteContainer}>
          <View style={styles.pacienteCPF}>
            <Text style={styles.pacienteLabel}>CPF:</Text>
            <Text style={styles.pacienteValue}> {paciente.cpf} </Text>
          </View>
          <View style={styles.pacienteSolicitante}>
            <Text style={styles.pacienteLabel}>Solicitante:</Text>
            <Text style={styles.pacienteValue}>Dra. Olivia</Text>
          </View>
        </View>

        <View style={styles.pacienteContainer}>
          <View style={styles.pacienteFone}>
            <Text style={styles.pacienteLabel}>Fone:</Text>
            <Text style={styles.pacienteValue}> {paciente.telefone} </Text>
          </View>
          <View style={styles.pacienteProtocolo}>
            <Text style={styles.pacienteLabel}>Protocolo:</Text>
            <Text style={styles.pacienteValue}>
              {moment(moment(), "YYYY-MM-DD").format("YYMDHHmmSSS")}
            </Text>
          </View>
        </View>

        <View style={styles.pacienteContainer}>
          <View style={styles.pacienteIdade}>
            <Text style={styles.pacienteLabel}>Idade:</Text>
            <Text style={styles.pacienteValue}> {paciente.idade} </Text>
          </View>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.exameTecnicoContainer}>
          <View style={styles.exameTecnicoCabecalho}>
            <Text style={styles.exameTecnicoLabel}>Exame:</Text>
            <Text style={styles.exameTecnicoValue}>
              Dosagem Sérica de BHCG - Gonadotrofina Coriônica - Fração Beta
            </Text>
          </View>
        </View>
        <View style={styles.exameContainer}>
          <View style={styles.exameCabecalho}>
            <Text style={styles.exameLabel}>Resultado:</Text>
            <Text style={styles.exameValue2}> {`Fração Beta: `+exame.fracao+`  |  `+gestacao.label+`  |  `+exame.resultado}</Text>
          </View>
        </View>
        <View style={styles.exameTecnicoContainer}>
          <View style={styles.exameTecnicoCabecalho}>
            <Text style={styles.exameTecnicoLabel}>Descritivo:</Text>
            <Text style={styles.exameTecnicoValue}>
              {exame.descricao}
            </Text>
          </View>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.valorReferenciaContainer}>
          <View style={styles.exameTecnicoCabecalho}>
            <Text style={styles.valorReferenciaLabel}>
              Valores de Referência
            </Text>
            <Text style={styles.valorReferenciaLabel2}>Feminino</Text>
            <Text style={styles.valorReferenciaValue}>
              {"Não Gestante         Neg. ou < 5 mIU/mL"}
            </Text>
            <Text style={styles.valorReferenciaValue}>
              {"Duvidoso                5 a 25 mUI/mL"}
            </Text>
            <Text style={styles.valorReferenciaValue}>
              {"Gestante                Pos. ou > 25 mIU/mL"}
            </Text>

            <Text style={styles.valorReferenciaLabel2}>Masculino</Text>
            <Text style={styles.valorReferenciaValue}>{"Indetectável"}</Text>
          </View>
        </View>

        <View style={styles.divider2}></View>

        <View style={styles.valorReferenciaContainer2}>
          <View style={styles.exameTecnicoCabecalho}>
            <Text style={styles.valorReferenciaLabel}>Tempo de Gestação</Text>

            <View style={styles.gestacaoContainer}>
              <View style={styles.gestacaoLabel}>
                <Text>3-4 Semanas</Text>
              </View>
              <View style={styles.gestacaoValue}>
                <Text>0 - 130 mIU/mL</Text>
              </View>
            </View>

            <View style={styles.gestacaoContainer}>
              <View style={styles.gestacaoLabel}>
                <Text>4-5 Semanas</Text>
              </View>
              <View style={styles.gestacaoValue}>
                <Text>75 - 2.600 mIU/mL</Text>
              </View>
            </View>

            <View style={styles.gestacaoContainer}>
              <View style={styles.gestacaoLabel}>
                <Text>5-6 Semanas</Text>
              </View>
              <View style={styles.gestacaoValue}>
                <Text>850 - 20.800 mIU/mL</Text>
              </View>
            </View>

            <View style={styles.gestacaoContainer}>
              <View style={styles.gestacaoLabel}>
                <Text>6-7 Semanas</Text>
              </View>
              <View style={styles.gestacaoValue}>
                <Text>4.000 - 100.200 mIU/mL</Text>
              </View>
            </View>

            <View style={styles.gestacaoContainer}>
              <View style={styles.gestacaoLabel}>
                <Text>7-12 Semanas</Text>
              </View>
              <View style={styles.gestacaoValue}>
                <Text>11.500 - 289.000 mIU/mL</Text>
              </View>
            </View>

            <View style={styles.gestacaoContainer}>
              <View style={styles.gestacaoLabel}>
                <Text>12-16 Semanas</Text>
              </View>
              <View style={styles.gestacaoValue}>
                <Text>18.300 - 137.000 mIU/mL</Text>
              </View>
            </View>

            <View style={styles.gestacaoContainer}>
              <View style={styles.gestacaoLabel}>
                <Text>16-29 Semanas</Text>
              </View>
              <View style={styles.gestacaoValue}>
                <Text>1.400 - 53.000 mIU/mL</Text>
              </View>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
}
