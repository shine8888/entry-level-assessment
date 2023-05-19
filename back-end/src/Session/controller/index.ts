import { Request, Response } from 'express';
import { successHandler, errorHandler } from '../../middlewares/statusHandler';
import httpStatus from 'http-status';
import { SessionQuery, SessionDataProps } from '../types';
import RedisInstance from '../../redis/index';
import { FETCH_SESSIONS_DATA_URL } from '../constants';
import { getFilteredData } from '../utils';

const fetchSessionData = async (): Promise<SessionQuery[]> => {
  return await fetch(FETCH_SESSIONS_DATA_URL).then(
    async (res) => await res.json()
  );
};

/**
 * Get Session data
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const getSessionData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get information from req query
    const { short_title, status }: SessionDataProps = req?.query;
    // Create memokey to get/store data in Redis
    const memoKey = `${short_title}_${status}`;
    // Get data from Redis
    const memoData = await RedisInstance.getMemoData(memoKey);

    // Check if data is already save in redis => return
    if (memoData)
      return successHandler(res, httpStatus.OK, JSON.parse(memoData));

    // Get all the session data from Redis
    let allData: any = await RedisInstance.getMemoData('ALL_SESSION_DATA');

    // Check data is existed in Redis or not
    if (!allData) {
      allData = await fetchSessionData();

      await RedisInstance.memoData('ALL_SESSION_DATA', allData);
    }

    // Parse data
    const parsedData: SessionQuery[] =
      typeof allData === 'string' ? JSON.parse(allData) : allData;

    // Flatten data
    const flattenData = parsedData.flatMap(({ program, ...restProps }) =>
      program.map((p) => ({ program: p, ...restProps }))
    );

    // Filter data by: status, short_title, sort data by start_date and limit the result to 50
    const filteredData = getFilteredData({
      status,
      short_title,
      data: flattenData,
    });

    // Store data to Redis
    await RedisInstance.memoData(memoKey, filteredData);

    // Return result
    return successHandler(res, httpStatus.OK, filteredData);
  } catch (error: any) {
    console.log(error);
    errorHandler(error, res);
  }
};
