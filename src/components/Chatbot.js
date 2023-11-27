import React, { useEffect } from "react";
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with bot",
        botConversationDescription: "Feel free to ask just anything",
        botId: "84b88307-bb59-4a68-956a-dac518482cf0",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "84b88307-bb59-4a68-956a-dac518482cf0",
        webhookId: "92c9b1a0-6835-4b68-ae0c-2f4ac173264d",
        lazySocket: true,
        themeName: "prism",
        frontendVersion: "v1",
        theme: "prism",
        themeColor: "#2563eb",
      });
    };
  }, []);

  return <div id="webchat" />;
};
export default Chatbot;
