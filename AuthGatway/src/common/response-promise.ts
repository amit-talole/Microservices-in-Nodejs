type verifyTokenResponse = {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

type apiResponseType = {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
};
export { verifyTokenResponse, apiResponseType };
