class ValidationError extends Error {}

const handleError = (err, req, res, next) => {
  // Jeżeli w moim programie byłaby możliwość, że wchodzimy do elementu, który nie istnieje to przydałby się taki kod:
  /*
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                message: "Nie można znaleźć elementu o podanym ID",
            });
        return;
     }
     */
  console.error(err);
  res
    .status(err instanceof ValidationError ? 400 : 500)
    .render('error', {
      message: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie później',
    });
  // GDY TO ZNANY NAM BLAD TO PODAJEMY err.message. W INNYM WYPADKU PODAJEMY tekst
  // TO JEST WAZNE Z PUNKTU BEZPIECZENSTWA
};

module.exports = {
  handleError,
  ValidationError,
};
