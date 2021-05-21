import toast from "react-hot-toast";
import api from "../../services/api";

export const cancelSchedule = (key) => {
  api
    .put(`/schedule/${key}`, {
      status: false,
    })
    .then((res) => {
      return toast.success(res.data.message);
    })
    .catch((err) => {
      if (err.response || err.response.data === 400 || 401) {
        return toast.error(err.response.data.message);
      }
    });
};

export const confirmationToast = (props) => {
  toast((t) => (
    <div className="text-center">
      <p>Você tem certeza que deseja cancelar?</p>
      <button
        className="btn btn-secondary btn-sm me-2"
        onClick={() => toast.dismiss(t.id)}
      >
        Cancelar
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => cancelSchedule(props)}
      >
        Confirmar
      </button>
    </div>
  ));
};
