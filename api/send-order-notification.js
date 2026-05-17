export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const response = await fetch(
      "https://onesignal.com/api/v1/notifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
        },
        body: JSON.stringify({
          app_id: "d0c25769-48c3-4bfc-a279-c9a3cad3a442",

          included_segments: ["Subscribed Users"],

          headings: {
            en: "🛒 New Order",
          },

          contents: {
            en: "A new order has been placed!",
          },

          chrome_web_icon:
            "https://cdn-icons-png.flaticon.com/512/263/263142.png",

          priority: 10,
        }),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Notification failed",
    });
  }
}