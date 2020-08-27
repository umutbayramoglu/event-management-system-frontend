/**
 * Navigate to error page when error occurred.
 * @param history
 * @param error:    Error message
 */
export const navigateErrorPage = (history,error) => {
    history.push({
        pathname: '/error',
        state: { error: error }
      });
}