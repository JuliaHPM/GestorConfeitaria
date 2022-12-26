// import { useState } from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import { Col, Modal, Row } from "react-bootstrap";
import { CancelButton } from "./CancelButton";
import { PrimaryButton } from "./PrimaryButton";
import Spinner from "./Spinner";

export default function MeuModal({ show, handleClose, handleOkButtonClick, title, children, acao1, textBtn1, acao2, textBtn2, loading }) {

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {children}
      </Modal.Body>
      <Modal.Footer style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Row style={{ width: "100%" }}>
          <Col md={6} lg={6}>
            {acao1 ?
              <Link href={acao1} prefetch={false}>
                <CancelButton onClick={handleClose} text={textBtn1 ? textBtn1 : "Cancelar"} />
              </Link>
              :
              <CancelButton onClick={handleClose} text={textBtn1 ? textBtn1 : "Cancelar"} />
            }
          </Col>

          <Col md={6} lg={6}>
            {acao2 ?
              <Link href={acao2} prefetch={false} style={{ textDecoration: 'none' }}>
                <PrimaryButton label={textBtn2 ? textBtn2 : "Ok"} />
              </Link>
              :
              <PrimaryButton onClick={handleOkButtonClick}
                label={
                  loading ? <Spinner size={21} color="#FFFF" /> :
                    textBtn2 ? textBtn2 : "Ok"
                } />
            }
          </Col>
        </Row>

      </Modal.Footer>
    </Modal>

  )
}