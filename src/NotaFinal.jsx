import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './index.css';

const NotaFinal = () => {
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');

  const validarNotas = () => {
    if (nota1 === '' || nota2 === '' || nota3 === '') {
      setAlertType('danger');
      setMensaje('Por favor, ingresa todas las notas.');
      setShowAlert(true);
      return false;
    }
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
      setAlertType('danger');
      setMensaje('Las notas deben ser números.');
      setShowAlert(true);
      return false;
    }
    if (nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100) {
      setAlertType('danger');
      setMensaje('Las notas deben estar entre 0 y 100.');
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const calcularNotaFinal = () => {
    if (!validarNotas()) return;

    const notaFinal = (Number(nota1) * 0.30) + (Number(nota2) * 0.30) + (Number(nota3) * 0.40);
    let nuevoMensaje = '';
    if (notaFinal >= 0 && notaFinal < 60) {
      nuevoMensaje = 'Reprobado';
      setAlertType('danger');
    } else if (notaFinal >= 60 && notaFinal < 80) {
      nuevoMensaje = 'Bueno';
      setAlertType('warning');
    } else if (notaFinal >= 80 && notaFinal < 90) {
      nuevoMensaje = 'Muy Bueno';
      setAlertType('info');
    } else if (notaFinal >= 90 && notaFinal <= 100) {
      nuevoMensaje = 'Sobresaliente';
      setAlertType('success');
    }
    setMensaje(nuevoMensaje);
    setShowAlert(true);
  };

  return (
    <Container className="mt-5 p-4 rounded bg-white shadow">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="mb-4 text-center">Calculadora de Notas</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Primer parcial (0-100):</Form.Label>
              <Form.Control
                type="number"
                value={nota1}
                onChange={(e) => setNota1(e.target.value)}
                max="100"
                min="0"
                placeholder="Ingresa la nota del primer parcial"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Segundo parcial (0-100):</Form.Label>
              <Form.Control
                type="number"
                value={nota2}
                onChange={(e) => setNota2(e.target.value)}
                max="100"
                min="0"
                placeholder="Ingresa la nota del segundo parcial"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tercer parcial (0-100):</Form.Label>
              <Form.Control
                type="number"
                value={nota3}
                onChange={(e) => setNota3(e.target.value)}
                max="100"
                min="0"
                placeholder="Ingresa la nota del tercer parcial"
              />
            </Form.Group>
            <Button variant="primary" onClick={calcularNotaFinal}>Calcular Nota Final</Button>
          </Form>
          {showAlert && (
            <Alert variant={alertType} className="mt-4 text-center">
              {mensaje}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NotaFinal;
