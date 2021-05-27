import React from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

export default function ConfirmationToast(props) {
  const confirm = () =>
    toast((t) => (
      <div className="text-center p-3">
        <p>Você tem certeza que deseja cancelar?</p>
        <button
          className="btn btn-light btn-sm me-2"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancelar
        </button>
        <button className="btn btn-primary btn-sm" onClick={props.onClick}>
          Confirmar
        </button>
      </div>
    ));

  return (
    <Button size={props.size} variant={props.variant} onClick={confirm}>
      {props.actionTitle}
    </Button>
  );
}
