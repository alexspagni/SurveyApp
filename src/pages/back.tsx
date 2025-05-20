
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '8px 12px',
        fontSize: '14px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#eee',
        cursor: 'pointer'
      }}
    >
      ← Back
    </button>
  );
}

export default BackButton;