export const applyEmailTheme = (content, title = "FitGym Notification") => `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 24px; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #ff5733;">🏋️ FitGym</h1>
      <h2 style="margin-top: 0;">${title}</h2>
    </div>
    <div style="font-size: 16px; color: #333;">
      ${content}
    </div>
    <hr style="margin: 24px 0;">
    <footer style="font-size: 12px; color: #777; text-align: center;">
      You’re receiving this email because you’re registered with FitGym.<br>
      Need help? Contact us at <a href="mailto:support@fitgym.com">support@fitgym.com</a>
    </footer>
  </div>
`;



export const getWelcomeEmail = (fullName) => ({
    subject: "Welcome to FitGym!",
    html: applyEmailTheme(`
    <p>Hi <strong>${fullName}</strong>,</p>
    <p>Welcome aboard! We’re excited to help you crush your fitness goals. Explore our gym and don’t hesitate to ask if you need assistance.</p>
    <p>💪 Stay Fit,<br>Team FitGym</p>
  `, "Welcome to FitGym!")
});

export const getExpiryReminderEmail = (fullName, endDate) => ({
    subject: "⏰ Membership Expiry Reminder",
    html: applyEmailTheme(`
    <p>Hi <strong>${fullName}</strong>,</p>
    <p>Your membership is expiring on <strong>${new Date(endDate).toDateString()}</strong>.</p>
    <p>Please renew it in time to avoid any interruption in your workout sessions.</p>
    <p>🏋️ Cheers,<br>Team FitGym</p>
  `, "Membership Expiry Reminder")
});

export const getPlanAddedEmail = (fullName, planName, startDate, endDate) => ({
    subject: `✅ ${planName} Plan Activated`,
    html: applyEmailTheme(`
    <p>Hi <strong>${fullName}</strong>,</p>
    <p>Your <strong>${planName}</strong> plan has been successfully activated!</p>
    <p><strong>Start Date:</strong> ${new Date(startDate).toDateString()}<br>
       <strong>End Date:</strong> ${new Date(endDate).toDateString()}</p>
    <p>Let’s continue your fitness journey!</p>
    <p>🔥 Push Harder,<br>Team FitGym</p>
  `, "New Plan Activated")
});
