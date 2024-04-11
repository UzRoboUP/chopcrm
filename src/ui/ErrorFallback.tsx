import GlobalStyles from "../styles/GlobalStyles.ts";

type ErrorFallbackProps = {
  error: Error,
  resetErrorBoundary: () => void
};
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <>
      <GlobalStyles />
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </>
  );
}

export default ErrorFallback;
