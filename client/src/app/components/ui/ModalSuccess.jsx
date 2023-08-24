import { React } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export function ModalBasketComponent(props) {
  const product = [
    { name: "Турник", count: 2 },
    { name: "Брусья", count: 1 },
  ];
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ваш заказ успешно оформлен!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {product.map((item) => (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {item.name}
              <span class="badge bg-primary rounded-pill">{item.count}</span>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
