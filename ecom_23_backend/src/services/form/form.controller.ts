import { Request, Response } from "express";
import _ from "lodash";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import Form, { formDocument } from "../../models/form.model";
import Mongoose from "mongoose";
const nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");
import { PaginationDefaults, securityKey } from "../../config/default";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";

const ObjectId = Mongoose.Types.ObjectId;

const ses = new aws.SES({
  accessKeyId: securityKey.aws_access_key_id,
  secretAccessKey: securityKey.aws_secret_access_key,
  region: "ap-south-1",
  apiVersion: "2010-12-01",
});

export const createForm = async (req: Request, res: Response) => {
  try {
    let params = req.body;
    let data = params as formDocument;
    //@ts-ignore
    let newForm = new Form(data);
    let FormData: any = await newForm.save().catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });

        // let adminMailId = ["vinsha@rookie-ninja.com", "rnvysakh@gmail.com"];
        let adminMailId = "vinsha@rookie-ninja.com";

        let transporter = nodemailer.createTransport({
          SES: { ses, aws },
        });

            // To Admin
    const __dirname = path.resolve();
    const filePath = path.join(__dirname, "/email/contact-form-admin.html");
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      name: params.name,
      email: params.email,
      phone: params.phone,
      company: params.company,
      message: params.message,
    };

    const htmlToAdmin = template(replacements);

    let emailBody, emailType;

    emailType = "Sales Enquiry Form";

    emailBody = `
      <h4>You got a response from sales enquiry form</h4>
      <hr/>
      
      <h4>
      Name : ${params.name}<br/>
      Email : ${params.email} <br/>
      Phone : ${params.phone} <br/>
      Website : ${params.company ? params.company : ""} <br/>
      Message : ${params.message} <br/>
      
      </h4>
      `;

    // To Client
    const filePathCllientMail = path.join(
      __dirname,
      "/email/sales-enquiry-form-client.html"
    );
    const sourceClientMail = fs
      .readFileSync(filePathCllientMail, "utf-8")
      .toString();
    const templateCllientMail = handlebars.compile(sourceClientMail);
    const replacementsClientmail = {
      name: params.name,
    };
    const htmlToClient = templateCllientMail(replacements);
    let mailToClient = {
      from: "Rookie Nija <no-reply@rookie-ninja.com> ",
      to: params.email,
      subject: `Thanks for contacting us.`,
      html: htmlToClient,
    };

    transporter.sendMail(mailToClient, function (err, info) {
      if (err) {
        console.log("Error on sending to client");
        console.log(err);
      } else {
        console.log("Email sent to client: " + info.response);
      }
    });

        // To Admin

        let mailToAdmin: any = {
          from: "Rookie Ninja <no-reply@rookie-ninja.com> ",
          to: adminMailId,
          subject: `You got a new response for ${emailType}`,
          html: htmlToAdmin,
        };
    
        transporter.sendMail(mailToAdmin, function (err, info) {
          if (err) {
            console.log("Error on sending to admin");
    
            console.log(err);
          } else {
            console.log("Email sent to admin: " + info.response);
          }
        });
    //     return res
    //     .status(200)
    //     .send(
    //       httpRes({ code: 200, message: "Form submited success", data: formData })
    //     );
    // } catch (e: any) {
    //   log.error(e);
    //   return res.status(500).send(httpRes({ code: 500, message: e }));
    // }




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


