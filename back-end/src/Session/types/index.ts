import { Response } from 'express';
import { HttpStatus } from 'http-status';

interface SessionProgram {
  id: string;
  display_title: string;
  thumbnail_img_url: string;
  short_title: string;
}

export interface ISession {
  id: string;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface SessionQuery extends ISession {
  program: SessionProgram[];
}

export interface SessionResponse extends ISession {
  program: SessionProgram;
}

export interface SessionDataProps {
  short_title?: string;
  status?: string;
  data?: SessionResponse[];
}

export interface GetSessionDataResponse {
  res: Response;
  status: HttpStatus;
  data: SessionQuery[];
}
