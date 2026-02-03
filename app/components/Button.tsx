"use client";

interface Props {
  label: string;
  onClick: () => void;
  color: "btn-primary" | "btn-secondary" | "btn-neutral";
}

const Button = ({ label, onClick, color }: Props) => {
  return (
    <button onClick={onClick} className={color}>
      {label}
    </button>
  );
};

export default Button;
