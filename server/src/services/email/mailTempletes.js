module.exports = {
  
  // WELCOME EMAIL TEMPLATE
  welcome: ({ user }) => `
    <h1>Welcome ${user.name} 🎉</h1>

    <p>
      Thank you for joining Event Planner.
      ${
        user.role === "organizer"
          ? "Start creating and managing your events today!"
          : "Discover and join exciting events happening around you!"
      }
    </p>

    <a href="${process.env.FRONTEND_URL}/dashboard" 
       style="display:inline-block;padding:10px 16px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;">
       Go to Dashboard
    </a>
  `,

  
  // EVENT CREATED TEMPLATE
  eventCreated: ({ event, organizer }) => `
    <h2>New Event Created 🎉</h2>
    <p><strong>${organizer.name}</strong> created a new event.</p>

    <h3>${event.title}</h3>
    <p>${event.description}</p>

    <p><b>Start:</b> ${new Date(event.startTime).toLocaleString()}</p>
    <p><b>Location:</b> ${event.location}</p>

    <a href="${process.env.FRONTEND_URL}/events/${event._id}">
      View Event
    </a>
  `,

  // EVENT UPDATED TEMPLATE
  eventUpdated: ({ event }) => `
    <h2>Event Updated 🔁</h2>

    <p>The event <strong>${event.title}</strong> has been updated.</p>

    <p><b>New Start:</b> ${new Date(event.startTime).toLocaleString()}</p>
    <p><b>Status:</b> ${event.status}</p>

    <a href="${process.env.FRONTEND_URL}/events/${event._id}">
      Check Update
    </a>
  `,
  eventReminder: ({ event, user }) => `
    <div style="font-family:Arial;padding:20px;color:#333">
      <h2 style="color:#4a90e2">⏰ Reminder: Your event starts in 1 hour</h2>

      <p>Hi ${user.name},</p>
      <p>
        This is a reminder that the event
        <strong>${event.title}</strong> will begin in 1 hour.
      </p>

      <p><strong>📍 Location:</strong> ${event.location}</p>
      <p><strong>🕒 Time:</strong> ${new Date(event.startTime).toLocaleString()}</p>

      <br/>

      <a href="${process.env.FRONTEND_URL}/event/${event._id}"
        style="padding:10px 20px;background:#4a90e2;color:white;text-decoration:none;border-radius:5px">
        View Event
      </a>

      <p style="margin-top:20px">Thanks,<br />Event Planner Team</p>
    </div>
  `,
 
  // DAILY DIGEST (Next-day events)
  dailyDigest: ({ user, events }) => `
    <div style="font-family:Arial;padding:20px;color:#333">
      <h2 style="color:#4a90e2">📅 Your Events for Tomorrow</h2>

      <p>Hi ${user.name},</p>
      <p>Here are the events you’re participating in tomorrow:</p>

      <ul>
        ${events
          .map(
            (event) => `
          <li style="margin-bottom:15px">
            <strong>${event.title}</strong><br />
            🕒 ${new Date(event.startTime).toLocaleString()}<br />
            📍 ${event.location}
          </li>
        `
          )
          .join("")}
      </ul>

      <p style="margin-top:20px">
        Have a productive day!<br />Event Planner Team
      </p>
    </div>
  `,
};
