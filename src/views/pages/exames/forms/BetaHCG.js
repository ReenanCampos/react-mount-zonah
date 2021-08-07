
import {React, useState, useEffect} from 'react'
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
  CWidgetIcon,CFormGroup,CLabel,CInput,CForm, CSelect,CSwitch, CInputCheckbox
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import CIcon from '@coreui/icons-react'

import { cilPencil, cilSettings, cilFindInPage } from '@coreui/icons'



const BetaHCG = ({exameData, handleExamChange, handleEhExportavelExame}) => {

  const [objData, setObjData] = useState({fracao:0, resultado: "Negativo", gestacao: {id:1 ,label: ' - ', valorMin: 0, valorMax: 0}});
  const [duvidoso, setDuvidoso] = useState(false);
  const [switchResultado, setSwitchResultado] = useState(false);
  const [sugestaoTxt, setSugestaoTxt] = useState('Sem sugestões');
  const [valorGestacaoSelecionadoOption, setValorGestacaoSelecionadoOption] = useState({});
  const [valorGestacaoSelecionado, setValorGestacaoSelecionado] = useState({});
  const valoresGestacao =[
    {id:1 ,label: ' - ', valorMin: 0, valorMax: 0},
    {id:2 ,label: '3-4 Semanas', valorMin: 5.8, valorMax: 71.2},
    {id:3 ,label: '4-5 Semanas', valorMin: 9.5, valorMax: 750.0},
    {id:4 ,label: '5-6 Semanas', valorMin: 217.0, valorMax: 7138.0},
    {id:5 ,label: '6-7 Semanas', valorMin: 158.0, valorMax: 31795.0},
    {id:6 ,label: '7-12 Semanas', valorMin: 3697.0, valorMax: 186977.0},
    {id:7 ,label: '12-16 Semanas', valorMin: 27832.0, valorMax: 70971.0},
    {id:8 ,label: '16-29 Semanas', valorMin: 9040.0, valorMax: 42971.0},
  ]

  function handleCheckboxDuvidoso(){
    setDuvidoso(!duvidoso);
    if(!duvidoso) setObjData({...objData, resultado: "Duvidoso"})
    else{
      if(!switchResultado) setObjData({...objData, resultado: "Negativo"})
      if(switchResultado) setObjData({...objData, resultado: "Positivo" })
    }
  }

  function handleExamChangeChild(e){
    handleExamChange(e);
  }

  function handleSwitchResultado(e){
    setSwitchResultado(!switchResultado);
    if(switchResultado) setObjData({...objData, resultado: "Negativo"})
    if(!switchResultado) setObjData({...objData, resultado: "Positivo" })
  }

  function handleChange(event){
    setValorGestacaoSelecionadoOption(event.target.value);
    const optionSelected = valoresGestacao.find(exam => exam.id === Number(event.target.value));
    setValorGestacaoSelecionado(optionSelected);
  }

  function suggestValue(fracaoBeta){
    if(!fracaoBeta){
      setSugestaoTxt('Sem sugestões');
      return;
    }
    fracaoBeta = Number(fracaoBeta);
    if(fracaoBeta < 5.8){
      setSugestaoTxt('Sem sugestões');
      return;
    }
    const sugestoes = valoresGestacao.filter(gest => fracaoBeta >= gest.valorMin && fracaoBeta <= gest.valorMax && gest.valorMin !== 0);
    setSugestaoTxt(sugestoes.length === 0 ? "Sem sugestões" : sugestoes.map(x=>x.label).join(", "));
  }

  function verifyRequiredFields(obj){
    var resposta = true;

    // Fracao
    if(!obj.hasOwnProperty("fracao")) resposta = false;
    else if(!obj.fracao) resposta = false;
    else if(obj.fracao < 0) resposta = false;

    // Gestacao
    if(!obj.hasOwnProperty("gestacao")) resposta = false;
    else if(!obj.gestacao) resposta = false;

    return resposta;
  }

  useEffect(() => {
    setObjData({id: 1, label: 'Exame de BetaHCG', gestacao: {id:1 ,label: ' - ', valorMin: 0, valorMax: 0} }); 
    handleChange({target:{value:1}});
  }, [])

  // Trigger pra verificar se form exame está minimamente valido (campos obrigatórios)
  useEffect(() =>{
    handleExamChangeChild(objData);
    handleEhExportavelExame(verifyRequiredFields(objData))
  }, [objData]);

  useEffect(() =>{
    setObjData({...objData, gestacao: valorGestacaoSelecionado})
  }, [valorGestacaoSelecionado]);

  return (
    <CCardBody>
      <CRow style={{justifyContent: 'space-around'}}>
        <CCol lg="7" md="12">

            <CForm action="" className="form-horizontal">
            <CFormGroup row>
              <CLabel sm="2" col htmlFor="input-normal">Fração Beta*</CLabel>
              <CCol sm="5" >
                <CInput id="input-normal" name="input-normal" value={exameData.fracao} onChange={e=>{setObjData({...objData,fracao: e.target.value}); suggestValue(e.target.value);}} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CLabel sm="2" col htmlFor="input-normal">Resultado</CLabel>
              <CCol sm="2" style={{paddingTop: '5px' }}>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox 
                    custom 
                    id="inline-checkbox2" 
                    name="inline-checkbox2" 
                    value="option1" 
                    checked={duvidoso}
                    onChange={e=>handleCheckboxDuvidoso()}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">Duvidoso</CLabel>
                </CFormGroup> 
              </CCol>
              <CCol sm="1" >
                {!duvidoso && <CSwitch
                  size="lg"
                  className="mr-1"
                  color="success"
                  shape="pill"
                  checked={switchResultado}
                  onChange={e=>handleSwitchResultado()}
                />}
              </CCol>
              {!duvidoso && <CLabel sm="2" col htmlFor="input-normal">{switchResultado ? "Positivo" : "Negativo"}</CLabel>}
              
              
              
            </CFormGroup>
            
            <CFormGroup row>
              <CCol sm="2">
                <CLabel htmlFor="select">Gestação</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom onChange={(e) => handleChange(e)} value={valorGestacaoSelecionadoOption}>
                    {valoresGestacao.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.label}
                    </option>
                    ))}
                </CSelect> 
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol sm="2">
                <small>Sugestão: </small>
              </CCol>
              <CCol sm="10">
                <small> {sugestaoTxt}</small>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CLabel sm="12" col htmlFor="input-normal">Descrição do Resultado:</CLabel>
              <CCol sm="12" >
                <CInput id="input-normal" name="input-normal" value={exameData.descricao} onChange={e=>setObjData({...objData, descricao: e.target.value})} />
              </CCol>
            </CFormGroup>

          </CForm>
        
        </CCol>
        </CRow>

    </CCardBody>
  )
}

export default BetaHCG
