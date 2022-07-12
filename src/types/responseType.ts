export interface CustomState {
  isFetching?: boolean;
  error?: boolean;
}

export interface OptionsState {
  isFetchingCurrentMethod?: boolean;
  errorCurrentMethod?: boolean;
  isFetchingForecastMethod?: boolean;
  errorForecastMethod?: boolean;
}
export type RequestCreateTransaction = {
  mount: string;
  addres: string;
  status: string;
};
