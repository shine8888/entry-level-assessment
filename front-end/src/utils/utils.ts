import { SESSION_DATA_URL } from '../constants';
import { SessionDataProps, SessionResponse } from '../types/types';
import * as DateFns from 'date-fns';

export const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const fetchSessionData = async ({
  status = '',
  shortTitle = '',
}: SessionDataProps) => {
  const url = `${SESSION_DATA_URL}?status=${status}&short_title=${shortTitle}`;

  return await fetch(url).then((res) => res.json());
};

export const getFilteredData = ({
  status = '',
  shortTitle = '',
  data = [],
}: SessionDataProps): SessionResponse[] => {
  return data.filter(
    ({ status: sessionStatus, program }: SessionResponse) =>
      sessionStatus.includes(status) && program.short_title.includes(shortTitle)
  );
};

export const formatDate = (date: string) =>
  DateFns.format(new Date(date), 'dd MMM yy');
