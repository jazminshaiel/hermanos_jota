import { useEffect } from "react";
import "../styles/notification-toast.css";

function NotificationToast({ mensaje, mostrar, onCerrar }) {
  useEffect(() => {
    if (mostrar) {
      const timer = setTimeout(() => {
        onCerrar();
      }, 3000); // Se oculta automáticamente después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [mostrar, onCerrar]);

  if (!mostrar) return null;

  return (
    <div className={`notification-toast ${mostrar ? "mostrar" : ""}`}>
      <div className="notification-content">
        <div className="notification-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="notification-mensaje">{mensaje}</span>
        <button
          className="notification-close"
          onClick={onCerrar}
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default NotificationToast;

