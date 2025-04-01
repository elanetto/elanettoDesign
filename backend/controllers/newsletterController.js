import NewsletterSubscriber from "../models/NewsletterSubscriber.js";

export const subscribe = async (req, res) => {
  const { name, email } = req.body;
  try {
    const [subscriber, created] = await NewsletterSubscriber.findOrCreate({
      where: { email },
      defaults: { name },
    });

    if (!created) {
      return res.status(409).json({ message: "Email is already subscribed." });
    }

    res.status(201).json({ message: "Successfully subscribed!" });
  } catch (err) {
    console.error("Error subscribing:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
