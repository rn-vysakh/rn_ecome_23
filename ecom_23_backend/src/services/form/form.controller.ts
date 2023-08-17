import { Request, Response } from "express";
import _ from "lodash";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import Form, { formDocument } from "../../models/form.model";
import Mongoose from "mongoose";

const ObjectId = Mongoose.Types.ObjectId;

export const createForm = async (req: Request, res: Response) => {
  try {
    let params = req.body;
    let data = params as formDocument;
    //@ts-ignore
    data.userId = req.user._id;
    let newForm = new Form(data);
    let FormData: any = await newForm.save().catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });

    return res.status(201).send(
      httpRes({
        code: 201,
        message: "Form Created Successfully",
        data: { _id: FormData._id },
      })
    );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};


