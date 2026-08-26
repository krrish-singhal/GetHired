import nodemailer from "nodemailer";
import Feedback from "../models/Feedback.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// GET /api/feedback  – fetch all feedbacks
export const getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(20);
  res.json(feedbacks);
};

// POST /api/feedback  – submit new feedback & send email
export const submitFeedback = async (req, res) => {
  const { name, designation, message } = req.body;

  if (!name || !designation || !message)
    return res.status(400).json({ error: "All fields are required." });

  // Save to DB
  const feedback = await Feedback.create({ name, designation, message });

  // Build styled HTML email
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; margin: 0; padding: 0; }
          .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 32px 36px; }
          .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px; }
          .body { padding: 32px 36px; }
          .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 4px; }
          .value { font-size: 15px; color: #1f2937; margin-bottom: 20px; font-weight: 500; }
          .message-box { background: #fefce8; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 16px 20px; margin-top: 8px; }
          .message-box p { margin: 0; font-size: 15px; color: #374151; line-height: 1.7; }
          .footer { background: #f9fafb; padding: 20px 36px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer p { margin: 0; font-size: 12px; color: #9ca3af; }
          .badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <h1>📬 New Feedback — GetHired</h1>
            <p>Someone just shared their thoughts on your platform!</p>
          </div>
          <div class="body">
            <div class="label">From</div>
            <div class="value">${name}</div>

            <div class="label">Designation</div>
            <div class="value"><span class="badge">${designation}</span></div>

            <div class="label">Feedback</div>
            <div class="message-box">
              <p>${message.replace(/\n/g, "<br/>")}</p>
            </div>
          </div>
          <div class="footer">
            <p>Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST &nbsp;·&nbsp; GetHired Platform</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"GetHired Feedback" <${process.env.EMAIL_USER}>`,
      to: process.env.FEEDBACK_TO,
      subject: `💬 New Feedback from ${name} (${designation}) — GetHired`,
      html,
    });
  } catch (err) {
    console.error("Email send failed:", err.message);
    // Still return success – feedback is saved in DB
  }

  res.status(201).json(feedback);
};
