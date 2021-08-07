
import React, { useEffect, useState } from 'react'
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
  CWidgetIcon
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import CIcon from '@coreui/icons-react'
import { useCookies } from 'react-cookie';

import { cilPencil, cilSettings, cilFindInPage } from '@coreui/icons'


const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [user, setUser] = useState(null);

  useEffect(() => {
      setUser(cookies["user"]?.user);
  },[]);

  return (
    <>
      
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: '50px', marginTop: '30px'}}>
                
                  <h1> <CIcon name="cil-institution" width={30} style={{marginBottom: '8px'}} /> Bem vindo(a) {user?.username} </h1>
              </div>
              
              <CRow className="align-items-center">
                <CCol col="6" sm="4" md="2" className="mb-3 mb-xl-0">
                  <CButton to="/exames"
                  block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg">Realizar exame</CButton>
                </CCol>
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <CButton disabled block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg"> - </CButton>
                </CCol>
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <CButton disabled block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg"> - </CButton>
                </CCol>
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <CButton disabled block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg"> - </CButton>
                </CCol>
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <CButton disabled block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg"> - </CButton>
                </CCol>
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <CButton disabled block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg"> - </CButton>
                </CCol>
                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <CButton disabled block style={{backgroundColor:'#002F63', color:'#e5e5e5'}} size="lg"> - </CButton>
                </CCol>
              </CRow>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Dashboard
