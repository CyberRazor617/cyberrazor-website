# Email Configuration Setup

## SMTP Credentials

The appointment booking system sends emails using Gmail SMTP. 

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
SMTP_EMAIL=nds.shapater@gmail.com
SMTP_PASSWORD=boae pdlt helr bsic
```

### How It Works

1. When a user completes the appointment booking form, all details are sent to the API endpoint `/api/send-appointment-email`
2. The API uses nodemailer with Gmail SMTP to send a formatted email to `nds.shapater@gmail.com`
3. The email includes:
   - Appointment Number
   - Contact Information (Name, Email, Phone, Company)
   - Appointment Schedule (Date & Time)
   - Optional Message from the client

### Email Format

The email is sent as a beautifully formatted HTML email with:
- Professional header with CyberRazor branding
- Organized sections for contact info and appointment details
- Clear appointment number for tracking
- Responsive design

### Testing

To test the email functionality:
1. Go to `/appointment` page
2. Fill in all required fields
3. Complete all 4 steps
4. Check the email inbox at `nds.shapater@gmail.com`

### Security Notes

- The SMTP password is an **App Password** generated from Google Account settings
- Never commit the `.env.local` file to version control (it's already in `.gitignore`)
- For production, consider using environment variables from your hosting platform

### Troubleshooting

If emails are not being sent:
1. Verify the App Password is correct
2. Check that "Less secure app access" is enabled in Gmail settings (if needed)
3. Ensure the Gmail account has 2-factor authentication enabled
4. Check the server logs for error messages
