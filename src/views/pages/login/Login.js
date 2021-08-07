import {React, useState} from 'react'
import { Link, Redirect, useHistory} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLabel,
  CFormGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import Auth from '../../../components/Auth';
import { useCookies } from 'react-cookie';

const Login = () => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [errorLogin, setErrorLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function singin(){
    
    Auth.authenticate(email, password)
      .then(response => {
        setCookie('user', response.data, {path: '/'})
        history.push("/");
      })
      .catch(error => {
        removeCookie('user');
        setErrorLogin(true);
    });
  }
  function singout(){
    removeCookie('user')
    Auth.signout();
    history.push("/login");
  }

  return (
    <div className="c-default-layout flex-row align-items-center">
        <CRow className="justify-content-center">
          <CCol md="12">
            <CCardGroup style={{height: '100vh'}}>

              <CCard className="text-white py-5 d-md-down-none" style={{ width: '44%', backgroundColor: '#002F63'}}>
                <CCardBody className="text-center">
                  <div>
                  </div>
                </CCardBody>
              </CCard>
              
              <CCard className="p-4" style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <CCardBody style={{maxWidth: '50%', paddingBottom: '25%'}}>
                  <CForm>
                    <img src="./logo.png" alt="..." style={{width: '115%', marginLeft: '-10%', marginBottom: '15%'}}></img>
                    <CFormGroup row>
                      <CLabel sm="4" md="4" lg="2" col htmlFor="input-normal">Email</CLabel>
                      <CCol  sm="8" md="8" lg="10">
                        <CInput type="text" invalid={errorLogin} placeholder="Email" autoComplete="email"
                          onChange={e => {setEmail(e.target.value); setErrorLogin(false);}} />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CLabel sm="4" md="4" lg="2" col htmlFor="input-normal">Senha</CLabel>
                      <CCol sm="8" md="8" lg="10">
                      <CInput type="password" invalid={errorLogin} placeholder="Password" autoComplete="current-password" 
                        onChange={e => {setPassword(e.target.value); setErrorLogin(false)}} />
                      </CCol>
                    </CFormGroup>
                    <br></br>
                    <CFormGroup row>
                      <CCol xs="12">
                        <CButton size="lg" block onClick={() =>singin()} style={{backgroundColor: '#002F63', color:'white'}}>Entrar</CButton>
                      </CCol>
                    </CFormGroup>

                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
    </div>
  )
}

export default Login
