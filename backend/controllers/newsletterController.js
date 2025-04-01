import NewsletterSubscriber from "../models/NewsletterSubscriber.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const existing = await NewsletterSubscriber.findOne({ where: { email } });

    if (existing) {
      await existing.update({
        name: name || existing.name,
        is_verified: false, // Reset verification if re-subscribing
        subscribed_at: new Date(), // Optional: update the timestamp
        unsubscribed_at: null, // Optional: reset unsubscribed status
      });

      return res.status(200).json({
        message: "Subscription updated. Please verify your email.",
        subscriber: existing,
      });
    }

    const newSubscriber = await NewsletterSubscriber.create({
      name,
      email,
      is_verified: false,
    });

    return res.status(201).json({
      message: "Subscribed successfully! Please verify your email.",
      subscriber: newSubscriber,
    });

  } catch (error) {
    console.error("🧨 Newsletter subscription error:", error);
    res.status(500).json({ error: "Failed to subscribe to the newsletter." });
  }
};

export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = await NewsletterSubscriber.findOne({ where: { email } });

    if (!subscriber) {
      return res.status(404).json({ error: "Subscriber not found." });
    }

    await subscriber.update({ unsubscribed_at: new Date() });

    res.json({ message: "You’ve been unsubscribed. We’ll miss you 💔" });

  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ error: "Failed to unsubscribe." });
  }
};
