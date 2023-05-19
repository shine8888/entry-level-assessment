import { SessionDataProps, SessionResponse } from '../types';

export const getFilteredData = ({
  status = '',
  short_title = '',
  data = [],
}: SessionDataProps): SessionResponse[] =>
  data
    .filter(
      ({ status: sessionStatus, program }: SessionResponse) =>
        sessionStatus.includes(status) &&
        program.short_title.includes(short_title)
    )
    .sort((a, b) => b.start_date.localeCompare(a.start_date))
    .slice(0, 50);
