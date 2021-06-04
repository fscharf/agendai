import React from "react";
import { Button } from "react-bootstrap";
import { useToast } from "izitoast-react";

export default function ConfirmationToast(props) {
  const confirm = useToast({
    title: "Tem certeza que deseja prosseguir?",
    overlay: true,
    timeout: 0,
    position: "topCenter",
    buttons: [
      [`<button><b>Sim</b></button>`, props.onClick, null],
      [
        "<button>Não</button>",
        (instance, toast) => {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
        },
      ],
    ],
  });

  return (
    <Button
      title={props.title}
      size={props.size}
      variant={props.variant}
      onClick={confirm}
    >
      {props.actionTitle}
    </Button>
  );
}
