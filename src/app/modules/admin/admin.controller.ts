import { RequestHandler } from 'express';

import { AdminService } from './admin.service';


const createAdmin: RequestHandler = async (req, res, next) => {

  try {
    const admin = req.body
    const result = await AdminService.createAdmin(admin)
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Admin Created Successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}




export const AdminController = {
  createAdmin,
};
