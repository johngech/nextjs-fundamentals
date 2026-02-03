"use client";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error: ", error);
  return (
    <div className="text-2xl p-10">
      <p className="text-red-400">An unexpected error has occurred.</p>
      <button onClick={() => reset()} className="btn btn-primary">
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
