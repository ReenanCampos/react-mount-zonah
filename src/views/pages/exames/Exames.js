
import {React, useState ,useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CJumbotron,
  CRow,
  CEmbed,
  CEmbedItem,
  CWidgetIcon,CFormGroup,CLabel,CInput,CForm, CSelect
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import CIcon from '@coreui/icons-react'

import { cilPencil, cilSettings, cilFindInPage } from '@coreui/icons'

import BetaHCG from './forms/BetaHCG'
import {BetaHCGPdf} from "./pdf/BetaHCG";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";


const Exames = () => {

  const [ehExportavelPaciente, setEhExportavelPaciente] = useState(false);
  const [ehExportavelExame, setEhExportavelExame] = useState(false);
  const [paciente, setPaciente] = useState({nome:'', idade:'', cpf:'', telefone: ''})
  const [exameData, setExameData] = useState({});
  const [exameSelecionadoOption, setExameSelecionadoOption] = useState(1);
  const [exameSelecionado, setExameSelecionado] = useState({id: 1, label:'', component: null});

  function handleExamChange(oldValue, value){ setExameData({...oldValue, ...value}); }
  function handleEhExportavelExame(value){ setEhExportavelExame(value); }

  const examesList = [
    {
      id:1,
      label: '',
      component: {}
    },
    {
      id:2, 
      label: 'Beta HCG', 
      component: <BetaHCG exameData={exameData} handleExamChange={handleExamChange} handleEhExportavelExame={handleEhExportavelExame} />
    },
    {
      id:3, 
      label: 'Aquidade Visual', 
      component: {}
    },
  ];

  function verifyRequiredFields(obj){
    var resposta = true;

    // Nome
    if(!obj.hasOwnProperty("nome")) resposta = false;
    else if(!obj.nome) resposta = false;
    else if(obj.nome.length < 3) resposta = false;

    // Idade
    if(!obj.hasOwnProperty("idade")) resposta = false;
    else if(!obj.idade) resposta = false;
    else if(obj.idade < 0) resposta = false;
    
    // CPF
    if(!obj.hasOwnProperty("cpf")) resposta = false;
    else if(!obj.cpf) resposta = false;
    else if(obj.cpf.length < 0) resposta = false;

    // Telefone
    if(!obj.hasOwnProperty("telefone")) resposta = false;
    else if(!obj.telefone) resposta = false;
    else if(obj.telefone < 0) resposta = false;

    return resposta;
  }

  // Trigger pra verificar se form paciente está minimamente valido (campos obrigatórios)
  useEffect(() =>{
    setEhExportavelPaciente(verifyRequiredFields(paciente))
  }, [paciente]);


  function handleChange(event){
    setExameSelecionadoOption(event.target.value);
    const optionSelected = examesList.find(exam => exam.id === Number(event.target.value));
    setExameData({});
    setExameSelecionado(optionSelected);
  }

  function choosePDF(id){
    var pdf = <></>;
    if(id === 2) pdf = <BetaHCGPdf data={{exame: exameData, paciente: paciente}} />;

    return pdf;
  }

  function choosePDFFileName(id){
    var pdfFileName = "Invalido";
    if(id === 2) pdfFileName = "BetaHCG";

    return pdfFileName + ".pdf";
  }

  //------

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: '50px', marginTop: '30px'}}>
                
                  <h1> <CIcon name="cil-find-in-page" width={30} style={{marginBottom: '8px'}} /> Exames</h1>
              </div>
            </CCardBody>
            <CCardHeader>
            Paciente
            </CCardHeader>
            <CCardBody>
              
              <CRow style={{justifyContent: 'space-around'}}>
                <CCol lg="7" md="12">

                  <CForm action="" className="form-horizontal">

                    <CFormGroup row>
                      <CLabel sm="2" col htmlFor="input-normal">Nome</CLabel>
                      <CCol sm="5" >
                        <CInput id="input-normal" name="input-normal" value={paciente.nome} onChange={e=>setPaciente({...paciente, nome: e.target.value})} />
                      </CCol>
                      <CLabel sm="2" col htmlFor="input-normal">Idade</CLabel>
                      <CCol sm="2" >
                        <CInput id="input-normal" name="input-normal" value={paciente.idade} onChange={e=>setPaciente((prevState) => ({...prevState, idade: e.target.value}))} />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CLabel sm="2" col htmlFor="input-normal">CPF</CLabel>
                      <CCol sm="3">
                        <CInput id="input-normal" name="input-normal" value={paciente.cpf} onChange={e=>setPaciente({...paciente, cpf: e.target.value})} />
                      </CCol>
                      <CLabel md="1" className="d-sm-down-none" col htmlFor="input-normal"></CLabel>

                      <CLabel sm="2" col htmlFor="input-normal">Telefone</CLabel>
                      <CCol sm="3">
                        <CInput id="input-normal" name="input-normal" value={paciente.telefone} onChange={e=>setPaciente({...paciente, telefone: e.target.value})}  />
                      </CCol>
                    </CFormGroup>
                    
                    <CFormGroup row>
                      <CCol sm="2">
                        <CLabel htmlFor="select">Exame</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CSelect custom onChange={(e) => handleChange(e)} value={exameSelecionadoOption}>
                          {examesList.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.label}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CFormGroup>

                  </CForm>
                
                </CCol>
              </CRow>

            </CCardBody>
            <CCardHeader>
            {exameSelecionado.id !== 1 ? 'Exame ' + exameSelecionado.label : ''}
            </CCardHeader>
            {exameSelecionado.id !== 1 ? exameSelecionado.component : <></>} 

            {exameSelecionado.id !== 1 && 
            <>
              <CCardHeader>
                Gerar Exame
              </CCardHeader>
              <CCardBody>
                <CRow className="align-items-center justify-content-center">
                  <CCol col="6" sm="4" md="2" className="mb-3 mb-xl-0">
                    {/* <CButton block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg" disabled={!ehExportavel} onClick={() => exportExam()}>Gerar exame</CButton> */}
                    {(ehExportavelPaciente && ehExportavelExame) ? (
                      <PDFDownloadLink
                        document={choosePDF(exameSelecionado.id)}
                        fileName={choosePDFFileName(exameSelecionado.id)}
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? "Aguarde ... " : <CButton block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg" disabled={!ehExportavelPaciente && ehExportavelExame}>Gerar PDF</CButton> 
                        }
                      </PDFDownloadLink>
                    ) : (
                      <CButton block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg" disabled={true}>Gerar PDF</CButton> 
                    )}
                  </CCol>
                </CRow>
              </CCardBody>
            </>}

          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Exames
