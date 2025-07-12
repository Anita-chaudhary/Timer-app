import * as Notifications from "expo-notifications";

// Store notification IDs to cancel later
const scheduledNotifications = new Map();

export const scheduleHalfwayNotification = async (title, seconds, id) => {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Halfway Alert",
      body: `${title} is halfway done!`,
    },
    // trigger: { seconds },

    trigger: { seconds: 10 }, // for halfway in 10 seconds
  });

  scheduledNotifications.set(`${id}-half`, identifier);
};

export const scheduleCompletionNotification = async (title, seconds, id) => {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Timer Completed",
      body: `${title} finished!`,
    },
    trigger: { seconds },
  });

  scheduledNotifications.set(`${id}-done`, identifier);
};

export const cancelNotifications = async (id) => {
  const halfId = scheduledNotifications.get(`${id}-half`);
  const doneId = scheduledNotifications.get(`${id}-done`);

  if (halfId) {
    await Notifications.cancelScheduledNotificationAsync(halfId);
    scheduledNotifications.delete(`${id}-half`);
  }

  if (doneId) {
    await Notifications.cancelScheduledNotificationAsync(doneId);
    scheduledNotifications.delete(`${id}-done`);
  }
};
